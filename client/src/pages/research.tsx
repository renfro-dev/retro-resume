import { motion } from "framer-motion";
import { Link } from "wouter";
import Header from "@/components/header";
import PostMetaLine from "@/components/post-meta-line";
import { posts } from "@/lib/research";

export default function Research() {
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
            <div className="mb-6 gap-4 flex-wrap">
              {/* Mobile logo */}
              <pre className="md:hidden text-[var(--terminal-cyan)] text-xs terminal-glow">
{`
╔═══════════════════╗
║     RESEARCH      ║
╚═══════════════════╝
`}
              </pre>
              {/* Desktop logo */}
              <pre className="hidden md:block text-[var(--terminal-cyan)] text-xs terminal-glow">
{`
 ██████╗ ███████╗███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
 ██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
 ██████╔╝█████╗  ███████╗█████╗  ███████║██████╔╝██║     ███████║
 ██╔══██╗██╔══╝  ╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
 ██║  ██║███████╗███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║
 ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
`}
              </pre>
            </div>

            <p className="flex items-center gap-2 text-[var(--terminal-green)] text-sm mb-4">
              <span className="text-[var(--terminal-yellow)]">&gt;</span>
              <span>
                FOUND {posts.length} BRIEF{posts.length !== 1 ? "S" : ""}
              </span>
            </p>

            <ul className="space-y-4">
              {posts.map((post, index) => (
                <motion.li
                  key={post.slug}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index, 10) * 0.05 }}
                >
                  <Link href={`/posts/${post.slug}`}>
                    <a className="terminal-accordion-item terminal-accordion-trigger block hover:no-underline">
                      <div className="mb-1">
                        <PostMetaLine post={post} />
                      </div>
                      <h3 className="trigger-title text-[var(--terminal-cyan)] font-bold text-base terminal-glow transition-colors">
                        {post.title}
                      </h3>
                    </a>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
