import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { Box, Play, Layers, Info, Users, Calendar, Mail, X, Menu } from 'lucide-react'; 
import LiquidGlass from '../../components/ui/LiquidGlass';
import Loading from '../../components/ui/Loading';
import Donut from '../../components/canvas/Donut';
import GlassButton from '../../components/ui/GlassButton';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero({ hideNav }) {
  const mouse = useRef([0, 0]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.current = [x, y];
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <div 
      className="relative w-full min-h-screen font-sans text-slate-800 overflow-x-hidden"
      onMouseMove={handleMouseMove}
      style={{ backgroundColor: '#f0f2f5' }}
    >
      {/* Backgrounds */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{background: 'radial-gradient(circle, #fffffffa 0%, #b9c3c3ff 100%)'}}
      />
      <div className="fixed inset-0 z-0 bg-white/10 backdrop-blur-[2px]" />

      {/* --- NAVIGATION --- */}
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50 p-4 lg:p-6 flex flex-col items-center
          transition-transform duration-500 ease-in-out
          ${hideNav ? '-translate-y-full' : 'translate-y-0'}
        `}
      >
        <LiquidGlass className="w-full max-w-7xl px-4 py-3 relative z-50">
          <div className="w-full flex justify-between items-center">

            {/* Logo */}
            <div className="flex items-center gap-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <Box size={22} strokeWidth={2.5} />
                </div>
                <span className="font-audiowide text-lg md:text-xl text-slate-900 tracking-tight whitespace-nowrap">
                  AR/VR LAB
                </span>
              </div>
              
              {/* Desktop Partners */}
              <div className="hidden md:block h-8 w-px bg-slate-300" />
              <div className="hidden md:flex items-center gap-4">
                <img src="./nsdc.png" alt="NSDC" className="h-14 w-auto opacity-80" />
                <img src="./Frame 2.png" alt="Partner" className="h-12 w-auto opacity-80" />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-3">
              <GlassButton onClick={() => scrollToSection('about')} className="!px-4 !py-2 text-sm"><Info size={16}/><span>About The Lab</span></GlassButton>
              <GlassButton onClick={() => scrollToSection('events')} className="!px-4 !py-2 text-sm"><Calendar size={16}/><span>Events</span></GlassButton>
              <GlassButton onClick={() => scrollToSection('gallery')} className="!px-4 !py-2 text-sm"><Layers size={16}/><span>Gallery</span></GlassButton>
              <GlassButton onClick={() => scrollToSection('staff')} className="!px-4 !py-2 text-sm"><Users size={16}/><span>The Team</span></GlassButton>
              <GlassButton onClick={() => scrollToSection('contact')} active className="!px-4 !py-2 text-sm font-bold text-black-600"><Mail size={16}/><span>Contact</span></GlassButton>
              
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-800 hover:bg-black/5 rounded-lg transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </LiquidGlass>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 p-4 lg:hidden animate-in slide-in-from-top-2 fade-in duration-200">
            <LiquidGlass className="flex flex-col gap-2 p-4 mt-2 bg-white/80 backdrop-blur-xl">
              <GlassButton onClick={() => scrollToSection('about')} className="w-full justify-center !py-3"><Info size={18} /> About</GlassButton>
              <GlassButton onClick={() => scrollToSection('staff')} className="w-full justify-center !py-3"><Users size={18} /> Staff</GlassButton>
              <GlassButton onClick={() => scrollToSection('events')} className="w-full justify-center !py-3"><Calendar size={18} /> Events</GlassButton>
              <GlassButton onClick={() => scrollToSection('contact')} active className="w-full justify-center !py-3 font-bold text-slate-600"><Mail size={18} /> Contact</GlassButton>
            </LiquidGlass>
          </div>
        )}
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-8 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Text Section: Reduced margins for mobile */}
        <div className="space-y-4 lg:space-y-6 text-center lg:text-left mt-4">
             <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
              Build, Explore, and Innovate in <span className="text-slate-500">AR & VR.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              The NSDC FISAT AR/VR Lab is a collaborative space for research, development, and experimentation in immersive technologies.
            </p>
        </div>

        {/* 3D Scene Section: Reduced height for mobile */}
        <div className="relative w-full my-6 lg:my-20" style={{ height: '400px' }}> {/* Mobile height: 400px */}
          <LiquidGlass className="w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-white/50">
            {/* Live Indicator */}
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-widest backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                Lab Inventory Online
            </div>
          
            <Suspense fallback={<Loading />}>
              <Canvas dpr={1} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={1} color="black" />
                <Environment preset="city" />
                <Donut mouse={mouse} />
              </Canvas>
              
              {/* CTA Buttons */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 pointer-events-none">
                <div className="pointer-events-auto flex gap-3 p-1.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl">
                    <GlassButton onClick={() => navigate('/inventory')} className="!py-2 !px-4 text-sm font-semibold">
                        <Box size={16} />
                        <span>View Lab Inventory</span>
                    </GlassButton>
                </div>
              </div>
            </Suspense>
          </LiquidGlass>
        </div>
      </main>
    </div>
  );
}