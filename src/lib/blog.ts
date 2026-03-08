export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export interface PostEntry {
  slug: string;
  en: Post;
  zh?: Post;
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = value;
  }

  return { meta, content: match[2] };
}

function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((t) => t.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function parseLangFromPath(path: string): "en" | "zh" | null {
  const name = path.split("/").pop() ?? "";
  if (name.endsWith(".en.md")) return "en";
  if (name.endsWith(".zh.md")) return "zh";
  return null;
}

function parseSlugFromPath(path: string): string {
  const name = path.split("/").pop() ?? "";
  return name.replace(/\.(en|zh)\.md$/, "");
}

const modules = import.meta.glob<{ default: string }>("../content/posts/*.{en,zh}.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function buildPostEntries(): PostEntry[] {
  const bySlug = new Map<string, { en?: Post; zh?: Post }>();

  for (const [path, raw] of Object.entries(modules)) {
    const lang = parseLangFromPath(path);
    if (!lang || !raw) continue;

    const slug = parseSlugFromPath(path);
    const { meta, content } = parseFrontmatter(raw as string);

    const post: Post = {
      slug,
      title: meta.title ?? slug,
      date: meta.date ?? "",
      description: meta.description ?? "",
      tags: parseTags(meta.tags),
      cover: meta.cover,
      content,
    };

    const entry = bySlug.get(slug) ?? {};
    if (lang === "en") entry.en = post;
    else entry.zh = post;
    bySlug.set(slug, entry);
  }

  return Array.from(bySlug.entries())
    .filter(([, v]) => v.en)
    .map(([slug, v]) => ({ slug, en: v.en!, zh: v.zh }))
    .sort((a, b) => (b.en.date > a.en.date ? 1 : -1));
}

export const postEntries: PostEntry[] = buildPostEntries();

/** All posts (one per slug), defaulting to English for list display */
export const allPosts: Post[] = postEntries.map((e) => e.en);

export function getPostBySlug(slug: string, lang: string): Post | undefined {
  const entry = postEntries.find((e) => e.slug === slug);
  if (!entry) return undefined;
  if (lang.startsWith("zh") && entry.zh) return entry.zh;
  return entry.en;
}
