import briefIndex from "@/content/research/index.json";
import essayIndex from "@/content/essays/index.json";

// Hand-written essays and guides live in content/essays; the rest are exported briefs.
export type ResearchCategory = "systems_thinking" | "context_orchestration" | "essay" | "guide";
export type ResearchPeriod = "weekly" | "monthly" | "quarterly" | "essay" | "guide";

export interface PostMeta {
  title: string;
  slug: string;
  category: ResearchCategory;
  period_type: ResearchPeriod;
  period_start_date?: string;
  period_end_date?: string;
  published_at: string;
  word_count: number;
  reading_time_minutes: number;
  file: string;
}

export const CATEGORY_LABELS: Record<ResearchCategory, string> = {
  systems_thinking: "Systems Thinking",
  context_orchestration: "Context Orchestration",
  essay: "Essay",
  guide: "Guide",
};

// The list page shows the newest posts first, regardless of index order.
export const posts: PostMeta[] = [...(briefIndex as PostMeta[]), ...(essayIndex as PostMeta[])].sort(
  (a, b) => b.published_at.localeCompare(a.published_at),
);

export function getPostMeta(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}

// Bodies are code-split per file; only the post being viewed is fetched.
const bodies = import.meta.glob(["/src/content/research/*.md", "/src/content/essays/*.md"], {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

function stripFrontmatter(raw: string): string {
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return (match ? raw.slice(match[0].length) : raw).trim();
}

export async function loadPostBody(meta: PostMeta): Promise<string | null> {
  const dir = meta.category === "essay" || meta.category === "guide" ? "essays" : "research";
  const load = bodies[`/src/content/${dir}/${meta.file}`];
  if (!load) return null;
  return stripFrontmatter(await load());
}

// published_at has no timezone; parse as local to avoid day shifts.
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
