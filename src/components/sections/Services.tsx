import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Palette, Terminal, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'UI/UX Design',
    description: 'Crafting intuitive, accessible, and visually stunning user interfaces with a focus on modern aesthetics and user experience.',
    icon: Palette,
  },
  {
    title: 'Frontend Development',
    description: 'Building scalable, high-performance web applications using React, Next.js, and TypeScript with pixel-perfect precision.',
    icon: Terminal,
  },
  {
    title: 'Responsive Design',
    description: 'Ensuring your application looks and functions flawlessly across all devices, from mobile phones to ultra-wide desktop monitors.',
    icon: Smartphone,
  }
];

export const Services = () => {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Services"
          subtitle="What I can do for you and your business."
          className="items-center text-center mx-auto"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard hoverEffect className="h-full flex flex-col items-center text-center p-8 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300">
                  <service.icon className="w-8 h-8 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
