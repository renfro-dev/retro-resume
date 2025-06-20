import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/header";
import ChapterRhombus from "@/components/chapter-rhombus";
import BackgroundDecorations from "@/components/background-decorations";
import Footer from "@/components/footer";
import ReportModal from "@/components/report-modal";

const chapters = [
  {
    title: "Hustle",
    description: "Built a six figure business at 19 while attending university full time. Managed to balance demanding coursework with aggressive client acquisition and service delivery. Learned the fundamentals of time management, prioritization, and the relentless work ethic required to succeed in competitive markets.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Business growth and time management",
    status: "Complete",
    reportContent: "Placeholder content for Hustle report."
  },
  {
    title: "Velocity",
    description: "First 100 employees at one of the fastest growing companies in the world, experiencing hypergrowth from startup to unicorn status. Witnessed firsthand how operational excellence, culture preservation, and systematic scaling enable sustainable rapid expansion. Developed expertise in high-velocity environments where decisions must be made quickly with incomplete information.",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Fast growing company scaling",
    status: "Complete",
    reportContent: "Placeholder content for Velocity report."
  },
  {
    title: "Grit",
    description: "Started two software companies that ultimately failed despite raising over $2M in venture capital. Experienced the full entrepreneurial cycle from ideation through fundraising to market reality and eventual shutdown. These failures provided invaluable lessons about product-market fit, capital efficiency, team dynamics, and the resilience required to bounce back from significant setbacks.",
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Software company founding and fundraising",
    status: "Complete",
    reportContent: "Placeholder content for Grit report."
  },

  {
    title: "Humility",
    description: "Ran an operation valued at over $1B that was ultimately destroyed by government intervention and regulatory changes. Managed large-scale operations with thousands of stakeholders while navigating complex compliance requirements and political pressures. This experience taught profound lessons about external risk factors, regulatory capture, and the importance of building sustainable businesses that align with long-term societal interests.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Large scale operations management",
    status: "Complete",
    reportContent: "Placeholder content for Humility report."
  },
  {
    title: "PMF",
    description: "Found product market fit in the legal space after years of iteration and customer development. Built a technology platform that successfully addresses real pain points for legal professionals, achieving consistent revenue growth and customer retention. This success validated the hypothesis that legal technology can significantly improve efficiency and outcomes when properly designed with deep domain expertise.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Product market fit and legal technology",
    status: "Complete",
    reportContent: "Placeholder content for PMF report."
  },
  {
    title: "Roots",
    description: "I'm happily married to a badass creative who brings artistic vision and design expertise to everything we do together. We've spent considerable time gardening, cultivating both plants and our relationship through shared projects and outdoor work. This grounding in personal relationships and connection to the earth provides essential balance to the intensity of entrepreneurial pursuits.",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Gardening and family life",
    status: "Active",
    reportContent: "Placeholder content for Roots report."
  },
  {
    title: "Entre-curious",
    description: "I'm interested in buying and operating antiquated businesses that have been overlooked by modern entrepreneurs but still serve essential market needs. These established enterprises often have loyal customer bases, proven business models, and opportunities for operational improvements through technology integration. The challenge lies in preserving what works while modernizing systems and processes to unlock hidden value.",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Curiosity and entrepreneurial mindset",
    status: "Active",
    reportContent: "Placeholder content for Entre-curious report."
  }
];

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const [workflowsVisible, setWorkflowsVisible] = useState(false);
  const [techStackVisible, setTechStackVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<typeof chapters[0] | null>(null);
  const [buttonReady, setButtonReady] = useState(false);
  const [buttonText, setButtonText] = useState("workflow loading...");
  const [buttonFlashing, setButtonFlashing] = useState(true);
  const [loadingSequenceCompleted, setLoadingSequenceCompleted] = useState(false);
  const galagaShipsRef = useRef<{ left: HTMLDivElement | null; right: HTMLDivElement | null }>({ left: null, right: null });

  const openModal = (workflow: typeof chapters[0]) => {
    setSelectedWorkflow(workflow);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedWorkflow(null);
  };



  useEffect(() => {
    const shootLaser = (ship: HTMLDivElement) => {
      const laser = document.createElement('div');
      laser.className = 'galaga-laser';
      laser.style.left = '50%';
      laser.style.top = '-20px';
      laser.style.transform = 'translateX(-50%)';
      ship.appendChild(laser);
      
      // Remove laser after animation completes
      setTimeout(() => {
        if (laser.parentNode) {
          laser.parentNode.removeChild(laser);
        }
      }, 1500);
    };

    const handleScroll = () => {
      if (mainRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        mainRef.current.style.transform = `translateY(${rate}px)`;
      }
      
      // Update Galaga ship positions and trigger shooting
      const scrollProgress = window.scrollY;
      const ships = galagaShipsRef.current;
      
      if (ships.left && ships.right) {
        // Position ships based on scroll
        const shipY = Math.max(200, window.innerHeight - 100 - scrollProgress * 0.3);
        ships.left.style.top = `${shipY}px`;
        ships.right.style.top = `${shipY}px`;
        
        // Trigger shooting every 100px of scroll
        if (scrollProgress > 0 && scrollProgress % 100 < 10) {
          shootLaser(ships.left);
          shootLaser(ships.right);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Button transition sequence
    const timer = setTimeout(() => {
      setButtonFlashing(false);
      setButtonText("activate workflow");
      setButtonReady(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Generate dots around the border
    const generateDots = () => {
      const container = dotsContainerRef.current;
      if (!container) return;

      const dots: HTMLDivElement[] = [];
      const dotSpacing = 30;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Top border dots
      for (let x = 50; x < screenWidth - 50; x += dotSpacing) {
        const dot = document.createElement('div');
        dot.className = 'pac-dot';
        dot.style.left = `${x}px`;
        dot.style.top = '15px';
        dot.dataset.side = 'top';
        dot.dataset.position = x.toString();
        container.appendChild(dot);
        dots.push(dot);
      }

      // Right border dots
      for (let y = 50; y < screenHeight - 50; y += dotSpacing) {
        const dot = document.createElement('div');
        dot.className = 'pac-dot';
        dot.style.right = '15px';
        dot.style.top = `${y}px`;
        dot.dataset.side = 'right';
        dot.dataset.position = y.toString();
        container.appendChild(dot);
        dots.push(dot);
      }

      // Bottom border dots
      for (let x = screenWidth - 50; x > 50; x -= dotSpacing) {
        const dot = document.createElement('div');
        dot.className = 'pac-dot';
        dot.style.left = `${x}px`;
        dot.style.bottom = '15px';
        dot.dataset.side = 'bottom';
        dot.dataset.position = x.toString();
        container.appendChild(dot);
        dots.push(dot);
      }

      // Left border dots
      for (let y = screenHeight - 50; y > 50; y -= dotSpacing) {
        const dot = document.createElement('div');
        dot.className = 'pac-dot';
        dot.style.left = '15px';
        dot.style.top = `${y}px`;
        dot.dataset.side = 'left';
        dot.dataset.position = y.toString();
        container.appendChild(dot);
        dots.push(dot);
      }

      return dots;
    };

    // Pac-Man movement and dot consumption logic
    const animatePacMan = () => {
      const checkDotConsumption = () => {
        const pacman = document.querySelector('.pacman') as HTMLElement;
        
        if (!pacman) {
          return;
        }

        // Get fresh list of unconsumed dots each time
        const dots = dotsContainerRef.current?.querySelectorAll('.pac-dot:not(.consumed)');
        
        if (!dots || dots.length === 0) {
          return;
        }

        const pacmanRect = pacman.getBoundingClientRect();
        const pacmanCenterX = pacmanRect.left + pacmanRect.width / 2;
        const pacmanCenterY = pacmanRect.top + pacmanRect.height / 2;

        dots.forEach(dot => {
          const dotElement = dot as HTMLElement;
          if (dotElement.classList.contains('consumed')) return;
          
          const dotRect = dotElement.getBoundingClientRect();
          const dotCenterX = dotRect.left + dotRect.width / 2;
          const dotCenterY = dotRect.top + dotRect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(pacmanCenterX - dotCenterX, 2) + 
            Math.pow(pacmanCenterY - dotCenterY, 2)
          );
          
          // Optimized collision radius for centered alignment
          if (distance < 30) {
            dotElement.classList.add('consumed');
          }
        });

        // Check power pellet consumption
        const powerPellets = document.querySelectorAll('.retro-corner:not(.consumed)');
        powerPellets.forEach(pellet => {
          const pelletElement = pellet as HTMLElement;
          const pelletRect = pelletElement.getBoundingClientRect();
          const pelletCenterX = pelletRect.left + pelletRect.width / 2;
          const pelletCenterY = pelletRect.top + pelletRect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(pacmanCenterX - pelletCenterX, 2) + 
            Math.pow(pacmanCenterY - pelletCenterY, 2)
          );
          
          // Much larger collision radius for power pellets
          if (distance < 50) {
            pelletElement.classList.add('consumed');
          }
        });
      };

      // More frequent checks for smoother interaction
      const consumptionInterval = setInterval(checkDotConsumption, 50);
      
      return consumptionInterval;
    };

    // Corner flash effect timing
    const addCornerFlash = () => {
      const pacman = document.querySelector('.pacman') as HTMLElement;
      if (!pacman) return;

      // Flash timing matches exactly when Pac-Man hits corners (16s total cycle)
      // Top-right corner: 25% = 4s, Bottom-right: 50% = 8s, Bottom-left: 75% = 12s
      const flashPacman = () => {
        const originalBg = pacman.style.background;
        const originalShadow = pacman.style.boxShadow;
        const originalTransform = pacman.style.transform;
        
        pacman.style.background = '#ffffff';
        pacman.style.boxShadow = '0 0 30px #ffffff, 0 0 60px #ffffff';
        pacman.style.transform = 'scale(1.3)';
        
        setTimeout(() => {
          pacman.style.background = originalBg;
          pacman.style.boxShadow = originalShadow;
          pacman.style.transform = originalTransform;
        }, 200);
      };

      const cornerFlashTiming = () => {
        // Top-right corner flash
        setTimeout(() => {
          flashPacman();
        }, 4000);
        
        // Bottom-right corner flash  
        setTimeout(() => {
          flashPacman();
        }, 8000);
        
        // Bottom-left corner flash
        setTimeout(() => {
          flashPacman();
        }, 12000);
      };



      // Initial flash sequence
      cornerFlashTiming();
      
      // Repeat every 16 seconds
      setInterval(cornerFlashTiming, 16000);
    };

    const dots = generateDots();
    const interval = animatePacMan();
    addCornerFlash();
    
    // Workflow loading sequence for lifecycle card
    const initializeWorkflowSequence = () => {
      const loadingElement = document.getElementById('workflow-loading');
      if (!loadingElement || loadingSequenceCompleted) return;

      // 1 second delay, then show "uploading Joshua Renfro" with flashing
      setTimeout(() => {
        loadingElement.innerHTML = 'uploading Joshua Renfro';
        loadingElement.classList.add('workflow-loading-flash');
        
        // After 3 seconds, stop flashing and show data sequence
        setTimeout(() => {
          loadingElement.classList.remove('workflow-loading-flash');
          loadingElement.innerHTML = '';
          
          // Show each line after 1 second delays
          const lines = [
            '/lifecycle_stage=FTE', 
            '/psychographic=entrepreneur',
            '/experience=16_years',
            '/founder_roles=3',
            '/current_industry=legal_tech',
            '/location=33.0644° N, 117.3017° W',
            '/re-enrollment=disabled'
          ];
          
          lines.forEach((line, index) => {
            setTimeout(() => {
              const lineDiv = document.createElement('div');
              lineDiv.textContent = line;
              lineDiv.style.marginBottom = '4px';
              loadingElement.appendChild(lineDiv);
            }, index * 1000);
          });
          
          // Mark loading sequence as completed
          setTimeout(() => {
            setLoadingSequenceCompleted(true);
          }, lines.length * 1000);
        }, 3000);
      }, 1000);
    };
    
    initializeWorkflowSequence();

    // Regenerate dots and power pellets every 16 seconds (one full cycle)
    const regenerateInterval = setInterval(() => {
      const container = dotsContainerRef.current;
      if (container) {
        // Remove all existing dots
        container.innerHTML = '';
        // Generate new dots
        generateDots();
      }
      
      // Regenerate power pellets
      const powerPellets = document.querySelectorAll('.retro-corner');
      powerPellets.forEach(pellet => {
        pellet.classList.remove('consumed');
      });
    }, 16000);

    return () => {
      if (interval) clearInterval(interval);
      clearInterval(regenerateInterval);
    };
  }, []);

  return (
    <div className="font-mono bg-terminal pattern-grid min-h-screen">
      {/* Pac-Man Game Border */}
      <div className="retro-border-container">
        {/* Dynamic dots container */}
        <div ref={dotsContainerRef} className="dots-container"></div>
        
        {/* Corner power pellets */}
        <div className="retro-corner top-left"></div>
        <div className="retro-corner top-right"></div>
        <div className="retro-corner bottom-left"></div>
        <div className="retro-corner bottom-right"></div>
        
        {/* Pac-Man */}
        <div className="pacman"></div>
      </div>

      {/* Galaga Battleships */}
      <div 
        ref={(el) => { galagaShipsRef.current.left = el; }}
        className="galaga-ship left"
        style={{ top: `${window.innerHeight - 100}px` }}
      ></div>
      <div 
        ref={(el) => { galagaShipsRef.current.right = el; }}
        className="galaga-ship right"
        style={{ top: `${window.innerHeight - 100}px` }}
      ></div>
      
      <Header />
      
      <main ref={mainRef} className="relative overflow-hidden">
        <BackgroundDecorations />
        
        <div className="relative z-10 max-w-7xl mx-auto px-12 sm:px-16 lg:px-20 py-24">
          

          {/* Workflow Loading Sequence */}
          <div className="flex justify-center mb-8">
            <div className="workflow-card w-72 h-48 p-4">
              <div id="workflow-loading" className="font-mono text-xs text-[var(--terminal-green)] h-full flex flex-col justify-center">
                {/* Content will be populated by JavaScript */}
              </div>
            </div>
          </div>
          
          {/* Call to Action Button */}
          <div className="flex justify-center mb-16">
            <button 
              onClick={buttonReady ? () => {
                setWorkflowsVisible(true);
                // Show tech stack button after all workflows have appeared
                // Last workflow (index 7) appears after 8.75 seconds + animation duration
                setTimeout(() => {
                  setTechStackVisible(true);
                }, (chapters.length - 1) * 1250 + 600);
              } : undefined}
              className={`px-6 py-3 font-mono text-sm transition-all duration-300 ease-in-out border-2 ${
                buttonReady 
                  ? 'bg-[var(--terminal-yellow)] border-[var(--terminal-yellow)] text-black hover:bg-transparent hover:text-[var(--terminal-yellow)] hover:shadow-lg hover:shadow-yellow-500/25' 
                  : 'bg-black border-[var(--terminal-yellow)] text-[var(--terminal-yellow)] cursor-default'
              }`}
              disabled={!buttonReady}
            >
              {buttonText}
            </button>
          </div>
          
          {/* Workflow Steps */}
          {workflowsVisible && (
            <div className="relative flex flex-col items-center">
              {chapters.map((chapter, index) => (
                <motion.div 
                  key={index} 
                  className="relative mb-16"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 1.25,
                    ease: "easeOut"
                  }}
                >
                  {/* Workflow Card */}
                  <div className="flex justify-center">
                    <ChapterRhombus
                      title={chapter.title}
                      description={chapter.description}
                      imageUrl={chapter.imageUrl}
                      imageAlt={chapter.imageAlt}
                      index={index}
                      status={chapter.status}
                      onReportClick={() => openModal(chapter)}
                    />
                  </div>
                  
                  {/* Connecting Arrow to Next Card */}
                  {index < chapters.length - 1 && (
                    <div className="flex justify-center mt-4">
                      <div className="workflow-line workflow-line-vertical"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Tech Stack Button */}
          {techStackVisible && (
            <motion.div 
              className="flex justify-center mt-16 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <button 
                className="px-8 py-4 font-mono text-lg bg-transparent border-2 border-[var(--terminal-yellow)] text-[var(--terminal-yellow)] hover:bg-[var(--terminal-yellow)] hover:text-black transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-500/25"
              >
                show me your tech stack
              </button>
            </motion.div>
          )}

        </div>
        
        <Footer />
      </main>

      {/* Report Modal */}
      <ReportModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={selectedWorkflow?.title || ""}
        content={selectedWorkflow?.reportContent || ""}
      />
    </div>
  );
}
