import { motion } from "framer-motion";
import Header from "@/components/header";
import VectorWalk from "@/components/vector-walk";

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
                <span className="text-[var(--terminal-cyan)] font-bold">Growth Engineer</span>,{" "}
                <span className="text-[var(--terminal-cyan)] font-bold">RevOps Leader</span>, and{" "}
                <span className="text-[var(--terminal-cyan)] font-bold">AI Researcher</span>.
              </p>

              <p>
                <span className="text-[var(--terminal-yellow)]">&gt;</span> I build{" "}
                <span className="text-[var(--terminal-bright-green)] font-bold">
                  products and teams
                </span>{" "}
                that help companies grow.
              </p>

            </div>
          </motion.div>

          <div className="mt-16 max-w-3xl mx-auto">
            <VectorWalk />
          </div>
        </div>
      </main>
    </div>
  );
}
