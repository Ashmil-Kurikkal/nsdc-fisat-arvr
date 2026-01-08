import React from 'react';
import { motion } from 'framer-motion';
import Section from '../../../components/layout/Section'
import LiquidGlass from '../../../components/ui/LiquidGlass';
import { fadeInUp } from '../../../components/ui/utils/Animations';

const StaffMember = ({ name, role }) => (
  // Added min-w-[260px] to ensure cards have width in horizontal scroll
  <motion.div variants={fadeInUp} className="min-w-[280px] md:min-w-0"> 
    <LiquidGlass className="p-4 flex items-center gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
      <div className="w-14 h-14 shrink-0 rounded-full bg-slate-300 overflow-hidden shadow-inner border-2 border-white/50">
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} 
          alt={name}
          className="w-full h-full object-cover" 
        />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 leading-tight">{name}</h4>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{role}</p>
      </div>
    </LiquidGlass>
  </motion.div>
);

const Staff = () => {
  return (
    <Section id="staff">
      {/* Tighter Mobile Header */}
      <motion.div 
        className="flex flex-col md:flex-row justify-left mb-6 gap-2 md:gap-4"
        variants={fadeInUp}
      >
        <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">The Team</h2>
            <p className="text-slate-600 mt-1 text-base md:text-lg">Brought to you by none other than</p>
        </div>
      </motion.div>

      {/* FACULTY: Horizontal Scroll on Mobile, Grid on Desktop */}
      <motion.div variants={fadeInUp} className="mb-4">
        <h3 className="text-lg font-extrabold text-slate-800 mb-3">The Faculty Team</h3>
      </motion.div>
        
      {/* MOBILE MAGIC: 
         flex + overflow-x-auto creates the swipe effect.
         snap-x + snap-start makes it lock into place.
         -mx-6 px-6 allows items to scroll edge-to-edge while keeping container padding.
      */}
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-visible gap-4 pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 snap-x no-scrollbar">
        <StaffMember name="Alex Chen" role="Lab Director" />
        <StaffMember name="Sarah Jones" role="Lead Developer" />
        <StaffMember name="Mike Ross" role="3D Artist" />
      </div>

      <motion.div variants={fadeInUp} className="mt-6 mb-4">
         <h3 className="text-lg font-extrabold text-slate-800 mb-3">The Student Core Team</h3>
      </motion.div>
        
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-visible gap-4 pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 snap-x no-scrollbar">
        <StaffMember name="Emily White" role="Research Fellow" />
        <StaffMember name="David Kim" role="Hardware Engineer" />
        <StaffMember name="Lisa Park" role="UI/UX Designer" />
        <StaffMember name="K3yb0ard" role="Developer" />
      </div>
    </Section>
  );
};

export default Staff;