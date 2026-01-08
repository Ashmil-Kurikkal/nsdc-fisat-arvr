import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Layers } from 'lucide-react';
import Section from '../../../components/layout/Section';
import LiquidGlass from '../../../components/ui/LiquidGlass';
import { fadeInUp } from '../../../components/ui/utils/Animations';

// Placeholder Data
const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80&w=800", alt: "VR Headset Display", category: "Hardware" },
  { id: 2, src: "https://www.spsec.co.in/wp-content/uploads/2022/09/Virtual_Reality_and_Augmented_Reality_en.jpeg", alt: "Lab Workspace", category: "Environment" },
  { id: 3, src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800", alt: "Coding Session", category: "Events" },
  { id: 4, src: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&q=80&w=800", alt: "Cyberpunk Setup", category: "Showcase" },
  { id: 5, src: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800", alt: "Circuit Board", category: "Hardware" },
  { id: 6, src: "https://diggrowth.com/wp-content/uploads/2024/02/AI-Data-Visualization-Tool_-Improve-Your-Insights.png", alt: "AI Visualization", category: "Research" },
];

const Gallery = ({ setHideNav }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  // 1. Control the Navbar visibility
  useEffect(() => {
    if (setHideNav) {
      setHideNav(!!selectedImg);
    }
  }, [selectedImg, setHideNav]);

  // 2. Handle Browser History & Scroll Locking
  useEffect(() => {
    const handlePopState = () => {
      setSelectedImg(null);
    };

    if (selectedImg) {
      document.body.style.overflow = 'hidden';
      window.history.pushState({ galleryOpen: true }, "");
      window.addEventListener('popstate', handlePopState);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImg]);

  // 3. Manual Close Handler
  const handleClose = (e) => {
    e?.stopPropagation(); 
    window.history.back();
  };

  return (
    <Section id="gallery">
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4"
        variants={fadeInUp}
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Lab <span className="text-slate-500">Moments</span>
          </h2>
          <p className="text-slate-600 mt-2 text-base md:text-lg max-w-xl">
            A glimpse into the daily life, workshops, and chaos at the AR/VR Lab.
          </p>
        </div>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {galleryImages.map((img) => (
          <motion.div 
            key={img.id}
            variants={fadeInUp}
            layoutId={`gallery-item-${img.id}`}
            className="group relative cursor-pointer"
            onClick={() => setSelectedImg(img)}
          >
            <LiquidGlass className="p-0 overflow-hidden h-64 md:h-72 relative border border-white/40">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn size={24} />
                </div>
              </div>

              <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/50 shadow-sm translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                 <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                    <Layers size={10} className="text-blue-500"/> {img.category}
                 </span>
              </div>
            </LiquidGlass>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose} 
          >
            <motion.div 
              className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
              layoutId={`gallery-item-${selectedImg.id}`}
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black group">
                {/* --- CLOSE BUTTON MOVED INSIDE HERE --- */}
                <button 
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-white/90 transition-all z-20 border border-white/10"
                  onClick={handleClose}
                >
                  <X size={20} />
                </button>

                <img 
                  src={selectedImg.src} 
                  alt={selectedImg.alt} 
                  className="max-h-[80vh] w-auto object-contain"
                />
              </div>
              
              <div className="mt-4 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-white">{selectedImg.alt}</h3>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs uppercase tracking-widest font-medium border border-white/5">
                  {selectedImg.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Gallery;