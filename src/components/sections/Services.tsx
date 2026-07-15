import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Palette, Terminal, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'UI/UX Design',
    description: 'Crafting intuitive, accessible, and visually stunning user interfaces with a focus on modern aesthetics and user experience.',
    icon: Palette,
    color: 'from-fuchsia-500/20 to-purple-500/20',
    iconColor: 'text-fuchsia-400'
  },
  {
    title: 'Frontend Development',
    description: 'Building scalable, high-performance web applications using React, Next.js, and TypeScript with pixel-perfect precision.',
    icon: Terminal,
    color: 'from-purple-500/20 to-cyan-500/20',
    iconColor: 'text-purple-400'
  },
  {
    title: 'Responsive Design',
    description: 'Ensuring your application looks and functions flawlessly across all devices, from mobile phones to ultra-wide desktop monitors.',
    icon: Smartphone,
    color: 'from-cyan-500/20 to-blue-500/20',
    iconColor: 'text-cyan-400'
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <GlassCard hoverEffect={false} className="h-full relative flex flex-col p-8 group overflow-hidden border-white/5 hover:border-white/20 transition-all duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150 group-hover:bg-white/10" />
                
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl shadow-black/20">
                  <service.icon className={`w-8 h-8 text-gray-400 group-hover:${service.iconColor} transition-colors duration-300`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">{service.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed relative z-10 font-light flex-1">
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
