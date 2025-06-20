import { motion } from "framer-motion";

interface ChapterRhombusProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  index: number;
  status?: string;
  onReportClick?: () => void;
}

export default function ChapterRhombus({ title, description, imageUrl, imageAlt, index, status = "Complete", onReportClick }: ChapterRhombusProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="workflow-card w-80 h-40 cursor-pointer group relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-full h-full flex flex-col items-start justify-between p-4 text-left">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[var(--terminal-green)] rounded-full"></div>
            <h3 className="text-[var(--terminal-green)] font-mono text-sm font-bold terminal-glow">{title}</h3>
          </div>
          <span className="text-[var(--terminal-gray)] text-xs font-mono">#{index + 1}</span>
        </div>
        <div className="w-full">
          <div className="text-[var(--terminal-gray)] text-xs font-mono leading-tight mb-3">
            {description.length > 120 ? description.substring(0, 120) + '...' : description}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-[var(--terminal-cyan)] text-xs font-mono">{status.toUpperCase()}</span>
              {status === "Active" && (
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-[var(--terminal-green)] rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-[var(--terminal-green)] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-1 bg-[var(--terminal-green)] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-[var(--terminal-green)] text-xs font-mono">{status === "Complete" ? "✓" : "◯"}</div>
              <button 
                onClick={onReportClick}
                className="bg-transparent border border-[var(--terminal-green)] text-[var(--terminal-green)] px-2 py-1 font-mono text-xs hover:bg-[var(--terminal-green)] hover:text-black transition-all duration-300"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
