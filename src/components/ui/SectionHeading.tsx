import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading = ({ title, subtitle, className }: SectionHeadingProps) => {
  return (
    <div className={cn("mb-16 flex flex-col items-start gap-4", className)}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold tracking-tight text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-400 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
