import { ArrowDown, Code, Cpu, Zap, Sparkles } from "lucide-react";
import { useEffect, useState } from 'react';

export const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.2}px)`,
    transition: 'transform 0.3s ease-out'
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              animation: `pulse-subtle ${15 + Math.random() * 10}s infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.4 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container max-w-4xl mx-auto text-center z-10 relative">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 mb-4 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm text-muted-foreground">Open to work</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            <span className="opacity-0 animate-fade-in inline-block">Hi, I'm</span>
            <div className="mt  -2">
              <span className="text-primary opacity-0 animate-fade-in-delay-1 inline-block transform transition-all duration-300 hover:scale-105">
                Pranav
              </span>
              <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2 inline-block transform transition-all duration-300 hover:scale-105">
                Mishra
              </span>
            </div>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3 leading-relaxed">
            Learning, building, and growing as a developer—one project at a time.
          </p>

          <div className="pt-6 opacity-0 animate-fade-in-delay-4">
            <a 
              href="#projects" 
              className="cosmic-button group relative overflow-hidden px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 transition-all duration-300 hover:gap-3"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10">Check Out My Work</span>
              <ArrowDown className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'animate-bounce' : ''}`} />
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-8 opacity-0 animate-fade-in-delay-5">
            {[
              { icon: <Code className="h-6 w-6" />, text: 'Full Stack' },
              { icon: <Cpu className="h-6 w-6" />, text: 'AI/ML' },
              { icon: <Zap className="h-6 w-6" />, text: 'Cloud' }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-muted/30 backdrop-blur-sm p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-primary">{item.icon}</span>
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300 hover:opacity-80"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-sm text-muted-foreground mb-2 group-hover:text-primary transition-colors">
          Scroll to explore
        </span>
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-125"></div>
          <ArrowDown className="h-6 w-6 text-primary relative z-10 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
