import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { TRAINING_DATA } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export const TrainingSection: React.FC = () => {
  return (
    <section
      id="training"
      className="relative z-10 w-full bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32 select-none border-t border-white/5"
    >
      <div className="mx-auto max-w-5xl w-full">
        {/* HEADING */}
        <FadeIn delay={0} y={40} className="text-center mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-mono">
            Professional Enhancement & Competencies
          </span>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mt-2"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            Training
          </h2>
          <p className="mt-4 text-sm sm:text-base uppercase tracking-widest text-[#D7E2EA]/70 font-light">
            MasterClasses & Algorithmic Problem Solving
          </p>
        </FadeIn>

        {/* MASTERCLASS TRAINING CARD */}
        <div className="max-w-3xl mx-auto w-full">
          {TRAINING_DATA.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-[32px] border-2 border-white/10 bg-[#141414] p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden"
            >
              {/* Background glow accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7621B0]/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <span className="rounded-full bg-purple-500/15 border border-purple-500/30 px-3 py-1 text-xs uppercase tracking-wider text-purple-300 font-mono">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono text-[#BBCCD7]/70">
                    {item.period}
                  </span>
                </div>

                <h3 className="mt-5 text-xl sm:text-2xl font-bold uppercase tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs uppercase tracking-wider text-[#BBCCD7]/80 font-mono">
                  {item.provider}
                </p>

                <div className="mt-6 space-y-3.5">
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-[#B600A8] flex-shrink-0" />
                      <p className="text-sm leading-relaxed text-[#D7E2EA]/85 font-light">
                        {h}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD FOOTER: BOTTOM-LEFT CORNER DSA LIVE PROJECT BUTTON */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                {/* BOTTOM LEFT CORNER: DSA Project Live Project Button */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={item.liveUrl || "https://dsa-legends.vercel.app"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00E676] via-[#10F280] to-[#00FF88] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-[#022312] shadow-[0_0_22px_rgba(0,230,118,0.42)] hover:shadow-[0_0_32px_rgba(0,255,136,0.7)] hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#022312] opacity-60"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#022312]"></span>
                    </span>
                    <span>DSA Live Project</span>
                    <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#022312]" />
                  </a>

                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold uppercase tracking-wider text-[#D7E2EA] transition-all"
                      title="View DSA Project Repository"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span className="hidden xs:inline">Repository</span>
                    </a>
                  )}
                </div>

                {/* Right: Completed with Distinction */}
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
                    Completed with Distinction
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
