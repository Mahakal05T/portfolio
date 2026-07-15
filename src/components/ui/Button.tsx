import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'loading' | 'disabled';
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, className, isLoading, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-full overflow-hidden transition-all duration-300";
    
    // Determine effective variant
    const effectiveVariant = isLoading ? 'loading' : props.disabled ? 'disabled' : variant;

    const variants = {
      primary: "bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/10",
      secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 active:scale-[0.98]",
      outline: "border border-white/20 text-white hover:bg-white hover:text-black active:scale-[0.98]",
      ghost: "text-gray-400 hover:text-white hover:bg-white/5 active:scale-[0.98]",
      gradient: "bg-primary-gradient text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]",
      loading: "bg-white/10 text-white/50 cursor-wait",
      disabled: "bg-white/5 text-white/40 cursor-not-allowed border border-white/5",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={effectiveVariant !== 'loading' && effectiveVariant !== 'disabled' ? { scale: 0.98 } : undefined}
        className={cn(baseStyles, variants[effectiveVariant], "px-6 py-3", className)}
        disabled={effectiveVariant === 'disabled' || effectiveVariant === 'loading'}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        
        {/* Ripple/Shimmer effect for primary and gradient */}
        {(effectiveVariant === 'primary' || effectiveVariant === 'gradient') && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
