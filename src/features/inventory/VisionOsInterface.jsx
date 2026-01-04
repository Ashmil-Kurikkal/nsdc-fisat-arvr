import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { INVENTORY_DATA, categories } from "./assets/data";
import { Layers, Cpu, ChevronRight } from "lucide-react";
import HoloCard from "./components/HoloCard.jsx";
import { useNavigate } from "react-router-dom";

// --- REUSABLE GLASS COMPONENT ---
const GlassPanel = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`
    bg-white/10 backdrop-blur-2xl 
    border border-white/20 
    shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
    ${className}
  `}>
    {children}
  </div>
);

export default function VisionOSInterface() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeItem, setActiveItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredItems = useMemo(
    () => INVENTORY_DATA.filter((i) => i.category === activeCategory),
    [activeCategory]
  );

  useEffect(() => {
    if (filteredItems.length > 0 && !activeItem) {
        setActiveItem(filteredItems[0]);
    }
  }, [filteredItems, activeItem]);

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-neutral-900 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* --- CSS TO HIDE SCROLLBAR --- */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* --- BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[150px]" />
      </div>

      {/* --- FIXED HEADER --- */}
      <div className="relative z-50 flex flex-col md:flex-row items-center justify-between px-6 py-6 gap-6 w-full max-w-[1800px] mx-auto">
        
        {/* 1. Title Section (Fixed Width) */}
        <div className="flex items-center gap-4 shrink-0 self-start md:self-center">
            <GlassPanel className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all group">
                <button onClick={() => navigate('/')} className="text-white/70 group-hover:text-white transition-colors flex items-center justify-center w-full h-full">
                    <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
            </GlassPanel>
            <h1 className="text-white text-xl md:text-2xl font-audiowide tracking-wider opacity-90 whitespace-nowrap">
                Lab Inventory
            </h1>
        </div>

        {/* 2. Category Tabs (Flexible & Scrollable) */}
        {/* 'min-w-0' prevents flex child from forcing overflow */}
        <div className="w-full md:flex-1 min-w-0 flex justify-start md:justify-end">
            <GlassPanel className="p-1.5 rounded-full flex flex-row gap-1 overflow-x-auto hide-scrollbar max-w-full">
                {categories.map((cat) => (
                    <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setActiveItem(null); }}
                    className={`
                        px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap
                        ${activeCategory === cat 
                        ? "bg-white text-black shadow-lg" 
                        : "text-white/60 hover:bg-white/10 hover:text-white"}
                    `}
                    >
                    {cat}
                    </button>
                ))}
            </GlassPanel>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-[1600px] mx-auto p-4 pb-40">
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full">
            
            {/* LEFT WING (Specs) */}
            <AnimatePresence mode="wait">
              {activeItem && !isMobile && (
                <motion.div
                  initial={{ opacity: 0, x: 50, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 300 }}
                  exit={{ opacity: 0, x: 50, width: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                  className="hidden lg:block h-[420px] overflow-hidden shrink-0"
                >
                  <GlassPanel className="h-full w-[280px] p-6 rounded-3xl flex flex-col justify-center bg-black/20 mr-auto">
                    <SpecsContent item={activeItem} />
                  </GlassPanel>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CENTER VIEWER */}
            <GlassPanel className="
                relative z-20 overflow-hidden shrink-0
                w-full max-w-[500px] lg:max-w-[700px] 
                h-[400px] lg:h-[500px] 
                rounded-[30px] lg:rounded-[48px]
            ">
                <div className="absolute top-0 left-0 w-full p-6 lg:p-8 z-10 pointer-events-none">
                   <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight drop-shadow-lg">
                    {activeItem ? activeItem.name : "Select an Item"}
                   </h2>
                   <p className="text-xs lg:text-sm text-white/60 font-medium tracking-widest uppercase mt-1">
                    {activeCategory}
                   </p>
                </div>

                <div className="absolute inset-0 w-full h-full">
                  <Canvas gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
                    <ambientLight intensity={0.7} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <Environment preset="city" blur={1} />
                    <group position={[0, -0.5, 0]}>
                      <HoloCard 
                        img={activeItem ? activeItem.texturePath : filteredItems[0]?.texturePath}
                        isActive={!!activeItem}
                      />
                    </group>
                    <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="black" />
                  </Canvas>
                </div>
            </GlassPanel>

            {/* RIGHT WING (Description) */}
            <AnimatePresence mode="wait">
              {activeItem && !isMobile && (
                <motion.div
                  initial={{ opacity: 0, x: -50, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 300 }}
                  exit={{ opacity: 0, x: -50, width: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                  className="hidden lg:block h-[420px] overflow-hidden shrink-0"
                >
                  <GlassPanel className="h-full w-[280px] p-6 rounded-3xl flex flex-col justify-center bg-black/20 ml-auto">
                    <DescriptionContent item={activeItem} />
                  </GlassPanel>
                </motion.div>
              )}
            </AnimatePresence>
        </div>

        {/* MOBILE STACK */}
        {isMobile && activeItem && (
            <div className="w-full max-w-[500px] mt-6 flex flex-col gap-4 px-2">
                 <GlassPanel className="p-6 rounded-3xl">
                    <DescriptionContent item={activeItem} />
                 </GlassPanel>
                 <GlassPanel className="p-6 rounded-3xl">
                    <SpecsContent item={activeItem} />
                 </GlassPanel>
            </div>
        )}
      </div>

      {/* --- DOCK --- */}
      <div className="fixed bottom-6 left-0 w-full flex justify-center z-50 px-4 pointer-events-none">
        <GlassPanel className="
            pointer-events-auto 
            rounded-[32px] 
            flex items-end 
            max-w-full shadow-2xl
            
            /* Spacing: Tighter on mobile, wider on desktop */
            gap-3 md:gap-4 
            px-3 md:px-3
            
            /* PADDING TRICK: 
               On mobile (scrollable), we need extra top padding (pt-5) so the 
               active item can 'jump up' inside the box without getting clipped.
               On desktop, we use standard padding (md:py-3) because it can overflow.
            */
            pb-3 pt-5 md:py-3

            /* SCROLL LOGIC: 
               Mobile = overflow-x-auto (scrolls, hides scrollbar)
               Desktop = overflow-visible (allows elements to pop outside)
            */
            overflow-x-auto hide-scrollbar md:overflow-visible 
        ">
          {filteredItems.map((item) => (
            <DockItem 
              key={item.id} 
              item={item} 
              isActive={activeItem?.id === item.id}
              onClick={() => setActiveItem(item)} 
            />
          ))}
        </GlassPanel>   
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

const SpecsContent = ({ item }) => (
    <div className="flex flex-col h-full justify-center">
        <div className="flex items-center gap-2 mb-4 text-blue-300">
            <Cpu size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Specifications</span>
        </div>
        <ul className="space-y-3">
            {item.specs.map((spec, i) => (
                <li key={i} className="text-sm font-medium text-white/80 py-2 border-b border-white/5 flex items-center justify-between">
                {spec}
                </li>
            ))}
        </ul>
    </div>
);

const DescriptionContent = ({ item }) => (
    <div className="flex flex-col h-full justify-center">
        <div className="flex items-center gap-2 mb-4 text-purple-300">
            <Layers size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Description</span>
        </div>
        <p className="text-sm leading-relaxed text-white/80 font-light">
            {item.description}
        </p>
    </div>
);

function DockItem({ item, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative group flex-shrink-0
        flex flex-col items-center justify-center
        transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        ${isActive ? "-translate-y-2 md:-translate-y-3 z-10" : "hover:-translate-y-1"} 
        {/* Added z-10 above to ensure the popped element stays on top */}
      `}
    >
      <div className={`
        w-12 h-12 md:w-14 md:h-14 rounded-2xl 
        flex items-center justify-center text-xs font-bold
        transition-all duration-300 border backdrop-blur-md overflow-hidden
        ${isActive 
           ? "bg-white text-black border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]" 
           : "bg-white/5 text-white border-white/10 hover:bg-white/20 hover:border-white/30"}
      `}>
         {item.texturePath ? (
            <div 
              className="w-full h-full bg-cover bg-center opacity-90 group-hover:opacity-100"
              style={{ backgroundImage: `url(${item.texturePath})` }}
            />
         ) : (
            <span>{item.name.slice(0, 2).toUpperCase()}</span>
         )}
      </div>
      {isActive && (
        <div className="absolute -bottom-3 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />
      )}
    </button>
  );
}