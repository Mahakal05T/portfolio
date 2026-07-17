import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Mail, ArrowRight } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import resume from '../../assets/Resume.pdf';
import profileImg from '../../assets/ayush-sigh.jpg';
import { Hero3DObject } from '../3d/Hero3DObject';
import { ErrorBoundary } from '../ui/ErrorBoundary';

export const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Frontend Developer & UI Engineer";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 aurora-bg z-0" />
      <ErrorBoundary>
        <div className="relative z-0 opacity-70 mix-blend-screen">
          <Hero3DObject />
        </div>
      </ErrorBoundary>
      
      <motion.div 
        className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="relative mb-10 group cursor-pointer">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-white/20 p-1 relative z-10 bg-white/5 backdrop-blur-md group-hover:border-purple-500/50 transition-colors duration-500">
            <img
              src={profileImg}
              alt="Ayush Singh"
              className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700 ease-out"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-primary-gradient blur-3xl opacity-30 rounded-full animate-blob group-hover:opacity-50 transition-opacity duration-500" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-white mb-6 drop-shadow-sm">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400">Ayush Singh</span>
          </h1>
          <h2 className="text-lg sm:text-2xl md:text-3xl text-gray-400 font-light mb-8 h-10 tracking-wide">
            {text}<span className="animate-pulse text-purple-400">|</span>
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-gray-400 mb-12 mx-auto leading-relaxed">
            I craft premium, scalable, and highly interactive web experiences for world-class brands.
            Obsessed with performance, accessibility, and pixel-perfect design.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Button onClick={() => window.location.href='#projects'} variant="gradient" className="group w-full sm:w-auto">
            View Projects
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto bg-white/5"
            onClick={() => window.open(resume, '_blank')}
          >
            Download Resume
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating Social Icons */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex flex-col items-center gap-6 absolute right-8 top-1/2 -translate-y-1/2 z-20"
      >
        {[
          { Icon: FiGithub, href: 'https://github.com/Mahakal05T' },
          { Icon: FaLinkedin, href: '#' },
          { Icon: FaXTwitter, href: '#' },
          { Icon: Mail, href: 'mailto:vinodsingh47928@gmail.com' },
        ].map(({ Icon, href }, i) => (
          <motion.a
            key={i}
            variants={itemVariants}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1 lg:hover:translate-y-0 lg:hover:-translate-x-1 transform duration-300 shadow-lg shadow-black/20"
          >
            <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};
