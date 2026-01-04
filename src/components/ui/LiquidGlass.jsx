import React from 'react';

const LiquidGlass = ({ children, className = "", hoverEffect = false }) => {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-white/30 backdrop-blur-xl 
        border border-white/40 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
        rounded-2xl
        transition-all duration-300 ease-out
        ${hoverEffect ? 'hover:scale-[1.02] hover:bg-white/40 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default LiquidGlass;