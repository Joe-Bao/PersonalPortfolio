import { motion } from "framer-motion";
import { Calendar, Building2, GraduationCap } from "lucide-react";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";

const ITEM_TYPES: ("work" | "education")[] = ["work", "work", "work", "education"];
const ITEM_TAGS: string[][] = [
  ["React", "TypeScript", "Next.js"],
  ["Node.js", "React", "PostgreSQL"],
  ["JavaScript", "CSS", "WordPress"],
  ["Algorithms", "Data Structures", "Software Engineering"],
];

function TypeIcon({ type }: { type: string }): ReactNode {
  if (type === "education") return <GraduationCap size={18} />;
  return <Building2 size={18} />;
}

export default function Experience() {
  const { t } = useTranslation();

  const items = (t("experience.items", { returnObjects: true }) as { title: string; organization: string; period: string; description: string }[]);

  return (
    <section id="experience" className="relative z-10 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading mb-4 text-4xl font-bold md:text-6xl">{t("experience.title")}</h2>
          <div className="h-1 w-20 rounded-full bg-[var(--accent)] dark:bg-[var(--primary)]" />
        </motion.div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--secondary)] to-transparent dark:from-[var(--primary)] md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0;
              const type = ITEM_TYPES[i] ?? "work";
              const tags = ITEM_TAGS[i] ?? [];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-4 z-10 -translate-x-1/2 md:left-1/2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--background)] text-[var(--accent)] dark:border-[var(--primary)] dark:text-[var(--primary)]">
                      <TypeIcon type={type} />
                    </div>
                  </div>

                  <div className={`ml-12 w-full md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <div className="card-interactive bg-[var(--card)]">
                      <div className={`mb-2 flex items-center gap-2 font-mono text-xs text-[var(--accent)] dark:text-[var(--primary)] ${isLeft ? "md:justify-end" : ""}`}>
                        <Calendar size={12} />
                        {item.period}
                      </div>
                      <h3 className="font-heading mb-1 text-lg font-bold">{item.title}</h3>
                      <p className="mb-3 text-sm text-[var(--text-tertiary)]">{item.organization}</p>
                      <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">{item.description}</p>
                      <div className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}`}>
                        {tags.map((tag) => (
                          <span key={tag} className="rounded border border-black/5 bg-black/5 px-2 py-0.5 font-mono text-[10px] text-[var(--text-tertiary)] dark:border-white/5 dark:bg-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
