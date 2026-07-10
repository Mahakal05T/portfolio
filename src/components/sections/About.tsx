import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Code2, MonitorPlay, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../ui/AnimatedCounter';

const stats = [
  { label: 'Years Experience', value: 0, suffix: '+', icon: Zap },
  { label: 'Projects Completed', value: 3, suffix: '+', icon: MonitorPlay },
  { label: 'Open Source Commits', value: 0, suffix: '+', icon: Code2 },
];

export const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="A brief introduction to who I am and what I do."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard hoverEffect className="h-full">
              <h3 className="text-2xl font-bold text-white mb-4">Engineering at the edge of design.</h3>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  I'm a frontend developer with a deep passion for UI/UX design. I bridge the gap between aesthetics and functionality, creating digital experiences that are not only visually stunning but also technically robust.
                </p>
                <p>
                  I have been actively building my skills and working on various personal and freelance projects, focusing on modern web technologies. My expertise lies in the React ecosystem, responsive design, and crafting performant animations.
                </p>
                <p>
                  When I'm not writing code, I'm usually exploring new design trends, learning new technologies, or writing technical articles on modern web development. I am eager to bring my creativity and technical skills to a professional team.
                </p>
              </div>
            </GlassCard>
          </div>

          <div className="space-y-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white flex items-center">
                      <AnimatedCounter value={stat.value} />
                      {stat.suffix}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
