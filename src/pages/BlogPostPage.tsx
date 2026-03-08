import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getPostBySlug, postEntries } from "../lib/blog";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const post = slug ? getPostBySlug(slug, i18n.language) : undefined;
  const dateLocale = i18n.language.startsWith("zh") ? "zh-CN" : "en-US";

  if (!post) return <Navigate to="/blog" replace />;

  const readTime = Math.ceil(post.content.split(/\s+/).length / 200);
  const currentIdx = postEntries.findIndex((e) => e.slug === post.slug);
  const prevEntry = currentIdx < postEntries.length - 1 ? postEntries[currentIdx + 1] : null;
  const nextEntry = currentIdx > 0 ? postEntries[currentIdx - 1] : null;
  const prevPost = prevEntry ? getPostBySlug(prevEntry.slug, i18n.language) : null;
  const nextPost = nextEntry ? getPostBySlug(nextEntry.slug, i18n.language) : null;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="mb-12">
          <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-sm text-[var(--text-tertiary)] transition-colors hover:text-[var(--accent)] dark:hover:text-[var(--primary)]">
            <ArrowLeft size={14} />
            {t("blog.backToAll")}
          </Link>
        </motion.div>

        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mb-12">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 rounded border border-black/5 bg-black/5 px-2.5 py-1 font-mono text-[10px] text-[var(--accent)] dark:border-white/5 dark:bg-white/5 dark:text-[var(--primary)]">
                <Tag size={9} />{tag}
              </span>
            ))}
          </div>
          <h1 className="font-heading mb-6 text-3xl font-bold leading-tight md:text-5xl">{post.title}</h1>
          <p className="mb-6 text-lg font-light text-[var(--text-secondary)]">{post.description}</p>
          <div className="flex items-center gap-6 border-b border-black/10 pb-6 font-mono text-xs text-[var(--text-quaternary)] dark:border-white/10">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {t("blog.minRead", { count: readTime })}
            </span>
          </div>
        </motion.header>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }} className="prose-custom mb-20">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </motion.article>

        <nav className="grid grid-cols-1 gap-4 border-t border-black/10 pt-8 sm:grid-cols-2 dark:border-white/10">
          {prevEntry && prevPost ? (
            <Link to={`/blog/${prevEntry.slug}`} className="card-interactive group bg-[var(--card)]">
              <span className="mb-1 block font-mono text-[10px] text-[var(--text-quaternary)]">&larr; {t("blog.previous")}</span>
              <span className="text-sm font-medium transition-colors group-hover:text-[var(--accent)] dark:group-hover:text-[var(--primary)]">{prevPost.title}</span>
            </Link>
          ) : <div />}
          {nextEntry && nextPost && (
            <Link to={`/blog/${nextEntry.slug}`} className="card-interactive group bg-[var(--card)] text-right">
              <span className="mb-1 block font-mono text-[10px] text-[var(--text-quaternary)]">{t("blog.next")} &rarr;</span>
              <span className="text-sm font-medium transition-colors group-hover:text-[var(--accent)] dark:group-hover:text-[var(--primary)]">{nextPost.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
