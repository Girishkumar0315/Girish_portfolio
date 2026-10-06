import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnet } from './Magnet';
import { RESUME_INFO } from '../data/portfolioData';
import {
  Linkedin,
  Github,
  Mail,
  ArrowUpRight,
  Menu,
  X,
  Play,
  Sparkles,
  Camera,
  Layers,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenContact?: () => void;
  onReplayIntro?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onReplayIntro }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Active portrait image state
  const [activePhoto, setActivePhoto] = useState<string>('/girish-desk.jpg');
  const [photoMode, setPhotoMode] = useState<'desk' | 'generative' | 'portrait'>('desk');
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const menuTabs = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Training", href: "#training" },
    { label: "Certificates & Achievements", href: "#certificates" },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // 3D Parallax Tilt for Right-Side Photo
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const cyclePhotoMode = () => {
    if (photoMode === 'desk') {
      setPhotoMode('generative');
      setActivePhoto('/girish-generative.jpg');
    } else if (photoMode === 'generative') {
      setPhotoMode('portrait');
      setActivePhoto('/girish-portrait.jpg');
    } else {
      setPhotoMode('desk');
      setActivePhoto('/girish-desk.jpg');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setActivePhoto(result);
          setPhotoMode('portrait');
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none"
      style={{ overflowX: 'clip' }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        aria-label="Upload photo"
      />

      {/* 1. TOP NAVBAR */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-30 flex w-full items-center justify-between px-6 pt-6 sm:px-10 md:px-14 lg:px-16 md:pt-8"
        id="navbar"
      >
        {/* Full Name Brand */}
        <div className="flex items-center" id="brand-header">
          <a
            href="#hero"
            className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-75"
            id="brand-name-link"
          >
            BATCHU GIRISH KUMAR <span className="text-[#D7E2EA]/40 font-light mx-1 sm:mx-1.5">|</span> PORTFOLIO
          </a>
        </div>

        {/* Action Controls: Contact button & Three lines button */}
        <div className="relative flex items-center gap-2.5 sm:gap-3.5" id="nav-actions" ref={menuRef}>
          <a
            id="nav-contact-button"
            href="#contact"
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D7E2EA] transition-all hover:bg-white/10 hover:border-white/40 active:scale-95 shadow-sm"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
          </a>

          <button
            id="nav-three-lines-button"
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-[#141414]/90 text-[#D7E2EA] backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer shadow-md"
          >
            {menuOpen ? (
              <X className="h-5 w-5 transition-transform duration-200 rotate-90 animate-in" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Dropdown Navigation Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-full right-0 mt-3 w-56 sm:w-64 rounded-2xl border border-white/15 bg-[#141414]/95 p-2 shadow-2xl backdrop-blur-xl z-50 flex flex-col gap-1"
                id="three-lines-menu-dropdown"
              >
                <div className="px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase text-[#D7E2EA]/50 border-b border-white/10 mb-1">
                  Navigation
                </div>
                {menuTabs.map((tab) => (
                  <a
                    key={tab.label}
                    href={tab.href}
                    id={`menu-item-${tab.label.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-all hover:bg-white/10 hover:text-white group"
                  >
                    <span>{tab.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-40 transition-opacity group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}

                {onReplayIntro && (
                  <div className="pt-1 mt-1 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onReplayIntro();
                      }}
                      className="w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#00E676] hover:bg-[#00E676]/10 transition-all cursor-pointer group"
                    >
                      <span className="flex items-center gap-2">
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Replay Launch Intro</span>
                      </span>
                      <span className="text-[10px] font-mono opacity-60">LAUNCH</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* 2. SPLIT HERO CONTENT: LEFT = NAME ASIDE, RIGHT = FIXED IMAGE */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-14 lg:px-16 py-6 md:py-2 gap-8 md:gap-12 w-full max-w-[1720px] mx-auto my-auto">
        {/* LEFT COLUMN: NAME & IDENTITY */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full md:w-3/5 lg:w-7/12 flex flex-col items-start text-left justify-center"
        >
          {/* MAIN MASSIVE HEADING: BATCHU GIRISH KUMAR */}
          <h1
            className="hero-heading font-black uppercase tracking-tight text-white leading-[0.92] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] select-none"
            id="hero-heading-text"
          >
            Hi, i&apos;m<br />
            <span className="bg-gradient-to-r from-white via-[#00E676] to-[#B600A8] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,230,118,0.25)]">
              BATCHU GIRISH KUMAR
            </span>
          </h1>

          {/* Role: Data Analyst & Data Science */}
          <div className="mt-4 sm:mt-5 flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[#00E676] animate-pulse" />
            <span className="text-base sm:text-lg md:text-xl font-mono uppercase tracking-widest text-[#00E676] font-bold">
              Data Analyst • Data Science
            </span>
          </div>

          {/* Quick Connect Actions */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00E676] to-[#00c965] text-black font-bold text-xs sm:text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,230,118,0.35)] cursor-pointer"
            >
              Explore Projects ↗
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <a
                href={RESUME_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-[#D7E2EA]/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={RESUME_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-[#D7E2EA]/70 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${RESUME_INFO.email}`}
                className="p-1.5 text-[#D7E2EA]/70 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: FIXED IMAGE ANCHORED ON THE RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full md:w-2/5 lg:w-5/12 flex items-center justify-center md:justify-end"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
            className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[420px]"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#00E676]/20 via-[#b600a8]/15 to-red-600/20 rounded-[2.5rem] blur-2xl pointer-events-none" />

            {/* Fixed 3D Tilting Frame */}
            <div
              style={{
                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transition: 'transform 0.12s ease-out',
              }}
              className="relative w-full aspect-[9/15] rounded-[2rem] overflow-hidden border border-white/20 bg-[#121216] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-end group"
            >
              {/* Photo Image */}
              <img
                src={activePhoto}
                alt="Batchu Girish Kumar at Desk"
                className="absolute inset-0 w-full h-full object-cover object-center select-none transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Vignette overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Interactive Specular Glint */}
              <div
                style={{
                  background: `radial-gradient(circle at ${50 + tilt.x * 3}% ${
                    50 - tilt.y * 3
                  }%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
                }}
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
              />

              {/* Bottom Card Identity Footer */}
              <div className="relative z-10 p-5 sm:p-6 flex flex-col gap-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                  BATCHU GIRISH KUMAR
                </h3>
                <p className="text-xs text-[#D7E2EA]/80 font-mono tracking-wide">
                  B.Tech CSE • Lovely Professional University
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. BOTTOM BAR */}
      <div className="relative z-20 flex w-full items-end justify-end px-6 pb-6 sm:px-10 sm:pb-8 md:px-14 lg:px-16 md:pb-8">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-right text-[11px] font-mono tracking-widest text-[#D7E2EA]/40 uppercase hidden sm:block"
        >
          SCROLL TO EXPLORE ↓
        </motion.div>
      </div>
    </section>
  );
};
