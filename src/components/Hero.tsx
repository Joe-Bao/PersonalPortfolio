import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 md:px-16">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="pointer-events-none absolute top-24 left-8 hidden md:block">
        <div className="h-20 w-px bg-gradient-to-b from-[var(--tech-cyan)] to-transparent opacity-60" />
        <div className="absolute top-0 left-0 h-px w-20 bg-gradient-to-r from-[var(--tech-cyan)] to-transparent opacity-60" />
      </div>
      <div className="pointer-events-none absolute right-8 bottom-16 hidden md:block">
        <div className="h-20 w-px bg-gradient-to-t from-[var(--industrial-yellow)] to-transparent opacity-60" />
        <div className="absolute bottom-0 right-0 h-px w-20 bg-gradient-to-l from-[var(--industrial-yellow)] to-transparent opacity-60" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 font-mono text-xs tracking-wider dark:border-white/10 dark:bg-white/5"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-[var(--text-tertiary)]">{t("hero.status")}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-syne mb-6 text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--foreground)] bg-clip-text text-transparent">
            {t("hero.name")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-mono mb-4 text-lg tracking-wider text-[var(--secondary)] md:text-2xl"
        >
          {t("hero.role")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mb-12 max-w-xl text-lg leading-relaxed font-light text-[var(--text-secondary)]"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="clip-path-slant group flex items-center gap-3 bg-[var(--primary)] px-8 py-4 font-mono text-sm font-bold tracking-wider text-black transition-all hover:brightness-110"
          >
            {t("hero.viewProjects")}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="clip-path-slant flex items-center gap-3 border-2 border-dashed border-[var(--secondary)]/50 px-8 py-4 font-mono text-sm font-semibold tracking-wider text-[var(--secondary)] transition-all hover:bg-[var(--secondary)]/10"
          >
            <Download size={16} />
            {t("hero.downloadCV")}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-widest text-[var(--text-quaternary)]">
            {t("hero.scroll")}
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-[var(--text-quaternary)] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
