import { motion } from "framer-motion";
import { User, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { type ReactNode } from "react";

export default function About() {
  const { t } = useTranslation();

  const infoItems: { icon: ReactNode; labelKey: string; valueKey: string }[] = [
    { icon: <MapPin size={16} />, labelKey: "about.location", valueKey: "about.locationValue" },
    { icon: <Briefcase size={16} />, labelKey: "about.experience", valueKey: "about.experienceValue" },
    { icon: <GraduationCap size={16} />, labelKey: "about.education", valueKey: "about.educationValue" },
  ];

  return (
    <section id="about" className="relative z-10 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="mb-4 block font-mono text-sm tracking-widest text-[var(--accent)] uppercase dark:text-[var(--primary)]">
              {t("about.label")}
            </span>
            <h2 className="font-heading mb-8 text-4xl font-bold leading-tight text-[var(--foreground)] md:text-5xl">
              {t("about.title1")}
              <br />
              <span className="bg-gradient-to-r from-[var(--foreground)] to-[var(--foreground)]/40 bg-clip-text text-transparent">
                {t("about.title2")}
              </span>
            </h2>

            <div className="mb-8 space-y-6 text-lg font-light text-[var(--text-secondary)]">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {infoItems.map((item) => (
                <div
                  key={item.labelKey}
                  className="flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                >
                  <span className="text-[var(--accent)] dark:text-[var(--primary)]">{item.icon}</span>
                  <span className="text-[var(--text-tertiary)]">{t(item.labelKey)}:</span>
                  <span className="font-medium">{t(item.valueKey)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-tr from-[var(--accent)]/10 to-transparent blur-3xl dark:from-[var(--primary)]/10" />
            <div className="glass-panel relative z-10 rounded-2xl border border-black/10 p-8 dark:border-white/10">
              <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-[var(--accent)] dark:text-[var(--primary)]" />
                  <span className="font-mono text-xs text-[var(--text-tertiary)]">about.json</span>
                </div>
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/20" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                  <div className="h-3 w-3 rounded-full bg-green-500/20" />
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <p className="text-[var(--text-quaternary)]">{"{"}</p>
                {[
                  { key: "name", val: t("about.terminalName") },
                  { key: "role", val: t("about.terminalRole") },
                  { key: "passion", val: t("about.terminalPassion") },
                ].map((row) => (
                  <p key={row.key}>
                    <span className="text-[var(--accent)] dark:text-[var(--primary)]">&nbsp;&nbsp;"{row.key}"</span>
                    <span className="text-[var(--text-quaternary)]">: </span>
                    <span className="text-[var(--secondary)]">"{row.val}"</span>
                    <span className="text-[var(--text-quaternary)]">,</span>
                  </p>
                ))}
                <p>
                  <span className="text-[var(--accent)] dark:text-[var(--primary)]">&nbsp;&nbsp;"coffee"</span>
                  <span className="text-[var(--text-quaternary)]">: </span>
                  <span className="text-green-500">true</span>
                  <span className="text-[var(--text-quaternary)]">,</span>
                </p>
                <p>
                  <span className="text-[var(--accent)] dark:text-[var(--primary)]">&nbsp;&nbsp;"status"</span>
                  <span className="text-[var(--text-quaternary)]">: </span>
                  <span className="text-[var(--secondary)]">"{t("about.terminalStatus")}"</span>
                </p>
                <p className="text-[var(--text-quaternary)]">{"}"}</p>
                <div className="mt-2 h-4 w-2 animate-pulse bg-[var(--accent)] dark:bg-[var(--primary)]" />
              </div>
            </div>

            <div className="absolute top-1/2 -right-10 h-[1px] w-40 bg-gradient-to-r from-[var(--accent)] to-transparent dark:from-[var(--primary)]" />
            <div className="absolute -bottom-10 left-1/2 h-40 w-[1px] bg-gradient-to-b from-[var(--accent)] to-transparent dark:from-[var(--primary)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
