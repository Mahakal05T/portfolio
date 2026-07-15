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
        hoverEffect && "hover:border-white/10 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-500",
        className
      )}
      {...props}
    >
      {hoverEffect && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 group-hover:animate-[shimmer_2s_infinite] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
