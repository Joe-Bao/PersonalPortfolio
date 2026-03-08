---
title: "Efficient CI: How I Cut Template Optimization from 10 Hours to 5 Minutes"
date: "2026-03-01"
description: "How I designed an incremental PNG optimization pipeline in GitHub Actions that reduced CI runtime from 10+ hours to under 3 minutes — without losing a single pixel."
tags: ["CI/CD", "DevOps", "GitHub Actions", "Performance", "Open Source"]
---

In MaaEnd, a computer vision-based project, our "Source of Truth" consists of thousands of image templates used for `templateMatch`. As the project grew, we faced a classic DevOps nightmare: our test suite became bloated, slow, and expensive to run on GitHub Actions.

---

## The Challenge: Bloated Templates & Device Variance

Our automation logic must be robust across thousands of different user devices. To ensure stability, we perform extensive "Cross-Node Validation" — ensuring a template only triggers its intended node and ignores all others.

However, because these templates are full-scene screenshots (even at 720p), the repository size began to skyrocket. We needed a way to compress these images without losing a single pixel of data, as even the slightest lossy artifact could break our OpenCV matching precision.

---

## Step 1: Lossless Compression with oxipng

I implemented a CI pipeline using `oxipng`, a multi-threaded lossless PNG optimizer. To ensure absolute data integrity, I added a **Pixel-level Integrity Check**:

1. Convert the original and optimized images to Grayscale.
2. Perform a pixel-by-pixel comparison.
3. Only commit the change if the images are mathematically identical.

---

## Step 2: The Bottleneck

The initial run was a disaster. Optimizing thousands of high-resolution templates in a standard GitHub Action environment was estimated to take over **10 hours**. This would have blocked our entire development cycle and exhausted our CI credits.

---

## Step 3: The "Incremental" Solution

I immediately pivoted to an **Incremental Optimization Strategy**:

- **Local Pre-processing:** I performed the bulk of the initial optimization on a local machine to seed the repository.
- **Hash-based Tracking:** I implemented a JSON Hash Map to store the SHA-256 hashes of every optimized image.
- **Smart CI Logic:** The GitHub Action was refactored to check the hash map first. If a file's hash hasn't changed, the optimizer skips it entirely.

---

## The Results

With the incremental caching layer in place, the pipeline now completes in under 3 minutes:

![PNG Image Optimization CI run](/blog-ci-optimization.png)

By implementing this intelligent caching layer:

- **CI Runtime:** Dropped from a theoretical 10+ hours to just **~2 minutes** per pull request.
- **Storage Efficiency:** Saved an average of **10% disk space** per image without any loss in recognition accuracy.
- **Developer Experience:** New templates are now automatically optimized and pushed back to the branch by a GitHub Actions bot, keeping the repo lean without human intervention.
