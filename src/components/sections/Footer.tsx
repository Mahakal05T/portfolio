import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 px-6 border-t border-white/10 relative z-10 bg-background/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SinghWorks. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Twitter</a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">GitHub</a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">LinkedIn</a>
        </div>
        
        <button 
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </footer>
  );
};
