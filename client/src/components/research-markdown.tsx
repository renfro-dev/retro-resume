import ReactMarkdown from "react-markdown";

export default function ResearchMarkdown({ children }: { children: string }) {
  return (
    <div className="text-white text-base leading-relaxed antialiased prose prose-sm prose-invert max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-[var(--terminal-yellow)] text-xl font-bold mb-4 mt-6">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-[var(--terminal-yellow)] text-lg font-bold mb-3 mt-5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-[var(--terminal-yellow)] text-base font-bold mb-2 mt-4">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-white mb-4 leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-white">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-white">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="mb-2 leading-relaxed text-white">{children}</li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--terminal-cyan)] hover:text-[var(--terminal-yellow)] underline transition-colors"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="text-[var(--terminal-yellow)] font-bold">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-[var(--terminal-gray)] italic">
              {children}
            </em>
          ),
          code: ({ children }) => (
            <code className="bg-[var(--terminal-dark-gray)] text-[var(--terminal-yellow)] px-1 py-0.5 rounded text-xs font-mono">
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[var(--terminal-yellow)] pl-3 my-4 text-[var(--terminal-gray)] italic">
              {children}
            </blockquote>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
