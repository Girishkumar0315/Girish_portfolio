import React from 'react';

interface ContactButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  label = "Contact Me",
  onClick,
  href = "#contact",
  className = "",
}) => {
  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
    outline: '2px solid rgba(255, 255, 255, 0.85)',
    outlineOffset: '-3px',
  };

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap drop-shadow-sm">
      {label}
    </span>
  );

  const classes = `group relative inline-flex items-center justify-center rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95 cursor-pointer select-none ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        style={buttonStyle}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={buttonStyle}
      className={classes}
    >
      {content}
    </button>
  );
};
