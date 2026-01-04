import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SequentialVideoLoop = ({ videoSources = [], product = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle switching to the next video
  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  return (
    <section className="w-full py-24 bg-white flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative w-full max-w-7xl aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-gray-900"
      >
      <h4 className="absolute bottom-9 left-10 right-10 text-white text-xl font-bebas-neue">{product[currentIndex]}</h4>
      <h4 className="absolute bottom-15 left-10 right-10 text-white text-xl font-bebas-neue">Work with state of the art VR equipments</h4>
        {/* AnimatePresence allows for crossfading between videos if desired */}
        <AnimatePresence mode='wait'>
          <motion.video
            // Key is crucial: it forces React to remount the element when index changes
            key={currentIndex} 
            
            // Optional: Crossfade animation entering/exiting
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}

            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            
            // The magic happens here:
            onEnded={handleVideoEnd}
          >
            <source src={videoSources[currentIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        </AnimatePresence>

        {/* Optional: Indicator Dots to show which video is playing */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {videoSources.map((_, idx) => (
            <div 
              key={idx}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-white w-6' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SequentialVideoLoop;