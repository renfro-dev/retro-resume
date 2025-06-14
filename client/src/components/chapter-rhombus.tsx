import { motion } from "framer-motion";

interface ChapterRhombusProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  index: number;
}

export default function ChapterRhombus({ title, description, imageUrl, imageAlt, index }: ChapterRhombusProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="terminal-card w-80 h-48 cursor-pointer group relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="terminal-card-content w-full h-full flex flex-col items-start justify-start p-4 text-left">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-[var(--terminal-green)] text-xs font-mono">{'>'}</span>
          <h3 className="text-[var(--terminal-green)] font-mono text-sm font-bold terminal-glow">{title.toLowerCase().replace(/\s+/g, '_')}</h3>
        </div>
        <div className="chapter-reveal w-full">
          <div className="text-[var(--terminal-gray)] text-xs font-mono leading-relaxed mb-3">
            {description}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[var(--terminal-cyan)] text-xs font-mono">[EXECUTING]</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-[var(--terminal-green)] rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-[var(--terminal-green)] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-1 h-1 bg-[var(--terminal-green)] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2">
          <span className="text-[var(--terminal-gray)] text-xs font-mono">#{index + 1}</span>
        </div>
      </div>
    </motion.div>
  );
}
