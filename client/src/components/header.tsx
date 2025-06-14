export default function Header() {
  return (
    <header className="bg-black border-b border-[var(--terminal-green)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center">
          <span className="text-[var(--terminal-green)] font-mono text-lg terminal-glow">joshua@renfro.dev</span>
        </div>
      </div>
    </header>
  );
}
