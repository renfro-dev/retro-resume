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
    const loadImage = async () => {
      try {
        const response = await fetch(`/api/image/${encodeURIComponent(filename)}`);
        if (response.ok) {
          const data = await response.json();
          setImageSrc(data.dataUrl);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
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