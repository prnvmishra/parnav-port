import { ArrowRight, ExternalLink, Github, ArrowUpRight, Code, Eye } from "lucide-react";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

const projects = [
  {
    id: 1,
    title: "Sahara - AI Mental Wellness Companion",
    description: "A comprehensive mental wellness platform featuring an AI companion, mood tracking, journaling, and stress-relief games. Built with modern web technologies to provide accessible mental health support.",
    image: "/projects/project1.png",
    tags: ["React", "Node.js", "AI/ML", "MongoDB", "TailwindCSS"],
    demoUrl: "https://saharaindia.vercel.app/",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Knowledge Weaver (Adobe Hackathon)",
    description: "An intelligent document processing system with AI-powered analysis and content enhancement capabilities. Features include document understanding, content summarization, and interactive Q&A. Built for the Adobe Connecting Dots Challenge.",
    image: "/projects/project2.png",
    tags: ["Python", "NLP", "AI/ML", "PDF Processing", "Data Extraction"],
    demoUrl: "#",
    githubUrl: "https://github.com/prnvmishra/adobe-connecting-dots-challenge"
  },
  {
    id: 3,
    title: "Portfolio Analyzer (1st Place CSI Competition)",
    description: "A prompt-based web application that analyzes and visualizes portfolio data. Won 1st place in college CSI competition for innovative implementation and user experience.",
    image: "/projects/project3.png",
    tags: ["Web Development", "Data Visualization", "JavaScript"],
    demoUrl: "https://csi-p1-yk4i.vercel.app/",
    githubUrl: "https://github.com/prnvmishra/CSI-P1",
  },
  {
    id: 4,
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with React and Tailwind CSS. Features a clean design, project showcase, and contact form. Demonstrates frontend development skills and UI/UX design principles.",
    image: "/projects/project4.png",
    tags: ["React", "Tailwind CSS", "Vite", "Responsive Design"],
    demoUrl: "https://parnav-port-qv1c.vercel.app/",
    githubUrl: "https://github.com/prnvmishra/PranavPortfolio"
  }
];

export const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const target = document.getElementById('projects');
    if (target) observer.observe(target);
    
    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              animation: `pulse-subtle ${15 + Math.random() * 10}s infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Featured <span className="text-foreground">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Each project is a unique challenge that helped me grow as a developer.
            Hover over the cards to see them come to life!
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
        >
          {projects.map((project, key) => (
            <motion.div
              key={key}
              variants={item}
              className="group relative bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
              whileHover={{ y: -10 }}
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary-foreground backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Code className="w-4 h-4" />
                    <span>{project.tags[0]}</span>
                  </div>
                  <div className="flex space-x-3">
                    {project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-300"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-300"
                        aria-label="View Live Demo"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

          <div className="text-center mt-16">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </section>
    );
  };
