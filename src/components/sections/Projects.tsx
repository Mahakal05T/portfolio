import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { ExternalLink } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { TiltCard } from '../ui/TiltCard';
import portfolioImg from '../../assets/portfolio.png';
import userAuthImg from '../../assets/user-auth.png';
import project2Img from '../../assets/project2.jpeg';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A premium, modern developer portfolio built with React, Three.js, and Framer Motion. Features glassmorphism design, 3D animated hero section, smooth scroll, and a full-stack contact form with email notifications.',
    image: portfolioImg,
    tags: ['React', 'Tailwind', 'Framer Motion'],
    featured: true,
    liveDemo: '#',
    github: 'https://github.com/Mahakal05T/portfolio.git',
  },
  {
    title: 'Auth Systems',
    description: 'A secure user authentication system with registration, login, session management, and password hashing. Built with Flask and MySQL with a clean, responsive Tailwind CSS frontend.',
    image: userAuthImg,
    tags: ['Python', 'MySQL', 'Tailwind', 'Flask'],
    featured: false,
    liveDemo: 'https://auth-system-3-n1uz.onrender.com',
    github: 'https://github.com/Mahakal05T/Auth-system.git',
  },
  {
    title: 'Notes WebApp',
    description: 'A full-featured notes management application for creating, editing, organizing, and deleting personal notes. Features a clean UI with real-time updates and a fast backend API.',
    image: project2Img,
    tags: ['JavaScript', 'Tailwind', 'FastAPI'],
    featured: false,
    liveDemo: '#',
    github: 'https://github.com/Mahakal05T/Notes-App.git',
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Selected Works"
          subtitle="A showcase of my recent projects, demonstrating my expertise in building scalable and visually appealing web applications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-1 h-full"
            >
              <div className="h-full relative group/project perspective-1000">
                <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover/project:opacity-20 blur-xl transition-opacity duration-700 rounded-3xl -z-10" />
                <TiltCard className="h-full group-hover/project:-translate-y-2 transition-transform duration-700 ease-out">
                  <div className="h-full p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent group-hover/project:from-purple-500/50 group-hover/project:to-cyan-500/50 transition-colors duration-700 overflow-hidden">
                    <GlassCard hoverEffect={false} className="h-full p-0 flex flex-col group/card cursor-pointer overflow-hidden rounded-3xl bg-background/90 backdrop-blur-2xl border-none">
                      
                      {/* Floating Decorative Elements */}
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 z-0 pointer-events-none" />
                      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 z-0 pointer-events-none" />

                      <div className="relative h-64 overflow-hidden rounded-t-3xl z-10 border-b border-white/5">
                        <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/10 transition-colors duration-700 z-10 mix-blend-overlay" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform scale-[1.02] group-hover/card:scale-110 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                          {project.tags.map((tag, i) => (
                            <motion.span 
                              key={tag} 
                              initial={{ opacity: 0, y: -10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + (i * 0.1) }}
                              className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] sm:text-xs font-semibold text-white/90 shadow-lg tracking-wide group-hover/card:border-white/20 transition-colors"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 md:p-8 flex flex-col flex-1 z-10 relative">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-2xl font-bold text-white group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-primary-gradient transition-all duration-500 tracking-tight">
                            {project.title}
                          </h3>
                          {project.featured && (
                            <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 text-purple-300 rounded-full text-[10px] font-bold tracking-wider uppercase whitespace-nowrap ml-2">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 mb-8 flex-1 text-sm md:text-base leading-relaxed font-light">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mt-auto">
                          <Button 
                            variant="gradient" 
                            className="py-2.5 px-5 text-sm gap-2 font-semibold flex-1 sm:flex-none"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (project.liveDemo && project.liveDemo !== '#') window.open(project.liveDemo, '_blank');
                            }}
                          >
                            <ExternalLink className="w-4 h-4" /> Live Demo
                          </Button>
                          <Button 
                            variant="secondary" 
                            className="py-2.5 px-5 text-sm gap-2 font-medium flex-1 sm:flex-none"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (project.github && project.github !== '#') window.open(project.github, '_blank');
                            }}
                          >
                            <FiGithub className="w-4 h-4" /> Source
                          </Button>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
