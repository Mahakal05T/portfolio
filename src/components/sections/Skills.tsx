import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { motion } from 'framer-motion';

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'React / Next.js', level: 40 },
      { name: 'TypeScript', level: 20 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 85 },
    ]
  },
  {
    category: 'Backend & DB',
    items: [
      { name: 'Python', level: 55 },
      { name: 'MySQL', level: 40 },
      { name: 'MongoDB', level: 40 }
    ]
  },
  {
    category: 'UI / UX',
    items: [
      { name: 'Figma', level: 90 },
      { name: 'Photoshop', level: 80 },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Core Competencies"
          subtitle="A comprehensive overview of my technical skills and design capabilities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup) => (
            <GlassCard key={skillGroup.category} hoverEffect className="flex flex-col h-full">
              <h3 className="text-xl font-bold text-white mb-6 bg-clip-text text-transparent bg-primary-gradient inline-block">
                {skillGroup.category}
              </h3>

              <motion.div
                className="space-y-6 flex-1"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skillGroup.items.map((item, i) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">{item.name}</span>
                      <span className="text-gray-500">{item.level}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-primary-gradient h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
