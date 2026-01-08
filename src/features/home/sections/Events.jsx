import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, X, ArrowRight } from 'lucide-react';
import Section from '../../../components/layout/Section';
import LiquidGlass from '../../../components/ui/LiquidGlass';
import GlassButton from '../../../components/ui/GlassButton';
import { fadeInUp } from '../../../components/ui/utils/Animations';
import eventsData from './dataforsections/EventsData';


// ==========================================
// SUB-COMPONENT: The Event Card
// ==========================================
const EventCard = ({ event, onSelect }) => {
  return (
    // min-w-[85vw] creates the "Peeking" effect on mobile
    <motion.div variants={fadeInUp} className="h-full min-w-[85vw] md:min-w-0 snap-center">
      <LiquidGlass className="h-full flex flex-col p-0 overflow-hidden group hover:ring-2 hover:ring-blue-400/30 transition-all duration-500 border border-white/40">
        
        {/* Image Container: Reduced height on mobile */}
        <div className="relative h-40 md:h-48 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/10 z-10" />
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
           {/* Date Badge */}
           <div className="absolute top-3 right-3 z-20 bg-slate-900/80 backdrop-blur-md text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1">
            <Calendar size={10} className="md:w-3 md:h-3" />
            {event.date.split(',')[0]}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow gap-3">
          <div>
             {/* Tags: Show fewer on mobile if needed */}
            <div className="flex flex-wrap gap-2 mb-2">
              {event.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-100/50 px-2 py-1 rounded-md">{tag}</span>
              ))}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{event.title}</h3>
             <div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm mt-1">
                <MapPin size={12} className="md:w-3.5 md:h-3.5" />
                <span className="truncate">{event.location}</span>
            </div>
          </div>
          
          <p className="text-slate-600 text-sm line-clamp-2 flex-grow">{event.shortDesc}</p>

          <GlassButton onClick={() => onSelect(event)} className="w-full justify-center group/btn !py-2.5 text-sm">
            <span>More Info</span>
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </GlassButton>
        </div>
      </LiquidGlass>
    </motion.div>
  );
};


// ==========================================
// SUB-COMPONENT: The Modal (Mobile Optimized)
// ==========================================
const EventModal = ({ event, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!event) return null;

  return (
    // Align items-end on mobile (bottom sheet feel), items-center on desktop
    <motion.div 
      className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="relative w-full max-w-2xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto bg-[#eef1f5] rounded-t-3xl md:rounded-3xl shadow-2xl border border-white/50"
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
         <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-all"
         >
             <X size={20} className="text-slate-700" />
         </button>

         <div className="relative h-56 md:h-80">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#eef1f5] via-transparent to-transparent" />
         </div>

         <div className="p-6 md:p-8 -mt-16 md:-mt-20 relative z-10">
            <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map(tag => (
                <span key={tag} className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-slate-700 bg-white/70 backdrop-blur-md shadow-sm px-3 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{event.title}</h2>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-8 text-slate-700 font-medium bg-white/40 p-4 rounded-xl border border-white/40">
                <div className="flex items-center gap-2">
                    <Calendar className="text-blue-500 shrink-0" size={18} />
                    <span className="text-sm md:text-base">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="text-red-500 shrink-0" size={18} />
                    <span className="text-sm md:text-base">{event.location}</span>
                </div>
            </div>

             <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
                 <p>{event.fullDesc}</p>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, ad! Nihil ea, obcaecati, impedit placeat quod sint.</p>
             </div>

             <div className="mt-8 pt-6 border-t border-slate-200 sticky bottom-0 bg-[#eef1f5]/95 backdrop-blur pb-4">
                 <GlassButton className="w-full justify-center text-base md:text-lg !py-3 font-bold">
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
    if (setHideNav) {
      setHideNav(!!selectedEvent);
    }
  }, [selectedEvent, setHideNav]);

  return (
    <Section id="events">
       <motion.div 
        className="flex flex-col md:flex-row justify-between items-end mb-6 gap-2"
        variants={fadeInUp}
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Upcoming Events</h2>
          <p className="text-slate-600 mt-2 text-base md:text-lg">Join us in the physical and digital realms.</p>
        </div>
      </motion.div>

      {/* MOBILE: Horizontal Scroll (App-like) 
         DESKTOP: Grid (Web-like) 
      */}
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-visible gap-4 pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 snap-x no-scrollbar">
        {eventsData.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onSelect={setSelectedEvent} 
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedEvent && (
            <EventModal event={selectedEvent} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Events;