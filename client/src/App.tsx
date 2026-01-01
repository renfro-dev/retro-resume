import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Research from "@/pages/research";
import ResearchTest from "@/pages/research-test";
import Bio from "@/pages/bio";
import Brands from "@/pages/brands";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/research" component={Research} />
      <Route path="/research-test" component={ResearchTest} />
      <Route path="/bio" component={Bio} />
      <Route path="/brands" component={Brands} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Force title persistence throughout app lifecycle
  useEffect(() => {
    document.title = "Retro Resume";
    
    // Create observer to watch for any title changes and revert them
    const titleObserver = new MutationObserver(() => {
      if (document.title !== "Retro Resume") {
        document.title = "Retro Resume";
      }
    });
    
    titleObserver.observe(document.querySelector('title') || document.head, {
      childList: true,
      characterData: true,
      subtree: true
    });
    
    return () => titleObserver.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
