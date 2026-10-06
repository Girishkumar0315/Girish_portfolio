import React, { useRef, useState, useEffect, useCallback } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}) => {
  const magnetRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('translate3d(0px, 0px, 0px)');
  const [transition, setTransition] = useState<string>(inactiveTransition);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!magnetRef.current) return;
    const rect = magnetRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Check if cursor is within bounding rect + padding
    const isWithinRange =
      e.clientX >= rect.left - padding &&
      e.clientX <= rect.right + padding &&
      e.clientY >= rect.top - padding &&
      e.clientY <= rect.bottom + padding;

    if (isWithinRange) {
      setTransition(activeTransition);
      const moveX = distanceX / strength;
      const moveY = distanceY / strength;
      setTransform(`translate3d(${moveX}px, ${moveY}px, 0px)`);
    } else {
      setTransition(inactiveTransition);
      setTransform('translate3d(0px, 0px, 0px)');
    }
  }, [padding, strength, activeTransition, inactiveTransition]);

  const handleMouseLeaveWindow = useCallback(() => {
    setTransition(inactiveTransition);
    setTransform('translate3d(0px, 0px, 0px)');
  }, [inactiveTransition]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, [handleMouseMove, handleMouseLeaveWindow]);

  return (
    <div
      ref={magnetRef}
      style={{
        transform,
        transition,
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
};
