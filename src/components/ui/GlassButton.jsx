import React from 'react';

const GlassButton = ({ children, active, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative px-6 py-3 rounded-xl 
        border border-white/40 
        backdrop-blur-md 
        transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
        shadow-lg shadow-black/5
        ${active 
          ? 'bg-white/60 text-black-600 border-white/60 shadow-black-500/20' 
          : 'bg-white/20 text-slate-700 hover:bg-white/40 hover:shadow-black-500/10'}
        ${className}
      `}
    >
      {/* Glossy Reflection Overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 font-semibold tracking-wide">
        {children}
      </span>
    </button>
  );
};

export default GlassButton;