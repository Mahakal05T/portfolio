import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems
        .map(item => document.getElementById(item.href.substring(1)))
        .filter((el): el is HTMLElement => el !== null);

      let currentActive = 'home';
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          currentActive = section.id;
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check after a slight delay to account for lazy-loaded components
    const timer = setTimeout(handleScroll, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent",
          scrolled ? "bg-background/70 backdrop-blur-xl border-white/5 py-4 shadow-2xl shadow-black/50" : "py-6 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.a 
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter text-white z-50 relative group"
            onClick={() => setIsOpen(false)}
          >
            Singh<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:opacity-80 transition-opacity">Works</span>
          </motion.a>

          <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors relative rounded-full",
                    isActive ? "text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </motion.a>
              );
            })}
          </nav>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:hidden z-50 relative"
          >
            <button className="text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.3 } }}
            className="fixed inset-0 z-40 bg-black/60 md:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-2 w-full mt-8">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-2xl font-bold transition-all w-full py-4 px-6 rounded-2xl",
                      isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 bg-white/5" : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
