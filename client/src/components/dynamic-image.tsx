import { useState, useEffect } from "react";

interface DynamicImageProps {
  filename: string;
  alt: string;
  className?: string;
}

export default function DynamicImage({ filename, alt, className }: DynamicImageProps) {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Directly use the static asset URL
    setImageSrc(`/api/assets/${encodeURIComponent(filename)}`);
    setLoading(false);
  }, [filename]);

  if (loading) {
    return (
      <div className={`${className} bg-[var(--terminal-gray)] animate-pulse flex items-center justify-center`}>
        <span className="text-[var(--terminal-green)] text-xs">Loading...</span>
      </div>
    );
  }

  if (error || !imageSrc) {
    return (
      <div className={`${className} bg-[var(--terminal-gray)] flex items-center justify-center`}>
        <span className="text-[var(--terminal-red)] text-xs">Image not found</span>
      </div>
    );
  }

  return <img src={imageSrc} alt={alt} className={className} />;
}