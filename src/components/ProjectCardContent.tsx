import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardContentProps {
  project: ProjectItem;
  onOpenModal: (project: ProjectItem) => void;
  isStacked?: boolean;
}

export const ProjectCardContent: React.FC<ProjectCardContentProps> = ({
  project,
  onOpenModal,
  isStacked = false,
}) => {
  return (
    <div className="w-full rounded-[28px] sm:rounded-[38px] md:rounded-[44px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C]/95 p-4 sm:p-5 md:p-6 shadow-[0_15px_45px_rgba(0,0,0,0.9)] transition-all duration-300 hover:border-[#00E676]/60 hover:shadow-[0_20px_60px_rgba(0,230,118,0.18)] group/card">
      {/* TOP ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3.5 sm:pb-4 border-b border-white/10">
        {/* Left: Number + Category/Title Stack */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {/* Animated Number */}
          <span
            className="font-black text-white leading-none select-none tracking-tight flex-shrink-0 transition-all duration-300 group-hover/card:text-[#00E676] group-hover/card:drop-shadow-[0_0_24px_rgba(0,230,118,0.65)]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
          >
            {project.number}
          </span>

          {/* Category and Title */}
          <div className="flex flex-col justify-center min-w-0">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#BBCCD7]/70 font-semibold truncate group-hover/card:text-[#00E676]/90 transition-colors">
              {project.category}
            </span>
            <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white mt-0.5 truncate group-hover/card:text-white transition-colors">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Right: Architecture Details & Radiant Live Project Button */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 self-end sm:self-center flex-shrink-0">
          <motion.button
            type="button"
            onClick={() => onOpenModal(project)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className="relative text-xs uppercase tracking-wider text-[#BBCCD7] hover:text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/20 hover:border-[#00E676]/60 hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer font-medium hover:shadow-[0_0_22px_rgba(0,230,118,0.35)] overflow-hidden group/btn"
            title="View full project details & architecture"
          >
            {/* Shimmer Light Reflection Sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
            <Layers className="h-3.5 w-3.5 text-[#00E676] group-hover/btn:rotate-12 transition-transform duration-300" />
            <span className="font-semibold text-white/90 group-hover/btn:text-white">Architecture &amp; Details</span>
          </motion.button>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00E676] via-[#10F280] to-[#00FF88] px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#022312] shadow-[0_0_22px_rgba(0,230,118,0.45)] hover:shadow-[0_0_36px_rgba(0,255,136,0.85)] hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#022312] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#022312]"></span>
              </span>
              <span>Live Project</span>
              <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#022312]" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onOpenModal(project)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00E676] via-[#10F280] to-[#00FF88] px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#022312] shadow-[0_0_22px_rgba(0,230,118,0.45)] hover:shadow-[0_0_36px_rgba(0,255,136,0.85)] hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#022312] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#022312]"></span>
              </span>
              <span>Live Project</span>
            </button>
          )}
        </div>
      </div>

      {/* BOTTOM ROW: TWO-COLUMN IMAGE GRID */}
      <div className="mt-3 sm:mt-4 grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3.5">
        {/* LEFT COLUMN (5 cols) - 2 STACKED IMAGES */}
        <div className="flex flex-col gap-2.5 sm:gap-3 md:col-span-5 justify-between">
          {/* Left Top Image */}
          <div
            className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[26px] bg-[#141414] border border-white/10 shadow-lg group/img cursor-pointer h-[110px] sm:h-[125px] md:h-[140px]"
            onClick={() => onOpenModal(project)}
          >
            <img
              src={project.images.col1Top}
              alt={`${project.title} preview 1`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover rounded-[20px] sm:rounded-[26px] transition-transform duration-700 group-hover/img:scale-108"
            />
            {/* Shimmer Light Reflection Sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover/img:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-2.5 sm:p-3">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white font-medium flex items-center gap-1">
                Inspect Preview ↗
              </span>
            </div>
          </div>

          {/* Left Bottom Image */}
          <div
            className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[26px] bg-[#141414] border border-white/10 shadow-lg group/img cursor-pointer h-[110px] sm:h-[125px] md:h-[140px]"
            onClick={() => onOpenModal(project)}
          >
            <img
              src={project.images.col1Bottom}
              alt={`${project.title} preview 2`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover rounded-[20px] sm:rounded-[26px] transition-transform duration-700 group-hover/img:scale-108"
            />
            {/* Shimmer Light Reflection Sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover/img:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-2.5 sm:p-3">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white font-medium flex items-center gap-1">
                Architecture View ↗
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (7 cols) - 1 TALL HERO IMAGE */}
        <div
          className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[26px] bg-[#141414] border border-white/10 shadow-lg md:col-span-7 group/img cursor-pointer h-[230px] sm:h-[260px] md:h-[290px]"
          onClick={() => onOpenModal(project)}
        >
          <img
            src={project.images.col2Tall}
            alt={`${project.title} main showcase`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover rounded-[20px] sm:rounded-[26px] transition-transform duration-700 group-hover/img:scale-108"
          />
          {/* Shimmer Light Reflection Sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover/img:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

          <a
            href={project.liveUrl || project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between rounded-full bg-black/80 backdrop-blur-md px-3.5 sm:px-4 py-2 border border-white/15 text-[10px] sm:text-xs uppercase tracking-wider text-[#D7E2EA] hover:border-[#00E676]/60 hover:shadow-[0_0_20px_rgba(0,230,118,0.35)] hover:bg-black/95 transition-all"
          >
            <span className="truncate max-w-[65%] font-medium">{project.subtitle}</span>
            <span className="flex items-center gap-1 text-[#00E676] font-semibold flex-shrink-0 group-hover/img:underline">
              Launch Live <ExternalLink className="h-3 w-3" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
