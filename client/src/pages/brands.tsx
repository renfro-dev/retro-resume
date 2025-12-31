import { motion } from "framer-motion";
import Header from "@/components/header";

export default function Brands() {
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
            <pre className="text-[var(--terminal-cyan)] text-xs mb-6 terminal-glow">
{`
 ██████╗ ██████╗  █████╗ ███╗   ██╗██████╗ ███████╗
 ██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗██╔════╝
 ██████╔╝██████╔╝███████║██╔██╗ ██║██║  ██║███████╗
 ██╔══██╗██╔══██╗██╔══██║██║╚██╗██║██║  ██║╚════██║
 ██████╔╝██║  ██║██║  ██║██║ ╚████║██████╔╝███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝
`}
            </pre>

            <div className="space-y-3 text-[var(--terminal-green)] font-mono text-sm">
              <p className="flex items-center gap-2">
                <span className="text-[var(--terminal-yellow)]">&gt;</span>
                <span>FETCHING BRAND_PORTFOLIO...</span>
                <span className="animate-pulse">█</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[var(--terminal-yellow)]">&gt;</span>
                <span>LOADING COLLABORATIONS...</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[var(--terminal-yellow)]">&gt;</span>
                <span>STATUS: UNDER CONSTRUCTION</span>
              </p>

              <div className="mt-6">
                <div className="flex items-center gap-2 text-xs text-[var(--terminal-gray)]">
                  <span>[</span>
                  <div className="flex-1 flex">
                    <span className="text-[var(--terminal-green)]">█████</span>
                    <span className="text-[var(--terminal-dark-gray)]">█████</span>
                  </div>
                  <span>]</span>
                  <span>50%</span>
                </div>
              </div>

              <p className="mt-6 text-[var(--terminal-cyan)]">
                Coming soon: Companies I've worked with, brands I've built,
                and partnerships that shaped my journey.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
