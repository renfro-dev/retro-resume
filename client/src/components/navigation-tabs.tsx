import { Link, useLocation } from "wouter";

interface NavTab {
  path: string;
  label: string;
}

const tabs: NavTab[] = [
  { path: "/", label: "BIO" },
  { path: "/research", label: "RESEARCH" },
  { path: "/brands", label: "BRANDS" },
];

export default function NavigationTabs() {
  const [location] = useLocation();

  return (
    <nav className="flex items-center gap-6">
      {tabs.map((tab) => {
        const isActive = location === tab.path;
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
