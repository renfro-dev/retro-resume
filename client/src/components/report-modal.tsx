import { motion, AnimatePresence } from "framer-motion";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export default function ReportModal({ isOpen, onClose, title, content }: ReportModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-80"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="relative workflow-card w-full max-w-4xl max-h-[80vh] p-6 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[var(--terminal-green)] font-mono text-lg font-bold terminal-glow">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-[var(--terminal-red)] hover:text-[var(--terminal-yellow)] font-mono text-xl transition-colors duration-200"
            >
              ✕
            </button>
          </div>
          
          {/* Content */}
          <div className="text-[var(--terminal-gray)] font-mono text-sm leading-relaxed">
            {content}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}