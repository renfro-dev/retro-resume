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

  return (
    <div className="font-mono bg-terminal pattern-grid min-h-screen">
      <Header />
      
      <main ref={mainRef} className="relative overflow-hidden">
        <BackgroundDecorations />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Column - Workflow */}
            <div className="flex-1 lg:max-w-2xl">
              {/* Workflow Activation Command */}
              <div className="flex justify-start mb-6">
                <div className="bg-black border border-[var(--terminal-green)] rounded p-4 w-full max-w-2xl">
                  <div className="text-[var(--terminal-green)] font-mono text-xs mb-2">
                    ./activate-workflow.sh
                  </div>
                  <div className="text-[var(--terminal-gray)] font-mono text-xs leading-relaxed">
                    <div>--enable-workflow=true</div>
                    <div>--re-enrollment=disabled</div>
                    <div>--lifecycle-stage=noob</div>
                    <div>--persona=trailblazer</div>
                    <div>--element=water</div>
                    <div className="text-[var(--terminal-cyan)] mt-2">
                      [INFO] Workflow activated successfully
                    </div>
                    <div className="text-[var(--terminal-green)] mt-1">
                      ✓ Automation sequence initiated
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Workflow Steps */}
              <div className="relative">
                {chapters.map((chapter, index) => (
                  <div key={index} className="relative mb-12">
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
              
              {/* Final connecting line */}
              <div className="flex justify-start mt-6 mb-8">
                <div className="workflow-line workflow-line-vertical" style={{ marginLeft: '144px' }}></div>
              </div>
              
              {/* Workflow End */}
              <div className="flex justify-center">
                <div className="bg-[var(--terminal-yellow)] text-black px-6 py-3 rounded-full font-mono text-sm font-bold flex items-center space-x-2">
                  <span>✓</span>
                  <span>AUTOMATION COMPLETE</span>
                </div>
              </div>
            </div>

            {/* Right Column - Robot ASCII Art */}
            <div className="flex-shrink-0 lg:w-80 flex justify-center items-start">
              <div className="text-[var(--terminal-green)] font-mono text-xs leading-none select-none">
                <pre className="whitespace-pre">
{`      & & &
    & & & & &
   & & & & & &
   &   & &   &
   & & & & & &
    & & & & &
      & & &
   
    & & & & &
   &   & &   &
  &     &     &
 &      &      &
&   &&& & &&&   &
&  &         &  &
&  &    &    &  &
&  &         &  &
 &  &       &  &
  &  &     &  &
   &  &   &  &
    &  & &  &
     &  &  &
      & & &
       & &
        &

   &&&       &&&
  &   &     &   &
 &     &   &     &
&       & &       &
&       & &       &
&       & &       &
 &     & & &     &
  &   &   &   &
   &&&     &&&
   
   &&&     &&&
  &   &   &   &
 &     & &     &
&       &       &
&       &       &
&       &       &
 &     & &     &
  &   &   &   &
   &&&     &&&`}
                </pre>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </main>
    </div>
  );
}
