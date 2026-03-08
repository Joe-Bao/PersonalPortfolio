---
title: "The 400ms Ghost: Debugging Performance Spikes in Real-Time Automation"
date: "2026-03-02"
description: "How we tracked down a mysterious 400ms latency spike in our OpenCV-based automation framework — and why we decided to let it haunt us."
tags: ["Performance", "Debugging", "Go", "OpenCV", "Open Source"]
---

If you've ever built real-time automation tools, you know that latency is the enemy. In our open-source project, MaaEnd, we rely heavily on OpenCV template matching running continuously in the background to assist users with in-game tasks.

The golden rule for this kind of automation? It has to be faster than human reaction time. If the user notices the delay, or worse, if they can click faster than the bot, we've failed.

Normally, a recognition cycle takes around 60ms. But recently, we ran into a bizarre issue during testing: one of our team members was experiencing random, massive latency spikes, with a single loop taking over 400ms.

Here is the story of how we tracked down the "400ms Ghost," and why we ultimately decided to let it haunt us.

---

## Step 1: Suspecting the Framework (Adding Observability)

When you have a performance bottleneck, guessing is a waste of time. You need data.

To figure out exactly where the time was bleeding, we needed to instrument the Go service layer that wraps our core C++ framework. We temporarily modified the `runRecognition` interface to inject granular telemetry using `time.Now()` and structured logging.

**Before: The standard wrapper**

```go
func (ctx *Context) runRecognition(entry, override string, img image.Image) (*RecognitionDetail, error) {
    imgBuf := buffer.NewImageBuffer()
    imgBuf.Set(img)
    defer imgBuf.Destroy()

    recId := native.MaaContextRunRecognition(ctx.handle, entry, override, imgBuf.Handle())
    if recId == 0 {
        return nil, errors.New("failed to run recognition")
    }
    tasker := ctx.GetTasker()
    return tasker.GetRecognitionDetail(recId)
}
```

**After: Instrumenting for time delta analysis**

We broke down the execution into three phases: buffer creation (`buffer_duration`), the native OpenCV execution (`native_duration`), and detail retrieval (`detail_duration`).

```go
func (ctx *Context) runRecognition(entry, override string, img image.Image) (*RecognitionDetail, error) {
    t1 := time.Now()
    imgBuf := buffer.NewImageBuffer()
    imgBuf.Set(img)
    defer imgBuf.Destroy()
    t2 := time.Now()

    recId := native.MaaContextRunRecognition(ctx.handle, entry, override, imgBuf.Handle())
    t3 := time.Now()

    tasker := ctx.GetTasker()
    recognitionDetail, err := tasker.GetRecognitionDetail(recId)
    t4 := time.Now()

    log.Debug().
        Str("entry", entry).
        Str("override", override).
        Dur("buffer_duration", t2.Sub(t1)).
        Dur("native_duration", t3.Sub(t2)).
        Dur("detail_duration", t4.Sub(t3)).
        Msg("run recognition done")

    return recognitionDetail, err
}
```

---

## Step 2: Reading the Logs

With the telemetry in place, we ran the same tasks across identical environments. The logs revealed exactly where the issue lived:

```json
{"level":"debug","buffer_duration":4.87,"native_duration":66.6162,"detail_duration":28.6697}
{"level":"debug","buffer_duration":3.43,"native_duration":405.1076,"detail_duration":32.0536}
{"level":"debug","buffer_duration":3.44,"native_duration":68.2039,"detail_duration":24.5967}
```

The `native_duration` — the actual OpenCV processing time — was wildly inconsistent, jumping from a healthy ~60ms up to 400ms+ before settling back down.

Here's the probability density chart showing the distribution of `Run` (internal loop) vs `RunRecognition` (the full native call). The bimodal nature of the spikes is clearly visible:

![Run & RunRecognition Probability Density](/blog-400ms-ghost.png)

The green curve (median ~12ms) represents the internal pipeline overhead, while the red curve (median ~142ms) shows the full recognition cycle. The 400ms spikes were outliers far beyond even the red distribution's tail.

---

## Step 3: The Hardware Plot Twist

We modularized the task, ensuring everyone was running the exact same parameters. Still, the anomaly only happened to one specific tester.

We started comparing hardware specs. Our testing group happened to have a wide spread of CPUs: Intel Core 14th Gen, Intel Core Ultra (Lunar Lake), AMD Ryzen X3D, and an Intel Core 13th Gen.

The only machine experiencing the 400ms spikes? The **Intel 13th Gen**.

Adding to the suspicion, the tester casually mentioned that his PC "had been feeling a bit sluggish lately." Given the widespread news regarding Intel 13th/14th Gen instability and degradation issues, we had our prime suspect. The CPU was likely thermally or electrically throttling during bursty workloads like intensive OpenCV template matching.

---

## The Takeaway: Pragmatic Engineering

Could we definitively prove it was Intel's fault? Or an obscure Windows scheduler bug? Maybe.

Did we keep digging? No.

In open-source development (and enterprise engineering alike), resources are limited. You have to evaluate the ROI of every rabbit hole you go down. Since this issue was isolated to a specific hardware environment and wasn't affecting the vast majority of our user base, we made the pragmatic choice: **Log it, document it, and move on.** If community issues start piling up, we have the telemetry data ready to reopen the investigation. Until then, we let the ghost be.
