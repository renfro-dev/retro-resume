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
    <footer className="relative z-10 bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-white text-lg font-medium mb-4">Continue the Journey</p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button
            onClick={handleContact}
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-opacity-30 transition-all duration-300 font-medium border-0"
            variant="ghost"
          >
            Get In Touch
          </Button>
          <Button
            onClick={handlePortfolio}
            className="bg-[hsl(211,48%,80%)] bg-opacity-80 text-white px-6 py-3 rounded-full hover:bg-opacity-100 transition-all duration-300 font-medium border-0"
          >
            View Portfolio
          </Button>
        </div>
      </div>
    </footer>
  );
}
