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
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col items-center space-y-6">
            {chapters.map((chapter, index) => (
              <div 
                key={index}
                className={`${index % 2 === 0 ? 'self-start ml-4 md:ml-12' : 'self-end mr-4 md:mr-12'}`}
                style={{
                  marginTop: index > 0 ? '-40px' : '0'
                }}
              >
                <ChapterRhombus
                  title={chapter.title}
                  description={chapter.description}
                  imageUrl={chapter.imageUrl}
                  imageAlt={chapter.imageAlt}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
        
        <Footer />
      </main>
    </div>
  );
}
