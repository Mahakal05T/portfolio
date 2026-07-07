import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
          scrolled ? "glass py-4 border-white/10" : "py-6 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.a 
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter text-white z-50 relative"
            onClick={() => setIsOpen(false)}
          >
            Singh<span className="text-purple-500">Works</span>
          </motion.a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-2 w-full mt-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-all w-full py-4 px-6 rounded-2xl"
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
