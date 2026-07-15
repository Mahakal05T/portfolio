import { SectionHeading } from '../ui/SectionHeading';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaFigma } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql, SiFirebase, SiFramer } from 'react-icons/si';

const skills = [
  { name: 'React', icon: FaReact, color: 'text-blue-400' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-400' },
  { name: 'Framer Motion', icon: SiFramer, color: 'text-purple-400' },
  { name: 'Node.js', icon: FaNodeJs, color: 'text-green-500' },
  { name: 'Python', icon: FaPython, color: 'text-yellow-400' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-green-400' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-300' },
  { name: 'Firebase', icon: SiFirebase, color: 'text-yellow-500' },
  { name: 'Docker', icon: FaDocker, color: 'text-blue-600' },
  { name: 'Figma', icon: FaFigma, color: 'text-pink-400' },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Core Competencies"
          subtitle="My technical toolkit for building scalable and modern web applications."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-12">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="group relative rounded-2xl bg-white/5 border border-white/5 overflow-hidden backdrop-blur-sm hover:border-white/20 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative h-full p-6 flex flex-col items-center justify-center gap-4 transition-colors duration-500">
                <skill.icon className={`w-10 h-10 ${skill.color} drop-shadow-md group-hover:scale-110 group-hover:drop-shadow-xl transition-all duration-300`} />
                <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300 text-center">{skill.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

