import React from 'react';
import { X, Printer, FileText } from 'lucide-react';
import { ResumeDocument } from './ResumeDocument';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 sm:p-4 md:p-6 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      id="resume-modal-overlay"
    >
      {/* Modal Container */}
      <div
        className="relative my-auto w-full max-w-[850px] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Top Control Bar */}
        <div className="mb-3 flex w-full items-center justify-between px-2 text-white">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              Batchu Girish Kumar — Resume (PDF View)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              title="Print / Save Resume"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white transition-all hover:bg-white/20 active:scale-95 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close Resume View"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95 cursor-pointer"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Paper Document Container - Strict 1:1.414 (A4) Ratio, Exact PDF Alignment, Colors & Fonts */}
        <ResumeDocument />
      </div>
    </div>
  );
};
