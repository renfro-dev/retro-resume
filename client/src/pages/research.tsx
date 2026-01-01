import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Header from "@/components/header";
import { supabase, type Article } from "@/lib/supabase";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function Research() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('weekly_briefs')
          .select('*')
          .order('week_start_date', { ascending: false });

        if (error) throw error;

        setArticles(data || []);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err instanceof Error ? err.message : 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

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
            <pre className="text-[var(--terminal-cyan)] text-xs mb-6 terminal-glow">
{`
 ██████╗ ███████╗███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
 ██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
 ██████╔╝█████╗  ███████╗█████╗  ███████║██████╔╝██║     ███████║
 ██╔══██╗██╔══╝  ╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
 ██║  ██║███████╗███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║
 ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
`}
            </pre>

            {loading ? (
              <div className="space-y-3 text-[var(--terminal-green)] font-mono text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-[var(--terminal-yellow)]">&gt;</span>
                  <span>ACCESSING DATABASE...</span>
                  <span className="animate-pulse">█</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[var(--terminal-yellow)]">&gt;</span>
                  <span>LOADING WEEKLY BRIEFS...</span>
                </p>
              </div>
            ) : error ? (
              <div className="space-y-3 text-[var(--terminal-red)] font-mono text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-[var(--terminal-yellow)]">&gt;</span>
                  <span>ERROR: {error}</span>
                </p>
                <p className="text-[var(--terminal-gray)] text-xs mt-4">
                  Make sure you've added your Supabase credentials to the .env file
                </p>
              </div>
            ) : articles.length === 0 ? (
              <div className="space-y-3 text-[var(--terminal-yellow)] font-mono text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-[var(--terminal-yellow)]">&gt;</span>
                  <span>NO WEEKLY BRIEFS FOUND</span>
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-[var(--terminal-green)] font-mono text-sm mb-4">
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--terminal-yellow)]">&gt;</span>
                    <span>FOUND {articles.length} WEEKLY BRIEF{articles.length !== 1 ? 'S' : ''}</span>
                  </p>
                </div>

                <Accordion type="multiple" defaultValue={[]} className="space-y-4">
                  {articles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <AccordionItem
                        value={article.id}
                        className="terminal-accordion-item border-0"
                      >
                        <AccordionTrigger hideIcon className="terminal-accordion-trigger hover:no-underline">
                          <div className="flex flex-col gap-1 w-full text-left">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2 text-xs text-[var(--terminal-gray)] uppercase">
                                <span className="terminal-prompt-icon text-sm">[&gt;]</span>
                                <span>Week of {new Date(article.week_start_date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}</span>
                              </div>
                              <div className="flex gap-4 text-xs text-[var(--terminal-gray)] whitespace-nowrap">
                                {article.word_count && <span>{article.word_count.toLocaleString()} words</span>}
                                {article.reading_time_minutes && <span>· {article.reading_time_minutes} min</span>}
                              </div>
                            </div>

                            <h3 className="trigger-title text-[var(--terminal-cyan)] font-bold text-base terminal-glow transition-colors">
                              {article.title}
                            </h3>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="pt-4 pb-6">
                          {article.essay_content && (
                            <div className="text-[var(--terminal-green)] text-base leading-relaxed antialiased prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            h1: ({ children }) => (
                              <h1 className="text-[var(--terminal-cyan)] text-xl font-bold mb-4 mt-6 terminal-glow">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-[var(--terminal-cyan)] text-lg font-bold mb-3 mt-5 terminal-glow">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-[var(--terminal-cyan)] text-base font-bold mb-2 mt-4">
                                {children}
                              </h3>
                            ),
                            p: ({ children }) => (
                              <p className="text-[var(--terminal-bright-green)] mb-4 leading-relaxed">
                                {children}
                              </p>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc list-inside mb-4 space-y-2 text-[var(--terminal-green)]">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal list-inside mb-4 space-y-2 text-[var(--terminal-green)]">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="mb-2 leading-relaxed">{children}</li>
                            ),
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--terminal-cyan)] hover:text-[var(--terminal-yellow)] underline transition-colors"
                              >
                                {children}
                              </a>
                            ),
                            strong: ({ children }) => (
                              <strong className="text-[var(--terminal-yellow)] font-bold">
                                {children}
                              </strong>
                            ),
                            em: ({ children }) => (
                              <em className="text-[var(--terminal-gray)] italic">
                                {children}
                              </em>
                            ),
                            code: ({ children }) => (
                              <code className="bg-[var(--terminal-dark-gray)] text-[var(--terminal-yellow)] px-1 py-0.5 rounded text-xs font-mono">
                                {children}
                              </code>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-2 border-[var(--terminal-yellow)] pl-3 my-4 text-[var(--terminal-gray)] italic">
                                {children}
                              </blockquote>
                            ),
                          }}
                        >
                          {article.essay_content}
                        </ReactMarkdown>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
