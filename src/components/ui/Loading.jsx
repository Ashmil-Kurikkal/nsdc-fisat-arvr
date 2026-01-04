import React from 'react';
import LiquidGlass from './LiquidGlass';

const Loading = () => (
  <div className="w-full h-full flex flex-col items-center justify-center animate-pulse">
    <LiquidGlass className="p-8 flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-black-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-slate-600 font-medium tracking-widest text-sm">Initializing the iconic donut!</span>
    </LiquidGlass>
  </div>
);

export default Loading;