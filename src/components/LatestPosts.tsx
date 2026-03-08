import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { postEntries, getPostBySlug } from "../lib/blog";

export default function LatestPosts() {
  const { t, i18n } = useTranslation();
  const latest = postEntries.slice(0, 3);
  if (latest.length === 0) return null;

  const dateLocale = i18n.language.startsWith("zh") ? "zh-CN" : "en-US";

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <h2 className="font-heading mb-4 text-4xl font-bold md:text-6xl">{t("blog.latestArticles")}</h2>
            <div className="h-1 w-20 rounded-full bg-[var(--accent)] dark:bg-[var(--primary)]" />
          </div>
          <Link to="/blog" className="hidden items-center gap-2 font-mono text-sm text-[var(--accent)] transition-colors hover:text-[var(--secondary)] sm:flex dark:text-[var(--primary)]">
            {t("blog.viewAll")}
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {latest.map((entry, i) => {
            const post = getPostBySlug(entry.slug, i18n.language) ?? entry.en;
            return (
              <motion.div key={entry.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}>
                <Link to={`/blog/${entry.slug}`} className="group block h-full">
                  <article className="card-interactive flex h-full flex-col justify-between bg-[var(--card)]">
                    <div>
                      <div className="mb-3 flex items-center gap-2 font-mono text-xs text-[var(--accent)] dark:text-[var(--primary)]">
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString(dateLocale, { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                      <h3 className="font-heading mb-2 text-lg font-bold transition-colors group-hover:text-[var(--accent)] dark:group-hover:text-[var(--primary)]">{post.title}</h3>
                      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">{post.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="flex items-center gap-1 rounded border border-black/5 bg-black/5 px-2 py-0.5 font-mono text-[10px] text-[var(--text-tertiary)] dark:border-white/5 dark:bg-white/5">
                          <Tag size={8} />{tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <Link to="/blog" className="mt-8 flex items-center justify-center gap-2 font-mono text-sm text-[var(--accent)] transition-colors hover:text-[var(--secondary)] sm:hidden dark:text-[var(--primary)]">
          {t("blog.viewAllArticles")}
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
