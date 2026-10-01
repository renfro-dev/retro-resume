import { CATEGORY_LABELS, formatPostDate, type PostMeta } from "@/lib/research";

const CATEGORY_COLOR = {
  systems_thinking: "var(--terminal-cyan)",
  context_orchestration: "var(--terminal-yellow)",
  essay: "var(--terminal-green)",
} as const;

export function CategoryBadge({ category }: { category: PostMeta["category"] }) {
  const color = CATEGORY_COLOR[category];
  return (
    <span
      className="px-2 py-0.5 border text-[10px] uppercase tracking-wider"
      style={{ color, borderColor: color }}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}

export default function PostMetaLine({ post }: { post: PostMeta }) {
  return (
    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--terminal-gray)] uppercase">
      <CategoryBadge category={post.category} />
      {post.category !== "essay" && <span>{post.period_type} ·</span>}
      <span>{formatPostDate(post.published_at)}</span>
      <span>· {post.reading_time_minutes} min</span>
    </div>
  );
}
