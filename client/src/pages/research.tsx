import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import ReactMarkdown from "react-markdown";
import Header from "@/components/header";
import { supabase, type Article, isWeeklyBrief, isContextOrchestration } from "@/lib/supabase";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link2, Check } from "lucide-react";

type ResearchTheme = 'ai_evolution' | 'context_orchestration';

const THEME_CONFIG = {
  ai_evolution: {
    label: 'AI Evolution',
    table: 'weekly_briefs',
    dateField: 'week_start_date',
    loadingText: 'LOADING WEEKLY BRIEFS...',
    notFoundText: 'NO WEEKLY BRIEFS FOUND',
    foundText: 'WEEKLY BRIEF'
  },
  context_orchestration: {
    label: 'Context Orchestration',
    table: 'context_orchestration_briefs',
    dateField: 'period_start_date',
    loadingText: 'LOADING ARTICLES...',
    notFoundText: 'NO ARTICLES FOUND',
    foundText: 'ARTICLE'
  }
} as const;

export default function Research() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ResearchTheme>('ai_evolution');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Get briefId from URL
  const [, params] = useRoute("/research/:briefId");
  const [, setLocation] = useLocation();

  useEffect(() => {
    async function fetchArticles() {
      const config = THEME_CONFIG[selectedTheme];
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from(config.table)
          .select('*')
          .order(config.dateField, { ascending: false });

        if (error) {
          console.error('Supabase error details:', error);
          throw new Error(`Supabase error: ${error.message} (Code: ${error.code})`);
        }

        setArticles(data || []);
      } catch (err) {
        console.error('Error fetching articles:', err);
        console.error('Selected theme:', selectedTheme);
        console.error('Table name:', config.table);
        setError(err instanceof Error ? err.message : 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [selectedTheme]);

  // Open brief from URL param when articles load
  useEffect(() => {
    if (params?.briefId && articles.length > 0) {
      const briefExists = articles.some(a => a.id === params.briefId);
      if (briefExists) {
        setOpenItems([params.briefId]);
      }
    }
  }, [params?.briefId, articles]);

  // Handle accordion change and update URL
  const handleAccordionChange = (value: string[]) => {
    setOpenItems(value);
    // Update URL to the first open item (or clear if none)
    if (value.length > 0) {
      setLocation(`/research/${value[0]}`);
    } else {
      setLocation('/research');
    }
  };

  // Copy link to clipboard
  const copyBriefLink = (briefId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/research/${briefId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(briefId);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <pre className="text-[var(--terminal-cyan)] text-xs terminal-glow">
{`
 ██████╗ ███████╗███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
 ██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
 ██████╔╝█████╗  ███████╗█████╗  ███████║██████╔╝██║     ███████║
 ██╔══██╗██╔══╝  ╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
 ██║  ██║███████╗███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║
 ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
`}
              </pre>
              <div className="flex items-center gap-2">
                <span className="text-[var(--terminal-green)] text-xs font-mono">THEME:</span>
                <Select value={selectedTheme} onValueChange={(value) => setSelectedTheme(value as ResearchTheme)}>
                  <SelectTrigger className="w-[200px] bg-[var(--terminal-dark-gray)] border-[var(--terminal-cyan)] text-[var(--terminal-cyan)] font-mono text-xs hover:border-[var(--terminal-yellow)] focus:ring-[var(--terminal-yellow)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--terminal-dark-gray)] border-[var(--terminal-cyan)] font-mono">
                    <SelectItem
                      value="ai_evolution"
                      className="text-[var(--terminal-cyan)] text-xs focus:bg-[var(--terminal-cyan)] focus:text-[var(--terminal-dark-gray)] cursor-pointer"
                    >
                      AI Evolution
                    </SelectItem>
                    <SelectItem
                      value="context_orchestration"
                      className="text-[var(--terminal-cyan)] text-xs focus:bg-[var(--terminal-cyan)] focus:text-[var(--terminal-dark-gray)] cursor-pointer"
                    >
                      Context Orchestration
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="space-y-3 text-[var(--terminal-green)] font-mono text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-[var(--terminal-yellow)]">&gt;</span>
                  <span>ACCESSING DATABASE...</span>
                  <span className="animate-pulse">█</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[var(--terminal-yellow)]">&gt;</span>
                  <span>{THEME_CONFIG[selectedTheme].loadingText}</span>
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
                  <span>{THEME_CONFIG[selectedTheme].notFoundText}</span>
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-[var(--terminal-green)] font-mono text-sm mb-4">
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--terminal-yellow)]">&gt;</span>
                    <span>FOUND {articles.length} {THEME_CONFIG[selectedTheme].foundText}{articles.length !== 1 ? 'S' : ''}</span>
                  </p>
                </div>

                <Accordion type="multiple" value={openItems} onValueChange={handleAccordionChange} className="space-y-4">
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
                                <span>
                                  {isWeeklyBrief(article) ? (
                                    (() => {
                                      // Publish date is the day after the week ends (start + 7 days)
                                      const startDate = new Date(article.week_start_date);
                                      const publishDate = new Date(startDate);
                                      publishDate.setDate(startDate.getDate() + 7);
                                      return publishDate.toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                      });
                                    })()
                                  ) : isContextOrchestration(article) ? (
                                    `${new Date(article.period_start_date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      year: 'numeric'
                                    })}`
                                  ) : null}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-[var(--terminal-gray)] whitespace-nowrap">
                                {article.word_count && <span>{article.word_count.toLocaleString()} words</span>}
                                {article.reading_time_minutes && <span>· {article.reading_time_minutes} min</span>}
                                <button
                                  onClick={(e) => copyBriefLink(article.id, e)}
                                  className="p-1 rounded hover:bg-[var(--terminal-dark-gray)] transition-colors"
                                  title="Copy link to brief"
                                >
                                  {copiedId === article.id ? (
                                    <Check className="w-3.5 h-3.5 text-[var(--terminal-green)]" />
                                  ) : (
                                    <Link2 className="w-3.5 h-3.5 text-[var(--terminal-gray)] hover:text-[var(--terminal-cyan)]" />
                                  )}
                                </button>
                              </div>
                            </div>

                            <h3 className="trigger-title text-[var(--terminal-cyan)] font-bold text-base terminal-glow transition-colors">
                              {article.title}
                            </h3>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="pt-4 pb-6">
                          {article.essay_content && (
                            <div className="text-white text-base leading-relaxed antialiased prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            h1: ({ children }) => (
                              <h1 className="text-[var(--terminal-yellow)] text-xl font-bold mb-4 mt-6">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-[var(--terminal-yellow)] text-lg font-bold mb-3 mt-5">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-[var(--terminal-yellow)] text-base font-bold mb-2 mt-4">
                                {children}
                              </h3>
                            ),
                            p: ({ children }) => (
                              <p className="text-white mb-4 leading-relaxed">
                                {children}
                              </p>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc list-inside mb-4 space-y-2 text-white">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal list-inside mb-4 space-y-2 text-white">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="mb-2 leading-relaxed text-white">{children}</li>
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
