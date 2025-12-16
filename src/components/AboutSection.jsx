import { Briefcase, Code, User, Download, ArrowRight } from "lucide-react";
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

export const AboutSection = () => {
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
    
    const target = document.getElementById('about');
    if (target) observer.observe(target);
    
    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 opacity-5">
        {[...Array(4)].map((_, i) => (
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

      <div className="container mx-auto max-w-6xl px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            About <span className="text-foreground">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A passionate developer on a journey to create meaningful digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Aspiring Full-Stack Developer & Tech Enthusiast
            </h3>

            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                I'm a passionate developer exploring the world of web development and AI.
                I love building projects that solve real-world problems while continuously
                expanding my technical skills and knowledge.
              </p>

              <p className="leading-relaxed">
                My journey in tech is driven by curiosity and a strong desire to learn.
                I believe in learning by doing, which is why I'm always working on new
                projects to apply and expand my skills.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <motion.a 
                href="#contact" 
                className="group relative overflow-hidden px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 bg-primary text-primary-foreground"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get In Touch</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>
              </motion.a>
              
              <motion.a
                href="/projects/Pranav_resume (9).pdf"
                download="Pranav_Mishra_Resume.pdf"
                className="group relative overflow-hidden px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary/5 transition-colors duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="h-5 w-5" />
                <span>Download CV</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-6"
            variants={container}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
          >
            {[
              {
                icon: <Code className="h-6 w-6 text-primary" />,
                title: "Web Development",
                description: "Building responsive and interactive web applications using modern JavaScript frameworks and libraries."
              },
              {
                icon: <User className="h-6 w-6 text-primary" />,
                title: "Problem Solving",
                description: "Breaking down complex problems into smaller, manageable components and finding efficient solutions."
              },
              {
                icon: <Briefcase className="h-6 w-6 text-primary" />,
                title: "Continuous Learning",
                description: "Committed to continuous improvement and staying updated with the latest technologies and best practices."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="group relative p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
