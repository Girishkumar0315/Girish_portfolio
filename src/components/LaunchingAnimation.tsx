import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LaunchingAnimationProps {
  onComplete: () => void;
}

export const LaunchingAnimation: React.FC<LaunchingAnimationProps> = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const completedRef = useRef(false);

  const openCurtain = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsOpening(true);

    // Guaranteed unlock & unmount after transition completes
    setTimeout(() => {
      onComplete();
    }, 750);
  };

  useEffect(() => {
    // 2.6s cinematic animation before parting from the middle
    const timer = setTimeout(() => {
      openCurtain();
    }, 2600);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        openCurtain();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const firstWord = "BATCHU".split("");
  const secondWord = "GIRISH".split("");
  const thirdWord = "KUMAR".split("");

  return (
    <div
      className={`fixed inset-0 z-[9999] select-none overflow-hidden ${
        isOpening ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
      }`}
      onClick={openCurtain}
    >
      {/* SOFT AMBIENT RADIAL BLOOM (Pulsing behind the name) */}
      <motion.div
        animate={{
          scale: [0.9, 1.2, 0.95],
          opacity: [0.2, 0.45, 0.25],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] sm:w-[850px] sm:h-[500px] rounded-full bg-gradient-to-r from-[#00E676]/20 via-[#10F280]/20 to-[#00E676]/15 blur-[120px] pointer-events-none z-10"
      />

      {/* TOP HALF SHUTTER - Slides UP from middle */}
      <motion.div
        initial={{ y: '0%' }}
        animate={isOpening ? { y: '-101%' } : { y: '0%' }}
        transition={{
          duration: 0.75,
          ease: [0.77, 0, 0.175, 1], // Cinematic high-inertia curve
        }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#060608] z-20 overflow-hidden flex flex-col justify-end"
        style={{ willChange: 'transform' }}
      >
        {/* Glowing Horizon Seam Border */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00E676] to-transparent shadow-[0_0_20px_#00E676]"
        />
      </motion.div>

      {/* BOTTOM HALF SHUTTER - Slides DOWN from middle */}
      <motion.div
        initial={{ y: '0%' }}
        animate={isOpening ? { y: '101%' } : { y: '0%' }}
        transition={{
          duration: 0.75,
          ease: [0.77, 0, 0.175, 1],
        }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#060608] z-20 overflow-hidden flex flex-col justify-start"
        style={{ willChange: 'transform' }}
      >
        {/* Glowing Horizon Seam Border */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00E676] to-transparent shadow-[0_0_20px_#00E676]"
        />
      </motion.div>

      {/* CENTER STAGE: CLEAN KINETIC TYPOGRAPHY */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
        <motion.div
          animate={
            isOpening
              ? { scale: 1.1, opacity: 0, filter: 'blur(12px)' }
              : { scale: 1, opacity: 1, filter: 'blur(0px)' }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center"
        >
          {/* Main Title: BATCHU GIRISH */}
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight font-['Kanit',sans-serif] leading-none text-center flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-7">
            {/* FIRST WORD: BATCHU */}
            <span className="flex overflow-hidden py-1">
              {firstWord.map((letter, index) => (
                <motion.span
                  key={`bw-${index}`}
                  initial={{ y: '120%', opacity: 0, filter: 'blur(8px)', rotateX: -45 }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)', rotateX: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + index * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.3)]"
                >
                  {letter}
                </motion.span>
              ))}
            </span>

            {/* SECOND WORD: GIRISH */}
            <span className="flex overflow-hidden py-1">
              {secondWord.map((letter, index) => (
                <motion.span
                  key={`gw-${index}`}
                  initial={{ y: '120%', opacity: 0, filter: 'blur(8px)', rotateX: -45 }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)', rotateX: 0 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.32 + index * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-[#00E676] drop-shadow-[0_0_30px_rgba(0,230,118,0.6)]"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </div>

          {/* THE SINGLE LINE BETWEEN BATCHU GIRISH AND KUMAR */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1.2, 1], opacity: [0, 1, 0.85] }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="my-3 sm:my-5 md:my-6 w-48 sm:w-80 md:w-96 h-[2px] bg-gradient-to-r from-transparent via-[#00E676] to-transparent shadow-[0_0_22px_#00E676]"
          />

          {/* THIRD WORD: KUMAR */}
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight font-['Kanit',sans-serif] leading-none text-center flex items-center justify-center">
            <span className="flex overflow-hidden py-1">
              {thirdWord.map((letter, index) => (
                <motion.span
                  key={`kw-${index}`}
                  initial={{ y: '120%', opacity: 0, filter: 'blur(8px)', rotateX: -45 }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)', rotateX: 0 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.54 + index * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block bg-gradient-to-r from-[#00E676] via-white to-white bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(0,230,118,0.4)]"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </div>

          {/* SPECIALIZATION & CREDENTIALS: First B.Tech CSE, Data Science, and after that Data Analyst */}
          <div className="mt-4 sm:mt-6 flex flex-col items-center gap-2.5 select-none">
            {/* 1. First: B.Tech CSE, Data Science */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest uppercase text-white/90 font-semibold"
            >
              <span>B.Tech CSE</span>
              <span className="text-[#00E676]">•</span>
              <span>Data Science</span>
            </motion.div>

            {/* 2. After that: Data Analyst */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center px-4 py-1 rounded-full bg-[#00E676]/10 border border-[#00E676]/30 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#00E676] font-bold drop-shadow-[0_0_15px_rgba(0,230,118,0.5)]"
            >
              <span>Data Analyst</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
