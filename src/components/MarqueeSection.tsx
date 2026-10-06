import React, { useEffect, useRef, useState } from 'react';
import { MARQUEE_IMAGES } from '../data/portfolioData';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  // Split images evenly between Row 1 and Row 2
  const half = Math.ceil(MARQUEE_IMAGES.length / 2);
  const row1Images = MARQUEE_IMAGES.slice(0, half);
  const row2Images = MARQUEE_IMAGES.slice(half);

  // Quadruple each row for seamless horizontal scrolling ribbon
  const tripledRow1 = [...row1Images, ...row1Images, ...row1Images, ...row1Images];
  const tripledRow2 = [...row2Images, ...row2Images, ...row2Images, ...row2Images];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            // Calculate scroll offset as specified: (window.scrollY - sectionTop + window.innerHeight) * 0.3
            const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setScrollOffset(offset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Row 1 moves RIGHT on scroll: translateX(offset - 200)
  const row1Transform = `translate3d(${scrollOffset - 200}px, 0px, 0px)`;
  // Row 2 moves LEFT on scroll: translateX(-(offset - 200))
  const row2Transform = `translate3d(${-(scrollOffset - 200)}px, 0px, 0px)`;

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="relative w-full overflow-hidden bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 select-none"
    >
      <div className="flex flex-col gap-3">
        {/* ROW 1: Moves RIGHT on scroll */}
        <div className="overflow-hidden w-full">
          <div
            style={{
              transform: row1Transform,
              willChange: 'transform',
            }}
            className="flex gap-3 whitespace-nowrap transition-transform duration-75 ease-out"
          >
            {tripledRow1.map((src, index) => (
              <div
                key={`r1-${index}`}
                className="relative h-[270px] w-[420px] flex-shrink-0 overflow-hidden rounded-2xl bg-[#141414] border border-white/5 shadow-2xl"
              >
                <img
                  src={src}
                  alt={`Creative 3D preview ${index + 1}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover rounded-2xl pointer-events-none transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Moves LEFT on scroll */}
        <div className="overflow-hidden w-full">
          <div
            style={{
              transform: row2Transform,
              willChange: 'transform',
            }}
            className="flex gap-3 whitespace-nowrap transition-transform duration-75 ease-out"
          >
            {tripledRow2.map((src, index) => (
              <div
                key={`r2-${index}`}
                className="relative h-[270px] w-[420px] flex-shrink-0 overflow-hidden rounded-2xl bg-[#141414] border border-white/5 shadow-2xl"
              >
                <img
                  src={src}
                  alt={`Creative 3D preview row 2 ${index + 1}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover rounded-2xl pointer-events-none transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
