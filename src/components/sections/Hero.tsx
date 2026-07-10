import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Mail, ArrowRight } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import resume from '../../assets/Resume.pdf';
import profileImg from '../../assets/ayush-sigh.jpg';
import { Hero3DObject } from '../3d/Hero3DObject';
import { ErrorBoundary } from '../ui/ErrorBoundary';
export const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Frontend developer & UI Designer";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative">
      <ErrorBoundary>
        <Hero3DObject />
      </ErrorBoundary>
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 relative z-10">
            <img
              src={profileImg}
              alt="Ayush Singh"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-primary-gradient blur-3xl opacity-30 rounded-full animate-blob" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Ayush Singh</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-3xl text-gray-400 font-light mb-8 h-10">
            {text}<span className="animate-pulse">|</span>
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-gray-400 mb-10 mx-auto">
            I craft premium, scalable, and highly interactive web experiences for world-class brands.
            Obsessed with performance, accessibility, and pixel-perfect design.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <Button onClick={() => window.location.href='#projects'} variant="primary" className="group w-full sm:w-auto">
            View Projects
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => window.open(resume, '_blank')}
          >
            Download Resume
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-6"
        >
          {[
            { Icon: FiGithub, href: 'https://github.com/Mahakal05T' },
            { Icon: Mail, href: 'mailto:vinodsingh47928@gmail.com' },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-gray-400 hover:text-white transition-colors hover:-translate-y-1 transform duration-200"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-gray-500/30 flex justify-center p-2">
          <div className="w-1 h-3 bg-gray-500/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};
