import NavigationTabs from "./navigation-tabs";

export default function Header() {
  return (
    <header className="bg-black sticky top-0 z-50 border-b border-[var(--terminal-dark-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <NavigationTabs />
          <span className="hidden sm:inline text-[var(--terminal-green)] font-mono text-sm terminal-glow">
            joshua@renfro.dev
          </span>
        </div>
      </div>
    </header>
  );
}
