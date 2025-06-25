import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/header";
import ChapterRhombus from "@/components/chapter-rhombus";
import BackgroundDecorations from "@/components/background-decorations";

import ReportModal from "@/components/report-modal";
import PongGame from "@/components/pong-game";
import ContactInfo from "@/components/contact-info";
import DynamicImage from "@/components/dynamic-image";

const chapters = [
  {
    title: "Hustle",
    description: "Built a six figure business at 19 while attending university.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Business growth and time management",
    status: "Complete",
    reportContent: null,
    externalLink: "https://www.linkedin.com/posts/joshuarenfro_i-was-19-years-old-when-i-hired-an-ex-convict-activity-7117171065759363073-rgku/",
    buttonText: "Reflections"
  },
  {
    title: "Velocity",
    description: "First 100 employees at Lyft, one of the fastest growing startups in the world.",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Fast growing company scaling",
    status: "Complete",
    reportContent: null,
    externalLink: "https://www.linkedin.com/pulse/growth-marketers-introduction-building-ambassador-programs-renfro/?trackingId=sbIr5Im8SZaWnjinWwdSyg%3D%3D",
    buttonText: "Reflections"
  },
  {
    title: "Grit",
    description: "Funded and launched project on Ethereum to tokenize brand ambassador programs.",
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Software company founding and fundraising",
    status: "Complete",
    reportContent: null,
    externalLink: "https://medium.com/ostdotcom/how-tribecoin-will-revolutionize-influencer-marketing-with-a-tokenized-ambassador-program-90245987257f",
    buttonText: "Medium"
  },
  {
    title: "Humility",
    description: "Startup destruction by govt leads to innovation in the legal and crypto space.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Large scale operations management",
    status: "Complete",
    reportContent: null,
    externalLinks: [
      { url: "https://www.forbes.com/sites/dariosabaghi/2021/11/02/a-hemp-company-uses-crypto-tokens-to-crowdfund-lawsuit/", text: "Forbes" },
      { url: "https://caselaw.findlaw.com/court/us-dis-crt-e-d-cal/2170945.html", text: "Findlaw" },
      { url: "https://cointelegraph.com/news/hemp-grower-crowdfunds-court-case-tokenizes-shares-in-settlement", text: "Cointelegraph" }
    ]
  },
  {
    title: "Stability",
    description: "I push boundaries at the nexus of people x product as an exec at a large law firm.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Product market fit and legal technology",
    status: "Active",
    reportContent: (
      <div className="space-y-4">
        <p className="text-[var(--terminal-green)] font-mono">
          As the Director of Revenue Operations at Cage & Miles, I build custom tools that empower the sales, marketing, and service orgs with technology, and leadership with the data that guides strategy and resource allocation.
        </p>
        <p className="text-[var(--terminal-green)] font-mono">
          I build and manage resilient teams that can scale, and hold them accountable to a culture of continuous improvement.
        </p>
      </div>
    ),
    buttonText: "RevOps"
  },
  {
    title: "Roots",
    description: "My entire family lives in SD. I actively garden and surf to detech and destress.",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Gardening and family life",
    status: "Active",
    reportContent: null,
    externalLink: "https://layseahughes.com/",
    buttonText: "Meet Laysea"
  },
  {
    title: "Entre-curious",
    description: "I'm interested in buying and operating antiquated businesses.",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Business acquisition and operations",
    status: "Active",
    reportContent: "Placeholder content for Entre-curious report."
  }
];

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const [workflowsVisible, setWorkflowsVisible] = useState(false);
  const [visibleWorkflowCount, setVisibleWorkflowCount] = useState(0);
  const [techStackVisible, setTechStackVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<typeof chapters[0] | null>(null);

  const [loadingSequenceCompleted, setLoadingSequenceCompleted] = useState(false);
  const [arcadeLoading, setArcadeLoading] = useState(true);
  const [arcadeLoadingStep, setArcadeLoadingStep] = useState(0);
  const [gameOpen, setGameOpen] = useState(false);
  const [contactUnlocked, setContactUnlocked] = useState(false);
  const [battleshipsEngaged, setBattleshipsEngaged] = useState(false);
  const galagaShipsRef = useRef<{ left: HTMLDivElement | null; right: HTMLDivElement | null }>({ left: null, right: null });

  const arcadeSequence = [
    { text: "uploading Joshua Renfro", delay: 1250, flash: true },
    { text: "/lifecycle_stage=FTE", delay: 1250 },
    { text: "/psychographic=entrepreneur", delay: 1250 },
    { text: "/experience=16_years", delay: 1250 },
    { text: "/founder_roles=3", delay: 1250 },
    { text: "/current_industry=legal_tech", delay: 1250 },
    { text: "/location=33.0644° N, 117.3017° W", delay: 1250 },
    { text: "/re-enrollment=disabled", delay: 1250 },
    { text: "PROFILE LOADED", delay: 0 }
  ];

  const openModal = (workflow: typeof chapters[0]) => {
    setSelectedWorkflow(workflow);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedWorkflow(null);
  };



  // Arcade loading sequence effect
  useEffect(() => {
    if (!arcadeLoading) return;

    let currentStep = 0;
    
    const runSequence = () => {
      if (currentStep < arcadeSequence.length) {
        setArcadeLoadingStep(currentStep);
        
        setTimeout(() => {
          currentStep++;
          if (currentStep < arcadeSequence.length) {
            runSequence();
          } else {
            // Final step - show blinking "PRESS START" and wait for user input
          }
        }, arcadeSequence[currentStep].delay);
      }
    };

    runSequence();
  }, [arcadeLoading]);

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

  // Effect to handle battleship engagement
  useEffect(() => {
    if (battleshipsEngaged) {
      const ships = galagaShipsRef.current;
      if (ships.left && ships.right) {
        ships.left.classList.add('engaged');
        ships.right.classList.add('engaged');
      }
    }
  }, [battleshipsEngaged]);

  // Start workflow progression when arcade loading completes
  useEffect(() => {
    if (arcadeLoading) return; // Don't start until arcade loading is done
    
    // Start the workflow progression
    setWorkflowsVisible(true);
    setBattleshipsEngaged(true);
    setVisibleWorkflowCount(1); // Show first workflow immediately
    
    // Progressive workflow reveal with 1.5s delays
    const workflowTimers: NodeJS.Timeout[] = [];
    for (let i = 1; i < chapters.length; i++) {
      const workflowTimer = setTimeout(() => {
        setVisibleWorkflowCount(prev => Math.max(prev, i + 1));
      }, i * 1500);
      workflowTimers.push(workflowTimer);
    }
    
    // Show tech stack button after all workflows have appeared
    const techStackTimer = setTimeout(() => {
      setTechStackVisible(true);
    }, (chapters.length - 1) * 1500 + 600);
    
    return () => {
      workflowTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(techStackTimer);
    };
  }, [arcadeLoading]); // Trigger when arcadeLoading changes to false

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
      {/* Arcade Loading Screen */}
      {arcadeLoading && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="arcade-loading-container">
            <div className="text-center w-full max-w-sm mx-auto px-4">
              {/* Retro Game Title */}
              <div className="arcade-title mb-6">
                <div className="text-2xl sm:text-4xl font-bold text-[var(--terminal-yellow)] mb-2 pixel-font">
                  JOSHUA RENFRO
                </div>
                <div className="text-sm sm:text-lg text-[var(--terminal-cyan)] pixel-font">
                  DIGITAL PROFILE
                </div>
              </div>
              
              {/* Loading Messages - Fixed Height */}
              <div className="arcade-loading-text h-16 sm:h-20 flex items-center justify-center mb-6">
                {arcadeLoadingStep < 8 ? (
                  <div className={`text-[var(--terminal-green)] text-sm sm:text-lg pixel-font text-center px-2 ${arcadeLoadingStep === 0 ? 'arcade-flash' : ''}`}>
                    {arcadeSequence[arcadeLoadingStep]?.text}
                  </div>
                ) : (
                  <div className="text-[var(--terminal-yellow)] text-lg sm:text-xl pixel-font blink-animation">
                    PROFILE LOADED
                  </div>
                )}
              </div>
              
              {/* Progress/Action Area - Fixed Height */}
              <div className="h-20 sm:h-24 flex flex-col items-center justify-center">
                {/* Progress Bar */}
                {arcadeLoadingStep < 8 && (
                  <div className="arcade-progress-container">
                    <div className="arcade-progress-bar">
                      <div 
                        className="arcade-progress-fill"
                        style={{ width: `${(arcadeLoadingStep / 7) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-[var(--terminal-gray)] text-sm mt-2 pixel-font">
                      {Math.round((arcadeLoadingStep / 7) * 100)}% COMPLETE
                    </div>
                  </div>
                )}
                
                {/* Start Button (when ready) */}
                {arcadeLoadingStep === 8 && (
                  <button 
                    onClick={() => setArcadeLoading(false)}
                    className="px-8 py-4 bg-[var(--terminal-yellow)] text-black font-bold text-xl pixel-font hover:bg-[var(--terminal-green)] transition-colors arcade-button"
                  >
                    ACTIVATE
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content (hidden during arcade loading) */}
      <div className={arcadeLoading ? 'invisible' : 'visible'}>
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
      ></div>
      <div 
        ref={(el) => { galagaShipsRef.current.right = el; }}
        className="galaga-ship right"
      ></div>
      
      <Header />
      
      <main ref={mainRef} className="relative overflow-hidden">
        <BackgroundDecorations />
        
        <div className="relative z-10 max-w-7xl mx-auto px-12 sm:px-16 lg:px-20 py-24">
          


          

          
          {/* Workflow Steps */}
          {workflowsVisible && (
            <div className="relative flex flex-col items-center">
              {chapters.map((chapter, index) => {
                if (index >= visibleWorkflowCount) return null;
                
                return (
                  <motion.div 
                    key={index}
                    className="relative mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6,
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
                      externalLink={chapter.externalLink}
                      buttonText={chapter.buttonText}
                      externalLinks={chapter.externalLinks}
                    />
                  </div>
                  
                  {/* Connecting Arrow to Next Card */}
                  {index < chapters.length - 1 && (
                    <div className="flex justify-center mt-4">
                      <div className="workflow-line workflow-line-vertical"></div>
                    </div>
                  )}
                </motion.div>
                );
              })}
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
                onClick={() => setGameOpen(true)}
                className="px-8 py-4 font-mono text-lg bg-transparent border-2 border-[var(--terminal-yellow)] text-[var(--terminal-yellow)] hover:bg-[var(--terminal-yellow)] hover:text-black transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-500/25"
              >
                {contactUnlocked ? "contact information unlocked" : "retrieve phone number"}
              </button>
            </motion.div>
          )}

          {/* Contact Information */}
          <div className="flex justify-center">
            <ContactInfo isVisible={contactUnlocked} />
          </div>

        </div>
        

      </main>

        {/* Pong Game */}
        <PongGame
          isOpen={gameOpen}
          onClose={() => setGameOpen(false)}
          onWin={() => setContactUnlocked(true)}
        />

        {/* Report Modal */}
        <ReportModal
          isOpen={modalOpen}
          onClose={closeModal}
          title={selectedWorkflow?.title || ""}
          content={selectedWorkflow?.reportContent || ""}
        />
      </div>
    </div>
  );
}
