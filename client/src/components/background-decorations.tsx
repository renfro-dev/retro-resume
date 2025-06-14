export default function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-10 w-32 h-32 bg-[hsl(0,100%,85%)] rounded-full opacity-30 animate-pulse-slow"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-[hsl(120,100%,87%)] rounded-full opacity-40 animate-float"></div>
      <div className="absolute bottom-40 left-20 w-28 h-28 bg-[hsl(60,100%,93%)] rounded-full opacity-35 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-36 h-36 bg-[hsl(28,100%,86%)] rounded-full opacity-30 animate-float"></div>
    </div>
  );
}
