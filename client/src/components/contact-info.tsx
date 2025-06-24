import { motion } from 'framer-motion';
import { Phone, Linkedin, Twitter, Globe } from 'lucide-react';

interface ContactInfoProps {
  isVisible: boolean;
}

export default function ContactInfo({ isVisible }: ContactInfoProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-16 mb-8"
    >
      <div className="max-w-md mx-auto bg-black border-2 border-[var(--terminal-green)] p-8 rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-[var(--terminal-yellow)] text-2xl font-bold font-mono mb-2">
            CONTACT UNLOCKED
          </h3>
          <div className="text-[var(--terminal-green)] text-sm font-mono">
            Defense successful. Access granted.
          </div>
        </div>

        <div className="space-y-4">
          <motion.a
            href="tel:6196298452"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 p-3 border border-[var(--terminal-gray)] hover:border-[var(--terminal-yellow)] transition-colors group"
          >
            <Phone className="w-5 h-5 text-[var(--terminal-green)] group-hover:text-[var(--terminal-yellow)]" />
            <span className="font-mono text-[var(--terminal-green)] group-hover:text-[var(--terminal-yellow)]">
              619-629-8452
            </span>
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/joshuarenfro"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 p-3 border border-[var(--terminal-gray)] hover:border-[var(--terminal-yellow)] transition-colors group"
          >
            <Linkedin className="w-5 h-5 text-[var(--terminal-green)] group-hover:text-[var(--terminal-yellow)]" />
            <span className="font-mono text-[var(--terminal-green)] group-hover:text-[var(--terminal-yellow)]">
              linkedin.com/in/joshuarenfro
            </span>
          </motion.a>

          <motion.a
            href="https://twitter.com/joshuarenfro"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 p-3 border border-[var(--terminal-gray)] hover:border-[var(--terminal-yellow)] transition-colors group"
          >
            <Twitter className="w-5 h-5 text-[var(--terminal-green)] group-hover:text-[var(--terminal-yellow)]" />
            <span className="font-mono text-[var(--terminal-green)] group-hover:text-[var(--terminal-yellow)]">
              @joshuarenfro
            </span>
          </motion.a>

          <motion.a
            href="https://joshuarenfro.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 p-3 border border-[var(--terminal-gray)] hover:border-[var(--terminal-yellow)] transition-colors group"
          >
            <Globe className="w-5 h-5 text-[var(--terminal-green)] group-hover:text-[var(--terminal-yellow)]" />
            <span className="font-mono text-[var(--terminal-green)] group-hover:text-[var(--terminal-yellow)]">
              joshuarenfro.com
            </span>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 pt-4 border-t border-[var(--terminal-gray)]"
        >
          <p className="text-[var(--terminal-green)] text-xs font-mono text-center">
            Thanks for playing! Let's build something amazing together.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}