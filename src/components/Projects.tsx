import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProjectDef {
  tags: string[];
  link?: string;
}

const PROJECT_DEFS: ProjectDef[] = [
  { tags: ["Go", "C++", "OpenCV", "JSON Pipeline"], link: "https://github.com/MaaEnd/MaaEnd" },
  { tags: ["GitHub Actions", "oxipng", "SHA-256", "Python"] },
  { tags: ["React Native", "Django", "AWS DynamoDB", "Textract"] },
];

export default function Projects() {
  const { t } = useTranslation();
  const items = t("projects.items", { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section id="projects" className="relative z-10 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading mb-4 text-4xl font-bold md:text-6xl">{t("projects.title")}</h2>
          <div className="h-1 w-20 rounded-full bg-[var(--accent)] dark:bg-[var(--primary)]" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((project, i) => {
            const def = PROJECT_DEFS[i] ?? { tags: [] };
            const hasLink = !!def.link;

            const card = (
              <div className="card-interactive group flex h-full flex-col justify-between bg-[var(--card)]">
                <div className="mb-4 flex items-start justify-between">
                  <span className="font-mono text-xs text-[var(--text-quaternary)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {hasLink && (
                    <ArrowUpRight
                      size={16}
                      className="text-[var(--text-quaternary)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)] dark:group-hover:text-[var(--primary)]"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading mb-2 text-xl font-bold transition-colors group-hover:text-[var(--accent)] dark:group-hover:text-[var(--primary)]">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {def.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-black/5 bg-black/5 px-2 py-0.5 font-mono text-[10px] text-[var(--text-tertiary)] dark:border-white/5 dark:bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {hasLink ? (
                  <a href={def.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {card}
                  </a>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
