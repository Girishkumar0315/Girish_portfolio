import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { LaunchingAnimation } from './components/LaunchingAnimation';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TrainingSection } from './components/TrainingSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const [isLaunching, setIsLaunching] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Pause scroll while launch animation is playing
    if (isLaunching) {
      lenis.stop();
      document.body.style.overflow = 'hidden';
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
      document.body.style.overflow = '';
    };
  }, []);

  const handleLaunchComplete = () => {
    setIsLaunching(false);
    document.body.style.overflow = '';
    const lenisInstance = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenisInstance) {
      lenisInstance.start();
    }
  };

  useEffect(() => {
    const lenisInstance = (window as unknown as { lenis?: Lenis }).lenis;
    if (!isLaunching) {
      document.body.style.overflow = '';
      if (lenisInstance) lenisInstance.start();
    }
  }, [isLaunching]);

  // Safety fallback: ensure scroll is always restored within 3.5 seconds
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      handleLaunchComplete();
    }, 3500);
    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setIsLaunching(true);
    document.body.style.overflow = 'hidden';
    const lenisInstance = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenisInstance) {
      lenisInstance.stop();
    }
  };

  return (
    <main
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] selection:bg-[#B600A8] selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      {/* LAUNCHING ANIMATION OVERLAY */}
      {isLaunching && (
        <LaunchingAnimation onComplete={handleLaunchComplete} />
      )}

      {/* 1. HERO SECTION */}
      <HeroSection onReplayIntro={handleReplayIntro} />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection />

      {/* 4. PROJECTS SECTION */}
      <ProjectsSection />

      {/* 5. TRAINING SECTION */}
      <TrainingSection />

      {/* 6. CERTIFICATES AND ACHIEVEMENTS SECTION */}
      <CertificatesSection />

      {/* 7. CONTACT SECTION & SOFT THANK YOU */}
      <ContactSection />
    </main>
  );
}
