import { Button } from "@/components/ui/button";

export default function Footer() {
  const handleContact = () => {
    console.log("Contact clicked");
    // Add contact logic here
  };

  const handlePortfolio = () => {
    console.log("Portfolio clicked");
    // Add portfolio navigation here
  };

  return (
    <footer className="relative z-10 bg-black border-t border-[var(--terminal-green)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <div className="text-[var(--terminal-green)] text-sm font-mono mb-2">
            guest@term.toolkit.com:~$ ls -la /home/journey/
          </div>
          <div className="text-[var(--terminal-gray)] text-xs font-mono">
            total 8 chapters • drwxr-xr-x innovation completed • -rw-r--r-- future.txt
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <Button
            onClick={handleContact}
            className="bg-transparent border border-[var(--terminal-green)] text-[var(--terminal-green)] px-6 py-2 hover:bg-[var(--terminal-green)] hover:text-black transition-all duration-300 font-mono text-sm"
            variant="outline"
          >
            ./contact.sh
          </Button>
          <Button
            onClick={handlePortfolio}
            className="bg-[var(--terminal-green)] text-black px-6 py-2 hover:bg-[var(--terminal-yellow)] transition-all duration-300 font-mono text-sm"
          >
            cat portfolio.txt
          </Button>
        </div>
        <div className="text-center mt-6">
          <div className="text-[var(--terminal-gray)] text-xs font-mono">
            Process completed with exit code 0
          </div>
        </div>
      </div>
    </footer>
  );
}
