import { useEffect, useRef } from "react";
import Header from "@/components/header";
import ChapterRhombus from "@/components/chapter-rhombus";
import BackgroundDecorations from "@/components/background-decorations";
import Footer from "@/components/footer";

const chapters = [
  {
    title: "First Steps",
    description: "Learning the fundamentals of web development and discovering my passion for technology.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Person coding at a modern workspace"
  },
  {
    title: "Framework Discovery",
    description: "Diving deep into React and modern JavaScript frameworks that revolutionized my development approach.",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "React development workspace"
  },
  {
    title: "Design Systems",
    description: "Mastering design systems and component libraries to create cohesive user experiences.",
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "UI/UX design process"
  },
  {
    title: "Cloud Migration",
    description: "Embracing cloud technologies and containerization to build scalable applications.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Cloud computing visualization"
  },
  {
    title: "API Integration",
    description: "Building robust integrations and learning to orchestrate complex data flows.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "API connections and networking"
  },
  {
    title: "Mobile First",
    description: "Adopting mobile-first design principles and progressive web app technologies.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Mobile app development"
  },
  {
    title: "AI Integration",
    description: "Exploring artificial intelligence and machine learning to enhance user experiences.",
    imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "AI and machine learning technology"
  },
  {
    title: "Future Vision",
    description: "Looking ahead to emerging technologies and the next chapter of innovation.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    imageAlt: "Futuristic technology concepts"
  }
];

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        mainRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    
    // Workflow loading sequence
    const initializeWorkflowSequence = () => {
      const loadingElement = document.getElementById('workflow-loading');
      if (!loadingElement) return;

      // 1 second delay, then show "workflow loading" with flashing
      setTimeout(() => {
        loadingElement.innerHTML = 'workflow loading';
        loadingElement.classList.add('workflow-loading-flash');
        
        // After 3 seconds, stop flashing and show data sequence
        setTimeout(() => {
          loadingElement.classList.remove('workflow-loading-flash');
          loadingElement.innerHTML = '';
          
          // Show each line after 2 second delays
          const lines = [
            '/lifecycle_stage=advanced', 
            '/location=33.0644° N, 117.3017° W',
            '/re-enrollment=disabled'
          ];
          
          lines.forEach((line, index) => {
            setTimeout(() => {
              const lineDiv = document.createElement('div');
              lineDiv.textContent = line;
              lineDiv.style.marginBottom = '4px';
              loadingElement.appendChild(lineDiv);
              
              // Show CTA button after the last line is displayed
              if (index === lines.length - 1) {
                setTimeout(() => {
                  const ctaButton = document.getElementById('cta-button');
                  if (ctaButton) {
                    ctaButton.style.display = 'flex';
                  }
                }, 500); // Small delay after last line
              }
            }, index * 2000);
          });
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
      
      <Header />
      
      {/* Top Right Dashboard */}
      <div className="fixed top-52 right-32 z-50 w-72">
        <div className="workflow-card p-6">
          <div className="space-y-2 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-[var(--terminal-gray)]">Years experience:</span>
              <span className="text-[var(--terminal-green)]">16</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--terminal-gray)]">Founder roles:</span>
              <span className="text-[var(--terminal-cyan)]">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--terminal-gray)]">Current industry:</span>
              <span className="text-[var(--terminal-yellow)]">legal_tech</span>
            </div>
          </div>
        </div>
      </div>
      
      <main ref={mainRef} className="relative overflow-hidden">
        <BackgroundDecorations />
        
        <div className="relative z-10 max-w-7xl mx-auto px-12 sm:px-16 lg:px-20 py-24">
          {/* Workflow Loading Sequence */}
          <div className="flex justify-start mb-8 ml-8">
            <div className="workflow-card w-72 h-32 p-4">
              <div id="workflow-loading" className="font-mono text-xs text-[var(--terminal-green)] h-full flex flex-col justify-center">
                {/* Content will be populated by JavaScript */}
              </div>
            </div>
          </div>
          
          {/* Call to Action Button */}
          <div id="cta-button" className="flex justify-start mb-16 ml-8" style={{display: 'none'}}>
            <button className="bg-[var(--terminal-yellow)] border-2 border-[var(--terminal-yellow)] text-black px-6 py-3 font-mono text-sm hover:bg-transparent hover:text-[var(--terminal-yellow)] transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-500/25">
              activate workflow
            </button>
          </div>
          
          {/* Workflow Steps */}
          <div className="relative">
            {chapters.map((chapter, index) => (
              <div key={index} className="relative mb-16 ml-8">
                {/* Workflow Card */}
                <div className="flex justify-start">
                  <ChapterRhombus
                    title={chapter.title}
                    description={chapter.description}
                    imageUrl={chapter.imageUrl}
                    imageAlt={chapter.imageAlt}
                    index={index}
                  />
                </div>
                
                {/* Connecting Arrow to Next Card */}
                {index < chapters.length - 1 && (
                  <div className="flex justify-start mt-4">
                    <div className="workflow-line workflow-line-vertical" style={{ marginLeft: '144px' }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          

          
          {/* Workflow End */}
          <div className="flex justify-center">
            <div className="bg-[var(--terminal-yellow)] text-black px-6 py-3 rounded-full font-mono text-sm font-bold flex items-center space-x-2">
              <span>✓</span>
              <span>AUTOMATION COMPLETE</span>
            </div>
          </div>


        </div>
        
        <Footer />
      </main>
    </div>
  );
}
