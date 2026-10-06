import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ExternalLink, Github, Sparkles, X, CheckCircle2, ChevronDown } from 'lucide-react';
import { ProjectCardContent } from './ProjectCardContent';

interface TiltProjectCardProps {
  project: ProjectItem;
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
  onOpenModal: (proj: ProjectItem) => void;
}

const TiltProjectCard: React.FC<TiltProjectCardProps> = ({
  project,
  index,
  cardRef,
  onOpenModal,
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0, isHovered: false });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -4.5;
    const rotY = ((x - centerX) / centerX) * 4.5;
    setRotate({ x: rotX, y: rotY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0, isHovered: false });
  };

  return (
    <motion.div
      ref={(el) => {
        containerRef.current = el;
        cardRef(el);
      }}
      initial={{ opacity: 0, y: 65, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.isHovered ? rotate.x : 0,
        rotateY: rotate.isHovered ? rotate.y : 0,
        y: rotate.isHovered ? -8 : 0,
      }}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="w-full relative transition-all duration-300"
    >
      {/* Dynamic Ambient Background Glow on Hover */}
      <div
        className="absolute -inset-1 rounded-[32px] sm:rounded-[42px] md:rounded-[48px] bg-gradient-to-r from-[#00E676]/30 via-[#10F280]/20 to-[#00E676]/30 blur-xl opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100"
        style={{
          opacity: rotate.isHovered ? 0.6 : 0,
        }}
      />

      {/* Interactive Card Container with Mouse Spotlight */}
      <div
        className="relative w-full rounded-[28px] sm:rounded-[38px] md:rounded-[44px] overflow-hidden transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_60px_rgba(0,230,118,0.2)]"
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        {rotate.isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 230, 118, 0.08), transparent 45%)`,
            }}
          />
        )}

        <ProjectCardContent
          project={project}
          onOpenModal={onOpenModal}
        />
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Prevent background scrolling and pause Lenis while project details modal is open
  useEffect(() => {
    if (selectedProject) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Pause global Lenis smooth scroll while inspecting project modal
      const lenisInstance = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
      if (lenisInstance) {
        lenisInstance.stop();
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        if (lenisInstance) {
          lenisInstance.start();
        }
      };
    }
  }, [selectedProject]);

  const scrollToCard = (index: number) => {
    const el = cardRefs.current[index];
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-[#0C0C0C] -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] select-none pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 md:px-10"
    >
      {/* SECTION HEADER */}
      <div className="mx-auto max-w-5xl w-full text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#BBCCD7]">
          <span className="text-[#00E676] font-semibold">Selected Works</span>
          <span className="text-white/30">•</span>
          <span>Data Science & Analytics</span>
        </div>

        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mt-3"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 4.75rem)' }}
        >
          Projects
        </h2>

        <p className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/75 font-light">
          Machine Learning • Advanced Analytics • Predictive Modeling
        </p>

        {/* QUICK JUMP PILLS */}
        <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
          {PROJECTS_DATA.map((proj, idx) => (
            <button
              key={proj.id}
              type="button"
              onClick={() => scrollToCard(idx)}
              className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#BBCCD7] hover:text-white hover:border-[#00E676]/60 hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              <span className="text-[#00E676] font-bold group-hover:scale-110 transition-transform">
                {proj.number}
              </span>
              <span className="hidden sm:inline text-[#D7E2EA]/80 group-hover:text-white">
                {proj.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ANIMATED PROJECTS LIST */}
      <div className="mx-auto max-w-5xl w-full flex flex-col gap-10 sm:gap-14 md:gap-16">
        {PROJECTS_DATA.map((project, index) => (
          <TiltProjectCard
            key={project.id}
            project={project}
            index={index}
            cardRef={(el) => {
              cardRefs.current[index] = el;
            }}
            onOpenModal={(proj) => setSelectedProject(proj)}
          />
        ))}
      </div>

      {/* SECTION FOOTER INDICATOR */}
      <div className="mx-auto max-w-5xl w-full text-center mt-12 sm:mt-16 flex flex-col items-center justify-center text-white/40 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span>Scroll down for Training & Education</span>
        </div>
        <ChevronDown className="h-4 w-4 mt-2 text-[#00E676] animate-bounce" />
      </div>

      {/* PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-hidden"
            data-lenis-prevent="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedProject(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 40, rotateX: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              style={{ perspective: 1000 }}
              data-lenis-prevent="true"
              className="relative flex flex-col max-h-[92vh] sm:max-h-[88vh] w-full max-w-3xl rounded-[28px] sm:rounded-[36px] border-2 border-[#00E676]/45 bg-[#0C0C0C] shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(0,230,118,0.15)] text-left overflow-hidden"
            >
              {/* STICKY / FIXED MODAL HEADER */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-5 sm:py-6 border-b border-white/10 bg-[#0C0C0C]/95 backdrop-blur-md z-10 flex-shrink-0 select-none">
                <div className="flex items-center gap-3">
                  <span className="font-black text-[#D7E2EA] text-2xl font-mono">
                    {selectedProject.number}
                  </span>
                  <div className="h-4 w-[1px] bg-white/20" />
                  <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/70 font-semibold truncate max-w-[200px] sm:max-w-none">
                    {selectedProject.category}
                  </span>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full border border-white/20 bg-white/10 p-2 text-white hover:bg-white/25 hover:rotate-90 transition-all cursor-pointer"
                  aria-label="Close Project Modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* SCROLLABLE CONTENT BODY (Scrolls with mouse wheel & cursor drag) */}
              <div
                data-lenis-prevent="true"
                tabIndex={0}
                className="flex-1 overflow-y-auto px-6 sm:px-10 py-6 sm:py-8 overscroll-contain modal-scrollbar focus:outline-none"
                style={{ WebkitOverflowScrolling: 'touch' }}
                onWheel={(e) => {
                  e.stopPropagation();
                }}
              >
                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold tracking-wide text-white">
                  {selectedProject.title}
                </h3>

                {/* Overview */}
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#D7E2EA]/90 font-light">
                  {selectedProject.description}
                </p>

                {/* Technical Highlights / Resume Metrics */}
                <div className="mt-6 rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-5">
                  <h4 className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    Key Achievements & Implementation
                  </h4>
                  <ul className="mt-3.5 space-y-2.5">
                    {selectedProject.metrics.map((metric, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D7E2EA]/85">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mt-6">
                  <h4 className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
                    Tech Stack & Frameworks
                  </h4>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-[#D7E2EA] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Image Previews */}
                <div className="mt-8">
                  <h4 className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold mb-3">
                    Visual Previews & Architecture
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141414]">
                      <img
                        src={selectedProject.images.col1Top}
                        alt="Detail 1"
                        className="h-32 sm:h-36 w-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141414]">
                      <img
                        src={selectedProject.images.col1Bottom}
                        alt="Detail 2"
                        className="h-32 sm:h-36 w-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141414]">
                      <img
                        src={selectedProject.images.col2Tall}
                        alt="Detail 3"
                        className="h-32 sm:h-36 w-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* STICKY / FIXED MODAL FOOTER */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-10 py-4 sm:py-5 border-t border-white/10 bg-[#0C0C0C]/95 backdrop-blur-md z-10 flex-shrink-0">
                <div className="flex flex-wrap items-center gap-3">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00E676] via-[#10F280] to-[#00FF88] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-[#022312] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_24px_rgba(0,230,118,0.45)] hover:shadow-[0_0_32px_rgba(0,255,136,0.7)] cursor-pointer"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#022312] opacity-60"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#022312]"></span>
                      </span>
                      <span>Live Project</span>
                      <ExternalLink className="h-4 w-4 text-[#022312]" />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/15 transition-all"
                    >
                      <Github className="h-4 w-4" />
                      Repository
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 hover:text-white transition-colors cursor-pointer py-2"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
