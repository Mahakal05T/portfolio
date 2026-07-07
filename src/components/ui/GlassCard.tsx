import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard = ({ children, className, hoverEffect = false, ...props }: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "glass-card rounded-2xl p-6 relative overflow-hidden group",
        hoverEffect && "hover:border-white/20 transition-colors duration-500",
        className
      )}
      {...props}
    >
      {hoverEffect && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
