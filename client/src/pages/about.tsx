import { motion } from "framer-motion";
import Header from "@/components/header";

export default function About() {
  return (
    <div className="font-mono bg-terminal pattern-grid min-h-screen">
      <Header />

      <main className="relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-12 sm:px-16 lg:px-20 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="terminal-card p-8 max-w-2xl mx-auto"
          >
            <div className="space-y-6 text-[var(--terminal-green)] text-base leading-relaxed">
              <p>
                <span className="text-[var(--terminal-yellow)]">&gt;</span> My name is Joshua.
              </p>

              <p>
                <span className="text-[var(--terminal-yellow)]">&gt;</span> I'm a{" "}
                <span className="text-[var(--terminal-cyan)] font-bold">RevOps Leader</span>,{" "}
                <span className="text-[var(--terminal-cyan)] font-bold">GTM Strategist</span>, and{" "}
                <span className="text-[var(--terminal-cyan)] font-bold">Vibe Coder</span>.
              </p>

              <p>
                <span className="text-[var(--terminal-yellow)]">&gt;</span> I'm currently researching{" "}
                <span className="text-[var(--terminal-bright-green)] font-bold">
                  context orchestration
                </span>{" "}
                (MCP, agents, vector databases) and how these tools can create leverage for high
                velocity leaders.
              </p>

              <p>
                <span className="text-[var(--terminal-yellow)]">&gt;</span> Want to connect? You can
                schedule a meeting with me{" "}
                <a
                  href="https://calendar.app.google/4yFy6fGkPc9r6UAs8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--terminal-cyan)] hover:text-[var(--terminal-yellow)] underline transition-colors terminal-glow"
                >
                  here
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
