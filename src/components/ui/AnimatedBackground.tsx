import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background aurora-bg">
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -150, 150, 0],
            y: [0, 150, -150, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px]"
        />
      </div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
};
