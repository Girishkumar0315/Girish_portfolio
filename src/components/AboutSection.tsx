import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { RESUME_INFO, SKILLS_DATA, EDUCATION_DATA } from '../data/portfolioData';
import { Github, Linkedin, Mail, FileText, ChevronUp, Printer, ExternalLink } from 'lucide-react';
import { ResumeModal } from './ResumeModal';
import { ResumeDocument } from './ResumeDocument';

export const AboutSection: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isInlineResumeOpen, setIsInlineResumeOpen] = useState(false);

  const coreTechnologies = [
    ...SKILLS_DATA.languages,
    ...SKILLS_DATA.webTechnologies,
    ...SKILLS_DATA.frameworksLibraries,
    ...SKILLS_DATA.toolsDatabases,
  ];

  const handleResumeClick = () => {
    setIsInlineResumeOpen((prev) => !prev);
  };

  const actionButtons = [
    {
      label: 'GitHub',
      icon: <Github className="h-4 w-4" />,
      href: RESUME_INFO.github,
      external: true,
      ariaLabel: 'Open GitHub Profile',
    },
    {
      label: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4" />,
      href: RESUME_INFO.linkedin,
      external: true,
      ariaLabel: 'Open LinkedIn Profile',
    },
    {
      label: 'Email',
      icon: <Mail className="h-4 w-4" />,
      href: `mailto:${RESUME_INFO.email}`,
      external: false,
      ariaLabel: 'Send Email',
    },
    {
      label: 'Resume',
      icon: <FileText className="h-4 w-4" />,
      onClick: handleResumeClick,
      ariaLabel: 'View Resume (PDF)',
      isToggle: true,
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen w-full overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32 flex flex-col items-center justify-center select-none"
    >
      {/* 4 DECORATIVE 3D IMAGES IN CORNERS */}
      {/* 1. Top-Left: Moon icon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 w-[120px] sm:w-[160px] md:w-[210px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Decorative 3D Moon"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] animate-[float_6s_ease-in-out_infinite]"
        />
      </FadeIn>

      {/* 2. Bottom-Left: 3D Object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 w-[100px] sm:w-[140px] md:w-[180px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="Decorative 3D Object"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] animate-[float_7s_ease-in-out_infinite_1s]"
        />
      </FadeIn>

      {/* 3. Top-Right: Lego icon */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 w-[120px] sm:w-[160px] md:w-[210px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Decorative 3D Lego"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] animate-[float_6.5s_ease-in-out_infinite_0.5s]"
        />
      </FadeIn>

      {/* 4. Bottom-Right: 3D Group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 w-[130px] sm:w-[170px] md:w-[220px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="Decorative 3D Group"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] animate-[float_8s_ease-in-out_infinite_1.5s]"
        />
      </FadeIn>

      {/* CENTERED CONTENT WRAPPER */}
      <div className="relative z-20 flex w-full max-w-4xl flex-col items-center text-center">
        {/* HEADING */}
        <FadeIn delay={0} y={40} className="w-full">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* GAP BETWEEN HEADING AND TEXT */}
        <div className="h-6 sm:h-8 md:h-10" />

        {/* ANIMATED SCROLL-REVEAL PARAGRAPH, CORE TECHNOLOGIES & EDUCATION */}
        <div className="w-full max-w-3xl px-2">
          <AnimatedText
            text={RESUME_INFO.bioText}
            skillsTitle="CORE TECHNICAL ARSENAL & CREATIVE STACK"
            skills={coreTechnologies}
            educationTitle="EDUCATION & ACADEMIC BACKGROUND"
            education={EDUCATION_DATA}
            className="font-medium text-[#D7E2EA]"
            id="about-animated-text"
          />
        </div>

        {/* INSTANT ACTION BUTTONS ROW (GitHub, LinkedIn, Email, Resume) - No filling animation delay */}
        <div
          className="mt-8 sm:mt-10 w-full flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-2"
          id="about-action-buttons-row"
        >
          {actionButtons.map((action, idx) => {
            const isResume = action.label === 'Resume';
            const isActive = isResume && isInlineResumeOpen;

            const baseStyle =
              'group inline-flex items-center justify-center gap-2 rounded-full border px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer select-none backdrop-blur-md shadow-md';

            const stateStyle = isActive
              ? 'border-purple-500 bg-purple-950/60 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] scale-105'
              : 'border-white/15 bg-[#18181F]/90 text-white hover:border-purple-500/60 hover:bg-[#22222E] hover:scale-105';

            if (action.href) {
              return (
                <a
                  key={idx}
                  href={action.href}
                  target={action.external !== false ? '_blank' : undefined}
                  rel={action.external !== false ? 'noopener noreferrer' : undefined}
                  aria-label={action.ariaLabel || action.label}
                  className={`${baseStyle} ${stateStyle}`}
                >
                  <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    {action.icon}
                  </span>
                  <span>{action.label}</span>
                </a>
              );
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={action.onClick}
                aria-label={action.ariaLabel || action.label}
                className={`${baseStyle} ${stateStyle}`}
              >
                <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                  {action.icon}
                </span>
                <span>{action.label}</span>
                {isResume && (
                  <span className="ml-0.5 rounded bg-purple-500/20 px-1.5 py-0.5 text-[10px] text-purple-300">
                    {isInlineResumeOpen ? 'Open' : 'PDF'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* INLINE RESUME DISPLAY (Toggled via the Resume button, matching PDF format exactly) */}
        {isInlineResumeOpen && (
          <div className="mt-12 w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
            {/* Action toolbar above the PDF */}
            <div className="mb-4 flex w-full max-w-[820px] items-center justify-between px-2 text-white">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-400" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                  Batchu Girish Kumar — Resume (PDF View)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsResumeModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white transition-all hover:bg-white/20 active:scale-95 cursor-pointer"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Fullscreen Modal</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white transition-all hover:bg-white/20 active:scale-95 cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsInlineResumeOpen(false)}
                  className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80 transition-all hover:bg-white/20 active:scale-95 cursor-pointer"
                  title="Hide Resume"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                  <span>Hide</span>
                </button>
              </div>
            </div>

            {/* Pristine PDF Document Container */}
            <ResumeDocument />
          </div>
        )}
      </div>

      {/* MODAL RESUME VIEWER (Accessible in full screen with printable mode) */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </section>
  );
};
