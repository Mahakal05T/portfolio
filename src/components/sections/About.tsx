import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Code2, MonitorPlay, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../ui/AnimatedCounter';

const stats = [
  { label: 'Years Experience', value: 0, suffix: '+', icon: Zap },
  { label: 'Projects Completed', value: 2, suffix: '+', icon: MonitorPlay },
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard hoverEffect className="h-full group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <h3 className="text-3xl font-bold text-white mb-6">Engineering at the edge of design.</h3>
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg font-light">
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
          </motion.div>

          <div className="space-y-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <GlassCard hoverEffect={true} className="flex items-center gap-6 p-6">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/30 transition-all duration-300">
                    <stat.icon className="w-7 h-7 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <div>
                    <div className="text-4xl font-extrabold text-white flex items-center tracking-tight">
                      <AnimatedCounter value={stat.value} />
                      <span className="text-purple-500 ml-1">{stat.suffix}</span>
                    </div>
                    <div className="text-sm text-gray-500 font-medium uppercase tracking-wider mt-1">{stat.label}</div>
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
