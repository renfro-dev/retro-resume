import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Header from "@/components/header";
import PostMetaLine from "@/components/post-meta-line";
import ResearchMarkdown from "@/components/research-markdown";
import { getPostMeta, loadPostBody } from "@/lib/research";

export default function Post() {
  const [, params] = useRoute("/posts/:slug");
  const post = params ? getPostMeta(params.slug) : undefined;
  const [body, setBody] = useState<string | null>(null);

  useEffect(() => {
    setBody(null);
    if (post) loadPostBody(post).then(setBody);
  }, [post]);

  return (
    <div className="font-mono bg-terminal pattern-grid min-h-screen">
      <Header />

      <main className="relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-12 sm:px-16 lg:px-20 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="terminal-card p-8 max-w-4xl mx-auto"
          >
            <Link href="/research">
              <a className="text-xs text-[var(--terminal-gray)] hover:text-[var(--terminal-yellow)] transition-colors">
                &lt; BACK TO RESEARCH
              </a>
            </Link>

            {!post ? (
              <p className="mt-6 text-[var(--terminal-yellow)] text-sm">
                <span>&gt; POST NOT FOUND</span>
              </p>
            ) : (
              <article className="mt-6">
                <h1 className="text-[var(--terminal-cyan)] font-bold text-xl terminal-glow mb-3">
                  {post.title}
                </h1>
                <div className="mb-8 pb-4 border-b border-[var(--terminal-dark-gray)]">
                  <PostMetaLine post={post} />
                </div>
                {body === null ? (
                  <p className="text-[var(--terminal-green)] text-sm">
                    &gt; LOADING... <span className="animate-pulse">█</span>
                  </p>
                ) : (
                  <ResearchMarkdown>{body}</ResearchMarkdown>
                )}
              </article>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
