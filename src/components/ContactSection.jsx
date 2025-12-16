import { Linkedin, Mail, MapPin, Phone, Send, Github, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "@/config/emailjs";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
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
      damping: 12
    }
  }
};

const contactItems = [
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: "Email",
    value: "pvmishra2004@gmail.com",
    href: "mailto:pvmishra2004@gmail.com"
  },
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    title: "Phone",
    value: "+91 XXXXXXXXXX",
    href: "tel:+91XXXXXXXXXX"
  },
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: "Location",
    value: "Mumbai, India",
    href: "#"
  }
];

const socialLinks = [
  {
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://www.linkedin.com/in/pranav-mishra-9a75a8320/",
    label: "LinkedIn"
  },
  {
    icon: <Github className="h-5 w-5" />,
    href: "https://github.com/prnvmishra",
    label: "GitHub"
  }
];

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const target = document.getElementById('contact');
    if (target) observer.observe(target);
    
    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        EMAILJS_PUBLIC_KEY
      );
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      form.reset();
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 opacity-5">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
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
            Get In <span className="text-foreground">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'm always excited to work on new ideas and opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-foreground">
              Contact Information
            </h3>

            <motion.div 
              className="space-y-6"
              variants={container}
              initial="hidden"
              animate={isVisible ? "show" : "hidden"}
            >
              {contactItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  variants={item}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-card/50 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <div className="pt-4">
              <h4 className="font-medium mb-4 text-foreground">Connect With Me</h4>
              <motion.div 
                className="flex gap-4"
                variants={container}
                initial="hidden"
                animate={isVisible ? "show" : "hidden"}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={item}
                    className="p-3 rounded-full bg-card border border-border hover:bg-primary/10 hover:border-primary/30 text-muted-foreground hover:text-foreground transition-all duration-300"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border/50 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Send a Message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <motion.div
                variants={item}
                initial="hidden"
                animate={isVisible ? "show" : "hidden"}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
                    placeholder="Your name..."
                  />
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/20 pointer-events-none transition-all duration-300"></div>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                initial="hidden"
                animate={isVisible ? "show" : "hidden"}
                transition={{ delay: 0.45 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Your Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </motion.div>

              <motion.div
                variants={item}
                initial="hidden"
                animate={isVisible ? "show" : "hidden"}
                transition={{ delay: 0.5 }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Hello, I'd like to talk about..."
                  />
                </div>
              </motion.div>

              <motion.div
                variants={item}
                initial="hidden"
                animate={isVisible ? "show" : "hidden"}
                transition={{ delay: 0.55 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "group w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30",
                    isSubmitting && "opacity-80 cursor-not-allowed"
                  )}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
