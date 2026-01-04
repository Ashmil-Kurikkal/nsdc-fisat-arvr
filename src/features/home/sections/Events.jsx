import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, X, ArrowRight } from 'lucide-react';
import Section from '../../../components/layout/Section';
import LiquidGlass from '../../../components/ui/LiquidGlass';
import GlassButton from '../../../components/ui/GlassButton';
import { fadeInUp } from '../../../components/ui/utils/Animations';
import eventsData from './dataforsections/EventsData';


// ==========================================
// SUB-COMPONENT: The Event Card (Grid Item)
// ==========================================
const EventCard = ({ event, onSelect }) => {
  return (
    <motion.div variants={fadeInUp} className="h-full">
      <LiquidGlass className="h-full flex flex-col p-0 overflow-hidden group hover:ring-2 hover:ring-blue-400/30 transition-all duration-500">
        {/* Image Container with Zoom Effect */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/20 z-10 transition-opacity group-hover:opacity-0" />
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
           {/* Date Badge */}
           <div className="absolute top-4 right-4 z-20 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Calendar size={12} />
            {event.date.split(',')[0]}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow gap-4">
          <div>
             {/* Tags */}
            <div className="flex gap-2 mb-3">
              {event.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-100/50 px-2 py-1 rounded-md">{tag}</span>
              ))}
            </div>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">{event.title}</h3>
             <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                <MapPin size={14} />
                <span className="truncate">{event.location}</span>
            </div>
          </div>
          
          <p className="text-slate-600 text-sm line-clamp-2 flex-grow">{event.shortDesc}</p>

          <GlassButton onClick={() => onSelect(event)} className="w-full justify-center group/btn">
            <span>More Info</span>
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </GlassButton>
        </div>
      </LiquidGlass>
    </motion.div>
  );
};


// ==========================================
// SUB-COMPONENT: The Modal (Popup)
// ==========================================
const EventModal = ({ event, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Cleanup function to restore scroll when modal closes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!event) return null;

  // Modal Animation Variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { delay: 0.2 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 }
    },
    exit: { opacity: 0, y: 50, scale: 0.95 }
  };

  return (
    // Backdrop
    <motion.div 
      className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose} // Close when clicking outside
    >
      {/* Modal Content Card */}
      <motion.div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#eef1f5] rounded-3xl shadow-2xl border border-white/50 "
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
         {/* Close Button */}
         <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white hover:rotate-90 transition-all duration-300"
         >
             <X size={20} className="text-slate-700" />
         </button>

         {/* Hero Image */}
         <div className="relative h-64 sm:h-80">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#eef1f5] to-transparent" />
         </div>

         {/* Content Body */}
         <div className="p-8 -mt-20 relative z-10">
             {/* Tags */}
            <div className="flex gap-2 mb-4">
                {event.tags.map(tag => (
                <span key={tag} className="text-xs uppercase tracking-wider font-bold text-slate-700 bg-white/70 backdrop-blur-md shadow-sm px-3 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{event.title}</h2>

            {/* Meta Data Flex Container */}
            <div className="flex flex-wrap gap-6 mb-8 text-slate-700 font-medium bg-white/40 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                    <Calendar className="text-blue-500" size={20} />
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="text-red-500" size={20} />
                    <span>{event.location}</span>
                </div>
            </div>

             {/* Description */}
             <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                 <p>{event.fullDesc}</p>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, ad! Nihil ea, obcaecati, impedit placeat quod sint, sapiente magnam reiciendis architecto ipsum dolor sit amet.</p>
             </div>

             {/* CTA Footer */}
             <div className="mt-10 pt-6 border-t border-slate-200">
                 <GlassButton className="w-full sm:w-auto justify-center text-lg !py-3">
                    Register Now
                 </GlassButton>
             </div>
         </div>
      </motion.div>
    </motion.div>
  );
};


// ==========================================
// MAIN COMPONENT
// ==========================================
const Events = ({ setHideNav }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCloseModal = () => setSelectedEvent(null);


  useEffect(() => {
    // If setHideNav exists, update it based on whether an event is selected
    if (setHideNav) {
      setHideNav(!!selectedEvent); // true if event is selected, false if null
    }
  }, [selectedEvent, setHideNav]);

  return (
    <Section id="events">
       {/* Section Header */}
       <motion.div 
        className="flex flex-col md:flex-row justify-between items-end mb-4 gap-4"
        variants={fadeInUp}
      >
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900">Upcoming Events</h2>
          <p className="text-slate-600 mt-2 text-lg">Join us in the physical and digital realms.</p>
        </div>
      </motion.div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventsData.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onSelect={setSelectedEvent} 
          />
        ))}
      </div>

      {/* Modal Portal System */}
      {/* AnimatePresence ensures the exit animation plays before the component unmounts */}
      <AnimatePresence>
        {selectedEvent && (
            <EventModal event={selectedEvent} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Events;