import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Force title update to override Replit development environment interference
document.title = "Retro Resume";

// Set title again after DOM loads to ensure it persists
window.addEventListener('DOMContentLoaded', () => {
  document.title = "Retro Resume";
});

// Set title after React renders to override any React Router or other interference
setTimeout(() => {
  document.title = "Retro Resume";
}, 100);

createRoot(document.getElementById("root")!).render(<App />);
