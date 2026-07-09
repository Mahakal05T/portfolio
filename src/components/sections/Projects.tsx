import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { ExternalLink } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { motion } from 'framer-motion';
import portfolioImg from '../../assets/portfolio.png';
import userAuthImg from '../../assets/user-auth.png';
import project2Img from '../../assets/project2.jpeg';

const projects = [
  {
    title: 'Nexus UI',
    description: 'A premium, highly customizable component library for React. Built with Radix primitives and Tailwind CSS. Features over 40+ accessible components with fluid animations.',
    image: portfolioImg,
    tags: ['React', 'Tailwind', 'Framer Motion'],
    featured: true,
    liveDemo: '#',
    github: 'https://github.com/Mahakal05T/portfolio.git',
  },
  {
    title: 'Auth Systems',
    description: 'Real-time financial analytics dashboard with complex data visualization and predictive modeling integration.',
    image: userAuthImg,
    tags: ['Python', 'Mysql', 'Tailwind', 'Flask'],
    featured: false,
    liveDemo: 'https://auth-system-3-n1uz.onrender.com',
    github: 'https://github.com/Mahakal05T/Auth-system.git',
  },
  {
    title: 'Notes WebApp',
    description: 'SaaS platform allowing users to generate high-quality images using stable diffusion models. Includes subscription management.',
    image: project2Img,
    tags: ['Javascipt', 'Tailwind', 'FastApi'],
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={project.featured ? "md:col-span-2" : "col-span-1"}
            >
              <GlassCard hoverEffect className="h-full p-0 flex flex-col group cursor-pointer overflow-hidden">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2 z-20">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 flex-1">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <Button 
                      variant="primary" 
                      className="py-2 px-4 text-sm gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.liveDemo && project.liveDemo !== '#') window.open(project.liveDemo, '_blank');
                      }}
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="py-2 px-4 text-sm gap-2"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
