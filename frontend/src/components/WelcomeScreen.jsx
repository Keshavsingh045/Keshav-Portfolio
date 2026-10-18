import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export default function WelcomeScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    "Initializing neural core...",
    "Compiling MERN stack modules...",
    "Loading 3D interactive universe...",
    "Welcome to Keshav's Digital Space ✨"
  ];

  useEffect(() => {
    // Lock body scroll during intro
    document.body.style.overflow = 'hidden';

    // Smooth counter from 0 to 100 in ~2.6 seconds
    const intervalTime = 25; // 25ms * 100 steps = 2500ms
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    // Status message cycling
    const m1 = setTimeout(() => setStatusIndex(1), 700);
    const m2 = setTimeout(() => setStatusIndex(2), 1500);
    const m3 = setTimeout(() => setStatusIndex(3), 2200);

    // Complete after exactly 3.2 seconds
    const completeTimer = setTimeout(() => {
      document.body.style.overflow = 'unset';
      onComplete?.();
    }, 3200);

    return () => {
      clearInterval(timer);
      clearTimeout(m1);
      clearTimeout(m2);
      clearTimeout(m3);
      clearTimeout(completeTimer);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  const handleSkip = () => {
    document.body.style.overflow = 'unset';
    onComplete?.();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.04, 
        filter: "blur(12px)",
        transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[99999] bg-[#030712] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Subtle tech grid background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Skip button in top right corner */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full text-xs font-mono font-bold text-slate-400 hover:text-white bg-slate-900/60 border border-slate-700/60 hover:border-blue-500/60 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 group"
      >
        <span>Skip Intro</span>
        <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform">→</span>
      </button>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl mx-auto">
        
        {/* Glowing Monogram / Logo Icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 15 }}
          className="relative mb-8"
        >
          {/* Animated Neon Rings */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-60 animate-pulse" />
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-900 border-2 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-full h-full items-center justify-center text-blue-400">
              <Code2 size={36} />
            </div>
          </div>
        </motion.div>

        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>SYSTEM READY • PORTFOLIO 2026</span>
        </motion.div>

        {/* Hero Name */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2"
        >
          KESHAV <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">KUNDAN</span>
        </motion.h1>

        {/* Subtitle / Role */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-slate-400 text-sm md:text-base font-light tracking-wide mb-8"
        >
          Full Stack Developer • MERN • Interactive Web Experiences
        </motion.p>

        {/* Progress Bar Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full max-w-sm space-y-3"
        >
          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-900 border border-slate-800 rounded-full overflow-hidden p-[1px] relative shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          {/* Status Message and Percentage */}
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span className="truncate pr-2 text-slate-300 transition-all duration-300">
              {statusMessages[statusIndex]}
            </span>
            <span className="text-blue-400 font-bold shrink-0">
              {progress}%
            </span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
