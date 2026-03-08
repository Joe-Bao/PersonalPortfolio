import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Tag, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { postEntries, getPostBySlug } from "../lib/blog";

export default function BlogListPage() {
  const { t, i18n } = useTranslation();
  const dateLocale = i18n.language.startsWith("zh") ? "zh-CN" : "en-US";

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <span className="mb-4 block font-mono text-sm tracking-widest text-[var(--accent)] uppercase dark:text-[var(--primary)]">
            {t("blog.label")}
          </span>
          <h1 className="font-heading mb-4 text-4xl font-bold md:text-6xl">{t("blog.title")}</h1>
          <p className="max-w-xl text-lg font-light text-[var(--text-secondary)]">{t("blog.subtitle")}</p>
          <div className="mt-4 h-1 w-20 rounded-full bg-[var(--accent)] dark:bg-[var(--primary)]" />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8 flex items-center gap-2 font-mono text-xs text-[var(--text-quaternary)]">
          <BookOpen size={14} />
          {t("blog.published", { count: postEntries.length })}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {postEntries.map((entry, i) => {
            const post = getPostBySlug(entry.slug, i18n.language) ?? entry.en;
            return (
              <motion.div key={entry.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}>
                <Link to={`/blog/${entry.slug}`} className="group block h-full">
                  <article className="card-interactive flex h-full flex-col justify-between bg-[var(--card)]">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)] dark:text-[var(--primary)]">
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-quaternary)]">
                        {t("blog.minRead", { count: Math.ceil(post.content.split(/\s+/).length / 200) })}
                      </span>
                    </div>
                    <div className="mb-4 flex-1">
                      <h2 className="font-heading mb-2 flex items-center gap-2 text-xl font-bold transition-colors group-hover:text-[var(--accent)] dark:group-hover:text-[var(--primary)]">
                        {post.title}
                        <ArrowRight size={16} className="shrink-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                      </h2>
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{post.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
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

        {postEntries.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-mono text-sm text-[var(--text-quaternary)]">
              {t("blog.noPosts")}{" "}
              <code className="rounded bg-black/5 px-2 py-0.5 dark:bg-white/5">src/content/posts/</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
