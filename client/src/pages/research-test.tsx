import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import { supabase } from "@/lib/supabase";

export default function ResearchTest() {
  const [status, setStatus] = useState("initializing...");
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    async function testConnection() {
      try {
        setStatus("connecting to supabase...");

        const { data, error } = await supabase
          .from('weekly_briefs')
          .select('*')
          .order('week_start_date', { ascending: false });

        if (error) {
          setStatus(`Error: ${error.message}`);
          console.error('Supabase error:', error);
          return;
        }

        setStatus(`Success! Found ${data?.length || 0} articles`);
        setArticles(data || []);
        console.log('Articles:', data);
      } catch (err) {
        setStatus(`Catch error: ${err}`);
        console.error('Catch error:', err);
      }
    }

    testConnection();
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
            <div className="text-[var(--terminal-green)] font-mono text-sm space-y-4">
              <p className="text-[var(--terminal-cyan)] text-xl mb-4">Research Test Page</p>

              <div className="space-y-2">
                <p><span className="text-[var(--terminal-yellow)]">Status:</span> {status}</p>
                <p><span className="text-[var(--terminal-yellow)]">Articles Count:</span> {articles.length}</p>
              </div>

              {articles.length > 0 && (
                <div className="mt-6 space-y-4">
                  <p className="text-[var(--terminal-cyan)]">Articles:</p>
                  {articles.map((article, i) => (
                    <div key={i} className="border-l-2 border-[var(--terminal-cyan)] pl-4">
                      <pre className="text-xs">{JSON.stringify(article, null, 2)}</pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
