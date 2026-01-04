import React from 'react';
import { motion } from 'framer-motion'; 
import Section from '../../../components/layout/Section';
import LiquidGlass from '../../../components/ui/LiquidGlass';
import { Target, Lightbulb, Zap, Box, ArrowUpRight } from 'lucide-react';
import { fadeInUp } from '../../../components/ui/utils/Animations';
import GlassButton from '../../../components/ui/GlassButton';
import { useNavigate } from 'react-router-dom';

const About = () => {
  // 1. Initialize the hook here
  const navigate = useNavigate();

  return (
    <Section id="about">
      {/* Header Text */}
      <motion.div className="text-center space-y-4 mb-8" variants={fadeInUp}>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          About <span className="text-slate-500">The Lab</span>
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          The NSDC FISAT AR/VR Lab aims to bring you the best in AR/VR technology. The Lab is equipped with the latest technologies and equipments in the field of AR/VR, for interested students and researchers to explore and learn.
          Remember, we all started from a 3D model of the Donut, and we are here to make it better.
        </p>
      </motion.div>

      {/* Grid of Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Target, title: "Mission", desc: "To provide a platform for students and researchers to explore and learn about AR/VR technology." },
          { icon: Lightbulb, title: "Vision", desc: "To provide a platform for students and researchers to explore and learn about AR/VR technology." },
          { icon: Zap, title: "Vision", desc: "To provide a platform for students and researchers to explore and learn about AR/VR technology." }
        ].map((item, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <LiquidGlass className="h-full p-8 flex flex-col items-center text-center gap-4 hover:bg-white/100 transition-colors relative overflow-visible">
              
              <div className="-mt-16 p-4 w-16 h-16 bg-slate-900 rounded-full text-white shadow-lg flex justify-center items-center">
                <item.icon size={24} />
              </div>

              <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </LiquidGlass>
          </motion.div>
        ))}
        
        {/* 2. Fix the layout and the onClick handler */}
        {/* Note: In a 3-column grid, this button will sit on a new row alone. 
            You might want to span it across columns or take it out of the grid div if that wasn't intended. */}
        <motion.div className="md:col-span-3 flex justify-center mt-6" variants={fadeInUp}>
          <GlassButton onClick={() => navigate("/inventory")}>
            <Box />
            View Lab Equipments
            <ArrowUpRight />
          </GlassButton>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;