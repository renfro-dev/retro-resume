export default function Header() {
  return (
    <header className="bg-black border-b border-[var(--terminal-green)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-[var(--terminal-green)] font-mono text-sm">guest@term.toolkit.com:~$</span>
          </div>
          <div className="text-center flex-1">
            <h1 className="font-mono text-2xl md:text-3xl lg:text-4xl text-[var(--terminal-green)] terminal-glow font-bold tracking-wider">
              THE STORY OF A TOOLKIT
            </h1>
            <div className="text-[var(--terminal-gray)] text-xs mt-1 font-mono">
              Type 'help' to see list of available commands.
            </div>
          </div>
          <div className="w-24"></div>
        </div>
      </div>
    </header>
  );
}
