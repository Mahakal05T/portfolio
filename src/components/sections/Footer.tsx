import { Mail, ArrowUp } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/Mahakal05T', label: 'GitHub' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FaXTwitter, href: '#', label: 'Twitter' },
  { icon: Mail, href: 'mailto:vinodsingh47928@gmail.com', label: 'Email' }
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-primary-gradient opacity-5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <a href="#home" className="text-2xl font-bold tracking-tighter text-white mb-2 group">
              Singh<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:opacity-80 transition-opacity">Works</span>
            </a>
            <p className="text-gray-400 text-sm font-light">Crafting digital experiences that matter.</p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-primary-gradient p-[1px] flex items-center justify-center group overflow-hidden"
            aria-label="Scroll to top"
          >
            <div className="w-full h-full bg-background rounded-full flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
              <ArrowUp className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
            </div>
          </button>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 font-light">
          <p>© {new Date().getFullYear()} Ayush Singh. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
