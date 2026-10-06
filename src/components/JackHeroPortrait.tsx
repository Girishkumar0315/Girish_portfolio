import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Smile, Sparkles, RefreshCw, ZoomIn, ZoomOut, Check, Image as ImageIcon } from 'lucide-react';

interface JackHeroPortraitProps {
  className?: string;
}

export const JackHeroPortrait: React.FC<JackHeroPortraitProps> = ({ className = '' }) => {
  // Local state for user's photo (stored in localStorage for persistence)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load any previously saved photo or check public asset on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jack_custom_portrait');
      if (saved) {
        setPhotoUrl(saved);
        const savedZoom = localStorage.getItem('jack_portrait_zoom');
        if (savedZoom) setZoom(parseFloat(savedZoom));
        const savedOffset = localStorage.getItem('jack_portrait_offset_y');
        if (savedOffset) setOffsetY(parseFloat(savedOffset));
        return;
      }
      
      // Check if user has IMG_20241208_141857.jpg or jack-portrait.jpg in /public
      const testImg = new Image();
      testImg.src = '/IMG_20241208_141857.jpg';
      testImg.onload = () => setPhotoUrl('/IMG_20241208_141857.jpg');
      testImg.onerror = () => {
        const testImg2 = new Image();
        testImg2.src = '/jack-portrait.jpg';
        testImg2.onload = () => setPhotoUrl('/jack-portrait.jpg');
      };
    } catch {
      // localStorage may fail in sandboxed iframes
    }
  }, []);

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file (e.g. JPG or PNG)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawResult = e.target?.result as string;
      if (!rawResult) return;

      // Downscale and circle-crop image to decrease photo file size & memory footprint
      const img = new Image();
      img.onload = () => {
        const maxDim = 1000;
        const naturalW = img.naturalWidth || img.width || 400;
        const naturalH = img.naturalHeight || img.height || 400;
        const minDim = Math.min(naturalW, naturalH);
        const sx = (naturalW - minDim) / 2;
        const sy = (naturalH - minDim) / 2;

        const targetSize = Math.min(minDim, maxDim);
        const canvas = document.createElement('canvas');
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Circle clip
          ctx.beginPath();
          ctx.arc(targetSize / 2, targetSize / 2, targetSize / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();

          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, targetSize, targetSize);
          const compressedDataUrl = canvas.toDataURL('image/png', 0.92);
          setPhotoUrl(compressedDataUrl);
          try {
            localStorage.setItem('jack_custom_portrait', compressedDataUrl);
          } catch {
            // Storage full fallback
          }
          showToast('Photo uploaded and cropped to round shape!');
          return;
        }

        setPhotoUrl(rawResult);
        try {
          localStorage.setItem('jack_custom_portrait', rawResult);
        } catch {
          // ignore
        }
        showToast('Photo updated successfully!');
      };
      img.onerror = () => {
        setPhotoUrl(rawResult);
        showToast('Photo updated!');
      };
      img.src = rawResult;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const resetToDefault = () => {
    setPhotoUrl(null);
    setZoom(1);
    setOffsetY(0);
    try {
      localStorage.removeItem('jack_custom_portrait');
      localStorage.removeItem('jack_portrait_zoom');
      localStorage.removeItem('jack_portrait_offset_y');
    } catch {
      // ignore
    }
    showToast('Reset to default smiling portrait');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const adjustZoom = (delta: number) => {
    const newZoom = Math.min(Math.max(0.5, zoom + delta), 2.2);
    setZoom(newZoom);
    try {
      localStorage.setItem('jack_portrait_zoom', newZoom.toString());
    } catch {
      // ignore
    }
  };

  const adjustOffsetY = (delta: number) => {
    const newOffset = Math.min(Math.max(-60, offsetY + delta), 60);
    setOffsetY(newOffset);
    try {
      localStorage.setItem('jack_portrait_offset_y', newOffset.toString());
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-end w-full group select-none ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden file input for one-click upload of IMG_20241208_141857.jpg */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* AMBIENT BACKLIGHT GLOW */}
      <div className="pointer-events-none absolute -inset-4 sm:-inset-6 -z-10 rounded-full bg-gradient-to-t from-[#B600A8]/25 via-[#7621B0]/15 to-transparent blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-700" />

      {/* PORTRAIT CONTAINER - SMALL ROUND SHAPE WITHOUT OUTLINE */}
      <div
        className="relative w-full max-w-[170px] sm:max-w-[210px] md:max-w-[240px] lg:max-w-[260px] aspect-square rounded-full overflow-hidden border-none outline-none bg-gradient-to-b from-[#18181b]/90 via-[#0e0e11]/95 to-[#09090b] shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300"
        style={{
          boxShadow: isDraggingOver
            ? '0 0 35px #B600A8'
            : '0 20px 50px rgba(0,0,0,0.85)',
        }}
      >
        {photoUrl ? (
          /* REAL USER PHOTO WITH SMILE EXPRESSION */
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-black/40 aspect-square">
            <img
              src={photoUrl}
              alt="Girish (Batchu Girish Kumar) smiling face portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-200 pointer-events-none rounded-full aspect-square"
              style={{
                transform: `scale(${zoom}) translateY(${offsetY}px)`,
                objectPosition: 'center 18%',
              }}
            />

            {/* Subtle bottom vignette to blend naturally into the hero floor */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-transparent" />
          </div>
        ) : (
          /* ARTISTIC CRAFTED SMILE PORTRAIT OF JACK (MODELING HIS REAL PHOTO) */
          <div className="relative w-full h-full flex flex-col items-center justify-end overflow-hidden">
            {/* Background lighting gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#181122] via-[#0d0d14] to-[#08080c]" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-tr from-[#B600A8]/20 to-[#BE4C00]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Vector Artistic Portrait of Jack smiling with glasses */}
            <svg
              viewBox="0 0 400 500"
              className="relative z-10 w-full h-full object-contain pointer-events-none"
              preserveAspectRatio="xMidYMax meet"
            >
              <defs>
                {/* Skin tone gradients */}
                <linearGradient id="skinBase" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C98A5B" />
                  <stop offset="100%" stopColor="#A8693E" />
                </linearGradient>
                <linearGradient id="skinHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DC9E6E" />
                  <stop offset="100%" stopColor="#BA7B4E" />
                </linearGradient>
                <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#252427" />
                  <stop offset="40%" stopColor="#151417" />
                  <stop offset="100%" stopColor="#0B0B0C" />
                </linearGradient>
                <linearGradient id="glassesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E2D4B7" />
                  <stop offset="50%" stopColor="#FFF2D6" />
                  <stop offset="100%" stopColor="#9C8B6E" />
                </linearGradient>
                <linearGradient id="glassGlare" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                  <stop offset="60%" stopColor="rgba(182,0,168,0.15)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                </linearGradient>
                {/* Lilac/Lavender T-shirt matching his photo */}
                <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C4B5DC" />
                  <stop offset="45%" stopColor="#AD9EC4" />
                  <stop offset="100%" stopColor="#8979A3" />
                </linearGradient>
              </defs>

              {/* 1. LILAC T-SHIRT (CHEST & SHOULDERS) */}
              <path
                d="M 60 490 C 70 385, 120 345, 160 330 L 240 330 C 280 345, 330 385, 340 490 Z"
                fill="url(#shirtGrad)"
              />
              {/* T-Shirt collar ribbing */}
              <path
                d="M 160 330 C 180 355, 220 355, 240 330 C 230 365, 170 365, 160 330 Z"
                fill="#9484AC"
              />
              {/* Subtle "T R V L" tonal texture on shirt */}
              <text
                x="200"
                y="410"
                textAnchor="middle"
                fill="rgba(255,255,255,0.18)"
                fontSize="22"
                fontWeight="800"
                letterSpacing="10"
                fontFamily="sans-serif"
              >
                TRVL
              </text>

              {/* 2. NECK */}
              <path
                d="M 172 265 L 172 340 C 190 350, 210 350, 228 340 L 228 265 Z"
                fill="#A26339"
              />

              {/* 3. HEAD & JAW */}
              <path
                d="M 145 155 C 145 90, 255 90, 255 155 C 255 235, 235 285, 200 285 C 165 285, 145 235, 145 155 Z"
                fill="url(#skinBase)"
              />
              {/* Cheek highlight */}
              <ellipse cx="165" cy="200" rx="14" ry="10" fill="url(#skinHighlight)" opacity="0.6" />
              <ellipse cx="235" cy="200" rx="14" ry="10" fill="url(#skinHighlight)" opacity="0.6" />

              {/* 4. EARS */}
              <ellipse cx="143" cy="195" rx="9" ry="18" fill="#B37346" />
              <ellipse cx="257" cy="195" rx="9" ry="18" fill="#B37346" />
              {/* Small silver stud in left earlobe */}
              <circle cx="258" cy="206" r="2.2" fill="#E2E8F0" />

              {/* 5. STYLED DARK HAIR (MODERN FADE & VOLUME ON TOP) */}
              <path
                d="M 135 150 C 130 115, 150 70, 185 62 C 215 55, 260 70, 265 110 C 267 135, 262 165, 258 175 C 252 145, 245 125, 230 120 C 200 110, 165 125, 145 150 Z"
                fill="url(#hairGrad)"
              />
              {/* Hair volume texture waves */}
              <path
                d="M 170 65 Q 200 50 230 68 Q 255 85 260 115 C 250 95, 225 80, 195 82 Q 175 83 170 65 Z"
                fill="#323038"
              />

              {/* 6. EYEBROWS */}
              <path
                d="M 158 165 Q 175 160 188 166"
                stroke="#1A181C"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 212 166 Q 225 160 242 165"
                stroke="#1A181C"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />

              {/* 7. WARM SMILING EYES */}
              {/* Left Eye */}
              <path
                d="M 160 178 Q 173 171 186 178 Q 173 186 160 178 Z"
                fill="#FFFFFF"
              />
              <circle cx="173" cy="177" r="5" fill="#241408" />
              <circle cx="174.5" cy="175.5" r="1.5" fill="#FFFFFF" />

              {/* Right Eye */}
              <path
                d="M 214 178 Q 227 171 240 178 Q 227 186 214 178 Z"
                fill="#FFFFFF"
              />
              <circle cx="227" cy="177" r="5" fill="#241408" />
              <circle cx="228.5" cy="175.5" r="1.5" fill="#FFFFFF" />

              {/* 8. NOSE */}
              <path
                d="M 198 174 L 196 212 Q 193 218 200 219 Q 207 218 204 212 Z"
                fill="#94572E"
                opacity="0.75"
              />

              {/* 9. SLIGHT MUSTACHE (NEAT TRIM AS IN PHOTO) */}
              <path
                d="M 180 230 Q 192 227 198 231 Q 202 227 220 230 Q 203 237 198 233 Q 193 237 180 230 Z"
                fill="#18151A"
              />

              {/* 10. GENUINE WIDE SMILE EXPRESSION */}
              {/* Mouth outer shape */}
              <path
                d="M 174 238 C 182 240, 218 240, 226 238 C 224 256, 176 256, 174 238 Z"
                fill="#5E161B"
              />
              {/* Bright white smiling upper teeth */}
              <path
                d="M 177 239 C 185 241, 215 241, 223 239 C 221 247, 179 247, 177 239 Z"
                fill="#FFFFFF"
              />
              {/* Warm smile crease lines */}
              <path
                d="M 166 230 Q 170 238 174 245"
                stroke="#8A4A24"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 234 230 Q 230 238 226 245"
                stroke="#8A4A24"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* 11. RECTANGULAR WIREFRAME GLASSES */}
              {/* Left Rim */}
              <rect
                x="154"
                y="166"
                width="36"
                height="24"
                rx="6"
                fill="url(#glassGlare)"
                stroke="url(#glassesGrad)"
                strokeWidth="2.5"
              />
              {/* Right Rim */}
              <rect
                x="210"
                y="166"
                width="36"
                height="24"
                rx="6"
                fill="url(#glassGlare)"
                stroke="url(#glassesGrad)"
                strokeWidth="2.5"
              />
              {/* Glasses Bridge */}
              <path
                d="M 190 173 Q 200 170 210 173"
                stroke="url(#glassesGrad)"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Left and Right Temples */}
              <line x1="154" y1="172" x2="142" y2="182" stroke="url(#glassesGrad)" strokeWidth="2.2" />
              <line x1="246" y1="172" x2="258" y2="182" stroke="url(#glassesGrad)" strokeWidth="2.2" />
            </svg>

            {/* Bottom blend */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10" />
          </div>
        )}

        {/* DRAG-AND-DROP OVERLAY PROMPT */}
        {isDraggingOver && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-4 text-center border-2 border-dashed border-[#B600A8]">
            <Upload className="h-10 w-10 text-[#B600A8] animate-bounce mb-2" />
            <p className="text-sm font-semibold uppercase tracking-wider text-white">
              Drop Photo Here
            </p>
            <p className="text-xs text-[#BBCCD7]/70 mt-1">
              Supports IMG_20241208_141857.jpg or any portrait
            </p>
          </div>
        )}

        {/* CAMERA / UPLOAD ACTION BUTTON */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Upload or change with your photo (e.g. IMG_20241208_141857.jpg)"
          className="absolute top-2.5 right-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-105 hover:border-[#B600A8] hover:bg-[#B600A8]/20 cursor-pointer shadow-md active:scale-95"
          aria-label="Upload photo"
        >
          <Camera className="h-3.5 w-3.5 text-[#D7E2EA]" />
        </button>
      </div>

      {/* QUICK FLOATING PHOTO CONTROLLER PILL */}
      <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 z-20">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#D7E2EA] backdrop-blur-md transition-all hover:border-[#B600A8] hover:bg-white/10 hover:text-white cursor-pointer active:scale-95"
        >
          <Upload className="h-3 w-3 text-[#B600A8]" />
          <span>{photoUrl ? "Replace Photo" : "Upload Photo"}</span>
        </button>

        {photoUrl && (
          <button
            type="button"
            onClick={() => setShowControls(!showControls)}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-[#BBCCD7] hover:text-white transition-colors"
          >
            <span>Adjust</span>
          </button>
        )}

        {photoUrl && (
          <button
            type="button"
            onClick={resetToDefault}
            title="Reset to default smiling portrait"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#BBCCD7] hover:text-white transition-colors"
          >
            <RefreshCw className="h-2.5 w-2.5" />
          </button>
        )}
      </div>

      {/* FINE ADJUSTMENT DRAWER (ZOOM & POSITION) */}
      <AnimatePresence>
        {showControls && photoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#141414]/95 px-4 py-2 text-xs text-[#D7E2EA] backdrop-blur-md shadow-xl z-20 font-mono"
          >
            <span className="text-[10px] text-white/50">ZOOM</span>
            <button
              type="button"
              onClick={() => adjustZoom(-0.1)}
              className="p-1 hover:text-white rounded bg-white/5"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="text-xs">{zoom.toFixed(1)}x</span>
            <button
              type="button"
              onClick={() => adjustZoom(0.1)}
              className="p-1 hover:text-white rounded bg-white/5"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>

            <span className="h-3 w-[1px] bg-white/10 mx-1" />

            <span className="text-[10px] text-white/50">POS</span>
            <button
              type="button"
              onClick={() => adjustOffsetY(-8)}
              className="px-1.5 py-0.5 hover:text-white rounded bg-white/5 text-[10px]"
            >
              ▲
            </button>
            <button
              type="button"
              onClick={() => adjustOffsetY(8)}
              className="px-1.5 py-0.5 hover:text-white rounded bg-white/5 text-[10px]"
            >
              ▼
            </button>

            <button
              type="button"
              onClick={() => setShowControls(false)}
              className="ml-1 text-[10px] text-emerald-400 hover:underline"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST FEEDBACK NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-12 z-30 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/90 px-4 py-1.5 text-xs text-emerald-200 shadow-2xl backdrop-blur-md"
          >
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
