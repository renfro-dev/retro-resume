import { Link, useLocation } from "wouter";

interface NavTab {
  path: string;
  label: string;
  external?: boolean;
}

const tabs: NavTab[] = [
  { path: "/", label: "ABOUT" },
  { path: "/bio", label: "BIO" },
  { path: "/research", label: "RESEARCH" },
  { path: "/vibetube", label: "VIBETUBE" },
  { path: "https://github.com/renfro-dev/openharp", label: "OPENHARP", external: true },
  // { path: "/brands", label: "BRANDS" },
];

export default function NavigationTabs() {
  const [location] = useLocation();

  return (
    <nav className="flex items-center gap-6">
      {tabs.map((tab) => {
        const isActive = location === tab.path;

        if (tab.external) {
          return (
            <a
              key={tab.path}
              href={tab.path}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm tracking-wider transition-all duration-300 text-[var(--terminal-gray)] hover:text-[var(--terminal-yellow)]"
            >
              {tab.label}
            </a>
          );
        }

        return (
          <Link key={tab.path} href={tab.path}>
            <a
              className={`
                font-mono text-sm tracking-wider transition-all duration-300
                ${
                  isActive
                    ? "text-[var(--terminal-green)] terminal-glow"
                    : "text-[var(--terminal-gray)] hover:text-[var(--terminal-yellow)]"
                }
              `}
            >
              {isActive ? `[ ${tab.label} ]` : tab.label}
            </a>
          </Link>
        );
      })}
    </nav>
  );
}
