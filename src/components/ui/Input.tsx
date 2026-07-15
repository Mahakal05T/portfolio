import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="relative group/input">
        <input
          type={type}
          className={cn(
            "peer w-full bg-black/20 border rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:ring-1 transition-colors placeholder-transparent disabled:opacity-50",
            error 
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" 
              : "border-white/10 focus:border-purple-500 focus:ring-purple-500",
            className
          )}
          placeholder={label}
          ref={ref}
          {...props}
        />
        <label 
          className={cn(
            "absolute left-4 top-2 text-xs font-medium transition-all",
            "peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4",
            "peer-focus:top-2 peer-focus:text-xs",
            error ? "text-red-400" : "text-purple-400 peer-focus:text-purple-400"
          )}
        >
          {label}
        </label>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-xs mt-1 absolute -bottom-5"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="relative group/input pb-4">
        <textarea
          className={cn(
            "peer w-full bg-black/20 border rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:ring-1 transition-colors resize-none placeholder-transparent disabled:opacity-50",
            error 
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" 
              : "border-white/10 focus:border-cyan-500 focus:ring-cyan-500",
            className
          )}
          placeholder={label}
          ref={ref}
          {...props}
        />
        <label 
          className={cn(
            "absolute left-4 top-2 text-xs font-medium transition-all",
            "peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4",
            "peer-focus:top-2 peer-focus:text-xs",
            error ? "text-red-400" : "text-cyan-400 peer-focus:text-cyan-400"
          )}
        >
          {label}
        </label>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-xs mt-1 absolute bottom-0"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
