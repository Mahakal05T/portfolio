import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: 'Freelance Frontend Developer',
    company: 'Self-Employed',
    period: '2023 - Present',
    description: 'Specializing in building modern, responsive, and highly interactive web applications for various clients. Focus on React ecosystem and premium UI/UX design.',
    skills: ['React', 'Tailwind CSS', 'Framer Motion']
  },
  {
    role: 'Open Source Contributor',
    company: 'Various Communities',
    period: '2022 - Present',
    description: 'Actively contributing to open source projects, focusing on accessibility improvements, component libraries, and documentation.',
    skills: ['TypeScript', 'Git', 'Next.js']
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey and open-source contributions."
        />

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-purple-500/30 before:to-transparent">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-purple-500/30 bg-background/50 backdrop-blur-sm text-purple-400 group-[.is-active]:text-cyan-400 group-[.is-active]:border-cyan-400/30 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-500">
                <Briefcase className="w-4 h-4" />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4">
                <GlassCard hoverEffect={true} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <h3 className="font-bold text-white text-lg">{exp.role}</h3>
                    <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm mb-4">{exp.company}</div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
