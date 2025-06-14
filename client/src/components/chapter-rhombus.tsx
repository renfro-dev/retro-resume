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
      className="rhombus w-64 h-64 bg-[hsl(211,48%,80%)] cursor-pointer group relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="rhombus-content w-full h-full flex flex-col items-center justify-center p-6 text-center">
        <img 
          src={imageUrl} 
          alt={imageAlt}
          className="w-20 h-16 object-cover rounded-lg mb-3 opacity-80 group-hover:opacity-100 transition-opacity"
        />
        <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
        <div className="chapter-reveal">
          <p className="text-white text-sm opacity-90">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
