import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '../ui/utils/Animations';

const Section = ({ id, children, className = "" }) => {
  return (
    <motion.section 
      id={id} 
      className={`relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col gap-12 ${className}`}
      
      // --- Animation Triggers ---
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} // Triggers when 100px of the section is visible
    >
      {children}
    </motion.section>
  );
};

export default Section;