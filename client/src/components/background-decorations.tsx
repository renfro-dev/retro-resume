export default function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Terminal geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-[var(--terminal-green)] opacity-20 animate-pulse-slow" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
      <div className="absolute top-40 right-20 w-24 h-24 border border-[var(--terminal-cyan)] opacity-30 animate-float" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
      <div className="absolute bottom-40 left-20 w-28 h-28 border border-[var(--terminal-yellow)] opacity-25 animate-pulse-slow" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
      <div className="absolute bottom-20 right-10 w-36 h-36 border border-[var(--terminal-green)] opacity-20 animate-float" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
      
      {/* Floating code snippets */}
      <div className="absolute top-32 right-32 text-[var(--terminal-gray)] text-xs font-mono opacity-10 animate-float">
        <div>$ npm install toolkit</div>
        <div>$ git commit -m "progress"</div>
      </div>
      <div className="absolute bottom-32 left-32 text-[var(--terminal-gray)] text-xs font-mono opacity-10 animate-pulse-slow">
        <div>function innovate() {'{'}</div>
        <div>{'  '}return success;</div>
        <div>{'}'}</div>
      </div>
    </div>
  );
}
