import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, className, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-full overflow-hidden transition-all duration-300";
    
    const variants = {
      primary: "bg-white text-black hover:scale-105",
      secondary: "bg-surface border border-border text-white hover:bg-white/10",
      outline: "border border-white/20 text-white hover:bg-white hover:text-black",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], "px-6 py-3", className)}
        {...props}
      >
        {children}
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
