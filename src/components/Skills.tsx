import { motion } from "framer-motion";
import { Code2, Database, Globe, Layout, Server, Terminal, Palette, GitBranch } from "lucide-react";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface SkillDef {
  titleKey: string;
  subtitleKey: string;
  icon: ReactNode;
  skills: string[];
  col?: string;
}

const SKILL_DEFS: SkillDef[] = [
  { titleKey: "skills.frontend", subtitleKey: "skills.frontendSub", icon: <Layout className="text-[var(--accent)] dark:text-[var(--primary)]" size={28} />, skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"], col: "md:col-span-2" },
  { titleKey: "skills.backend", subtitleKey: "skills.backendSub", icon: <Server className="text-[var(--accent)] dark:text-[var(--primary)]" size={28} />, skills: ["Node.js", "Python", "Express", "REST APIs"] },
  { titleKey: "skills.database", subtitleKey: "skills.databaseSub", icon: <Database className="text-[var(--accent)] dark:text-[var(--primary)]" size={28} />, skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma"] },
  { titleKey: "skills.devops", subtitleKey: "skills.devopsSub", icon: <Terminal className="text-[var(--accent)] dark:text-[var(--primary)]" size={28} />, skills: ["Docker", "CI/CD", "AWS", "Linux"], col: "md:col-span-2" },
  { titleKey: "skills.languages", subtitleKey: "skills.languagesSub", icon: <Code2 className="text-[var(--accent)] dark:text-[var(--primary)]" size={28} />, skills: ["JavaScript", "TypeScript", "Python", "C++", "SQL"] },
  { titleKey: "skills.web", subtitleKey: "skills.webSub", icon: <Globe className="text-[var(--accent)] dark:text-[var(--primary)]" size={28} />, skills: ["HTML5", "CSS3", "WebSockets", "PWA"] },
  { titleKey: "skills.design", subtitleKey: "skills.designSub", icon: <Palette className="text-[var(--accent)] dark:text-[var(--primary)]" size={28} />, skills: ["Figma", "Adobe XD", "Responsive Design"] },
  { titleKey: "skills.tools", subtitleKey: "skills.toolsSub", icon: <GitBranch className="text-[var(--accent)] dark:text-[var(--primary)]" size={28} />, skills: ["Git", "VS Code", "Jira", "Postman"], col: "md:col-span-2" },
];

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="relative z-10 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading mb-4 text-4xl font-bold md:text-6xl">{t("skills.title")}</h2>
          <div className="h-1 w-20 rounded-full bg-[var(--accent)] dark:bg-[var(--primary)]" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SKILL_DEFS.map((cat, i) => (
            <motion.div
              key={cat.titleKey}
              className={cat.col ?? ""}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="card-interactive group flex h-full min-h-[180px] flex-col justify-between bg-[var(--card)]">
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-lg border border-black/5 bg-black/5 p-3 backdrop-blur-md transition-colors group-hover:border-[var(--accent)]/50 dark:border-white/5 dark:bg-white/5 dark:group-hover:border-[var(--primary)]/50">
                    {cat.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading mb-1 text-xl font-bold transition-colors group-hover:text-[var(--accent)] dark:group-hover:text-[var(--primary)]">
                    {t(cat.titleKey)}
                  </h3>
                  <p className="mb-3 font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase dark:text-[var(--primary)]">
                    {t(cat.subtitleKey)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="rounded border border-black/5 bg-black/5 px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)] dark:border-white/5 dark:bg-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
