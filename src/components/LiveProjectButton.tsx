import React from 'react';

interface LiveProjectButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  label = "Live Project",
  onClick,
  href,
  className = "",
  icon,
}) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] transition-all duration-300 hover:bg-[#D7E2EA]/10 hover:border-white hover:text-white active:scale-95 cursor-pointer select-none whitespace-nowrap ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={classes}
      >
        <span>{label}</span>
        {icon}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
    >
      <span>{label}</span>
      {icon}
    </button>
  );
};
