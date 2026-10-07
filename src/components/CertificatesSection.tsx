import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Database, Code2, CheckCircle, ExternalLink, X, Sparkles, Loader2 } from 'lucide-react';
import { CERTIFICATES_DATA, ACHIEVEMENTS_DATA } from '../data/portfolioData';

interface CertAchievementDisplayItem {
  number: string;
  category: 'achievement' | 'certificate';
  badge: string;
  badgeColor: string;
  title: string;
  issuerOrOrg: string;
  date: string;
  description: string;
  skills: string[];
  icon: React.ReactNode;
  credentialUrl: string;
}

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertAchievementDisplayItem | null>(null);
  const [iframeLoading, setIframeLoading] = useState(true);

  // Reset loading spinner whenever a new certificate is opened
  useEffect(() => {
    if (selectedCert) {
      setIframeLoading(true);
    }
  }, [selectedCert]);

  // Prevent background scrolling and pause Lenis while certificate modal is open
  useEffect(() => {
    if (selectedCert) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

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
  }, [selectedCert]);

  const items: CertAchievementDisplayItem[] = [
    {
      number: "01",
      category: "achievement",
      badge: "National Finalist",
      badgeColor: "bg-amber-500/15 text-amber-900 border-amber-500/30",
      title: ACHIEVEMENTS_DATA[0].title,
      issuerOrOrg: ACHIEVEMENTS_DATA[0].organization,
      date: ACHIEVEMENTS_DATA[0].date,
      description: ACHIEVEMENTS_DATA[0].description,
      skills: ["Competitive Innovation", "Rapid Prototyping", "Full-Stack Engineering", "Real-Time Problem Solving"],
      icon: <Trophy className="h-6 w-6 text-amber-600 flex-shrink-0" />,
      credentialUrl: "https://drive.google.com/file/d/1M4hIhwo9MM6AxPXnBBGPpLLH8x-zOPzI/view?usp=sharing",
    },
    {
      number: "02",
      category: "certificate",
      badge: "Verified Credential",
      badgeColor: "bg-indigo-500/15 text-indigo-900 border-indigo-500/30",
      title: CERTIFICATES_DATA[0].title,
      issuerOrOrg: CERTIFICATES_DATA[0].issuer,
      date: CERTIFICATES_DATA[0].date,
      description: "Course Completion Certificate awarded for successfully completing Database Management System Part - 1, covering relational schemas, SQL querying, indexing, and enterprise databases.",
      skills: ["Relational Schema Design", "SQL Query Optimization", "ACID Compliance", "Indexing & Normalization"],
      icon: <Database className="h-6 w-6 text-indigo-600 flex-shrink-0" />,
      credentialUrl: "https://drive.google.com/file/d/1XiOKk0tqUn9BiLSsWKZd9ROpuLBkI1SZ/view?usp=sharing",
    },
    {
      number: "03",
      category: "certificate",
      badge: "Verified Credential",
      badgeColor: "bg-emerald-500/15 text-emerald-900 border-emerald-500/30",
      title: CERTIFICATES_DATA[1].title,
      issuerOrOrg: CERTIFICATES_DATA[1].issuer,
      date: CERTIFICATES_DATA[1].date,
      description: "Course Completion Certificate awarded by Naresh Technologies for mastering Python, object-oriented design paradigms, algorithms, and modular development.",
      skills: ["Python 3", "OOP Architecture", "Algorithmic Development", "Data Processing"],
      icon: <Code2 className="h-6 w-6 text-emerald-600 flex-shrink-0" />,
      credentialUrl: "https://drive.google.com/file/d/1KeyI_LIztPGaURvU3iLxowgPg8xhgDAK/view?usp=sharing",
    },
  ];

  return (
    <section
      id="certificates"
      className="relative w-full bg-[#E5ECEF] text-[#0C0C0C] py-24 sm:py-32 md:py-40 overflow-hidden"
    >
      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <span className="text-xs uppercase tracking-widest text-[#646973] font-mono">
            Credentials & Honors
          </span>
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mt-2"
            style={{ fontSize: 'clamp(2.3rem, 7.5vw, 105px)' }}
          >
            Certificates and achievements
          </h2>
        </motion.div>

        {/* ITEMS LIST */}
        <div className="flex flex-col">
          {items.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                borderColor: 'rgba(12, 12, 12, 0.15)',
              }}
              className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10 border-t py-10 sm:py-12 md:py-14 transition-colors hover:bg-neutral-50/70 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl ${
                index === items.length - 1 ? 'border-b' : ''
              }`}
            >
              {/* LEFT: NUMBER & ICON */}
              <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
                <div
                  className="font-black text-[#0C0C0C] leading-none select-none tracking-tight"
                  style={{ fontSize: 'clamp(2.8rem, 7vw, 110px)' }}
                >
                  {item.number}
                </div>
                <div className="p-3 rounded-2xl bg-neutral-100 border border-neutral-200 shadow-sm">
                  {item.icon}
                </div>
              </div>

              {/* MIDDLE: DETAILS, METRICS, SKILL TAGS */}
              <div className="flex flex-col justify-center gap-3 max-w-2xl flex-1">
                {/* Meta pills line */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className={`px-2.5 py-0.5 rounded-full font-semibold border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <span className="text-[#646973] font-medium">
                    {item.issuerOrOrg}
                  </span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-[#0C0C0C] font-bold">
                    {item.date}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-bold uppercase text-[#0C0C0C] leading-snug tracking-wide"
                  style={{ fontSize: 'clamp(1.25rem, 2.4vw, 2.2rem)' }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="font-light leading-relaxed text-[#0C0C0C]/80"
                  style={{
                    fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)',
                  }}
                >
                  {item.description}
                </p>

                {/* Verified Skills Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2.5 py-1 text-[11px] sm:text-xs font-medium text-neutral-700 border border-neutral-200"
                    >
                      <CheckCircle className="h-3 w-3 text-neutral-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT: CERTIFICATE BUTTON WITH ANIMATION */}
              <div className="flex items-center lg:justify-end flex-shrink-0 pt-2 lg:pt-0">
                <motion.button
                  type="button"
                  onClick={() => setSelectedCert(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  className="relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0C0C0C] text-white hover:bg-neutral-900 border border-transparent hover:border-amber-400/60 text-xs sm:text-sm font-mono font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(251,191,36,0.35)] group cursor-pointer overflow-hidden"
                  title={`View ${item.title} Certificate`}
                >
                  {/* Shimmer Light Reflection Sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                  <Award className="h-4 w-4 text-amber-400 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-200" />
                  <span>View Certificate</span>
                  <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:text-white transition-colors" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ANIMATED CERTIFICATE PREVIEW MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden"
            data-lenis-prevent="true"
          >
            {/* Smooth Animated Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 32, rotateX: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20, filter: 'blur(8px)' }}
              transition={{
                type: 'spring',
                damping: 28,
                stiffness: 260,
                mass: 0.85
              }}
              style={{ perspective: 1200 }}
              data-lenis-prevent="true"
              className="relative flex flex-col max-h-[92vh] sm:max-h-[88vh] w-full max-w-4xl rounded-[28px] sm:rounded-[36px] border-2 border-amber-400/40 bg-[#0C0C0C] text-white shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(251,191,36,0.2)] text-left overflow-hidden z-10"
            >
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between px-6 sm:px-10 py-5 sm:py-6 border-b border-white/10 bg-[#0C0C0C]/95 backdrop-blur-md z-10 flex-shrink-0 select-none">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30">
                    <Award className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-white truncate max-w-[240px] sm:max-w-md">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs font-mono text-neutral-400">
                      {selectedCert.issuerOrOrg} • {selectedCert.date}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="rounded-full border border-white/20 bg-white/10 p-2 text-white hover:bg-white/25 hover:rotate-90 transition-all cursor-pointer"
                  aria-label="Close Certificate Modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* MODAL BODY WITH EMBEDDED DRIVE VIEWER */}
              <div
                data-lenis-prevent="true"
                className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#080808] flex flex-col items-center justify-center min-h-[350px] sm:min-h-[480px] relative"
              >
                <div className="w-full h-[52vh] sm:h-[60vh] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-inner relative flex items-center justify-center">
                  {/* Smooth Loading Indicator while Google Drive file loads */}
                  {iframeLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm gap-3"
                    >
                      <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
                      <p className="text-xs font-mono text-neutral-400 tracking-wider">
                        Loading verified credential document...
                      </p>
                    </motion.div>
                  )}
                  <iframe
                    src={selectedCert.credentialUrl.replace('/view?usp=sharing', '/preview')}
                    title={`${selectedCert.title} Certificate Preview`}
                    className={`w-full h-full border-0 rounded-2xl transition-opacity duration-500 ${iframeLoading ? 'opacity-0' : 'opacity-100'}`}
                    allow="autoplay"
                    loading="lazy"
                    onLoad={() => setIframeLoading(false)}
                  />
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-10 py-4 sm:py-5 border-t border-white/10 bg-[#0C0C0C]/95 backdrop-blur-md z-10 flex-shrink-0">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>Verified Google Drive Credential</span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(251,191,36,0.4)] cursor-pointer"
                  >
                    <span>Open in Drive</span>
                    <ExternalLink className="h-4 w-4 text-black" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 hover:text-white transition-colors cursor-pointer py-2 px-3"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
