import React from 'react';
import { motion } from 'framer-motion';
import Section from '../../../components/layout/Section'
import LiquidGlass from '../../../components/ui/LiquidGlass';
import { fadeInUp } from '../../../components/ui/utils/Animations';

// Staff Component (Individual Card)
const StaffMember = ({ name, role }) => (
  <motion.div variants={fadeInUp}>
    <LiquidGlass className="p-4 flex items-center gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className="w-16 h-16 rounded-full bg-slate-300 overflow-hidden shadow-inner border-2 border-white/50">
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} 
          alt={name}
          className="w-full h-full object-cover" 
        />
      </div>
      <div>
        <h4 className="font-bold text-slate-900">{name}</h4>
        <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{role}</p>
      </div>
    </LiquidGlass>
  </motion.div>
);

const Staff = () => {
  return (
    <Section id="staff">
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row justify-left mb-4 gap-4"
        variants={fadeInUp}
      >
        <div>
            <h2 className="text-4xl font-extrabold text-slate-900">The Team</h2>
            <p className="text-slate-600 mt-2 text-lg">Brought to you by none other than</p>
        </div>
       
      </motion.div>
      <motion.div
        className="flex flex-col md:flex-row justify-center text-center"
        variants={fadeInUp}
      >
        <div>
            <h3 className="text-xl font-extrabold text-slate-800">The Faculty Team</h3>
        </div>
      </motion.div>
        
      {/* Student team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StaffMember name="Alex Chen" role="Lab Director" />
        <StaffMember name="Sarah Jones" role="Lead Developer" />
        <StaffMember name="Mike Ross" role="3D Artist" />
        <StaffMember name="Emily White" role="Research Fellow" />
        <StaffMember name="David Kim" role="Hardware Engineer" />
        <StaffMember name="Lisa Park" role="UI/UX Designer" />
      </div>

      <motion.div
        className="flex flex-col md:flex-row justify-center text-center"
        variants={fadeInUp}
      >
        <div>
            <h3 className="text-xl font-extrabold text-slate-800">The Student Core Team</h3>
        </div>
      </motion.div>
        
      {/* Student Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StaffMember name="Alex Chen" role="Lab Director" />
        <StaffMember name="Sarah Jones" role="Lead Developer" />
        <StaffMember name="Mike Ross" role="3D Artist" />
        <StaffMember name="Emily White" role="Research Fellow" />
        <StaffMember name="David Kim" role="Hardware Engineer" />
        <StaffMember name="Lisa Park" role="UI/UX Designer" />
      </div>
    </Section>
  );
};

export default Staff;