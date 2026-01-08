import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { INVENTORY_DATA, categories } from "./assets/data";
import { PRODUCT_LINKS } from "./assets/links";
import { Layers, Cpu, ChevronRight, ExternalLink, ShoppingBag, Globe, Info, List, Link as LinkIcon } from "lucide-react";
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
    <div className="relative w-full h-[100dvh] flex flex-col bg-neutral-900 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* --- CSS STYLES --- */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .styled-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.2) transparent; }
        .styled-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
        .styled-scrollbar::-webkit-scrollbar-track { background: transparent; margin: 0 4px; }
        .styled-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.2); border-radius: 20px; }
      `}</style>

      {/* --- BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[150px]" />
      </div>

      {/* --- HEADER --- */}
      <div className="relative z-50 flex flex-col md:flex-row items-center justify-between px-4 pt-4 pb-2 md:p-6 gap-4 shrink-0">
        <div className="flex items-center justify-between w-full md:w-auto">
             <div className="flex items-center gap-3">
                <GlassPanel className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all group">
                    <button onClick={() => navigate('/')} className="text-white/70 group-hover:text-white transition-colors flex items-center justify-center w-full h-full">
                        <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                </GlassPanel>
                <h1 className="text-white text-lg md:text-2xl font-audiowide tracking-wider opacity-90 whitespace-nowrap">
                    Inventory
                </h1>
            </div>
            
            {isMobile && (
                <div className="text-white/50 text-xs font-mono border border-white/10 px-2 py-1 rounded-md">
                    {activeCategory}
                </div>
            )}
        </div>

        <div className={`w-full md:flex-1 min-w-0 flex justify-start md:justify-end ${isMobile ? 'overflow-x-auto pb-2' : ''}`}>
            <div className={`${isMobile ? 'flex gap-2' : 'overflow-x-scroll styled-scrollbar pb-4 max-w-full'}`}>
                <GlassPanel className={`w-max flex flex-row gap-1 p-1 rounded-full ${isMobile ? 'bg-transparent border-0 shadow-none' : ''}`}>
                    {categories.map((cat) => (
                        <button
                        key={cat}
                        onClick={() => { setActiveCategory(cat); setActiveItem(null); }}
                        className={`
                            px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-medium transition-all duration-300 whitespace-nowrap
                            ${activeCategory === cat 
                            ? "bg-white text-black shadow-lg scale-105" 
                            : "text-white/60 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white"}
                        `}
                        >
                        {cat}
                        </button>
                    ))}
                </GlassPanel>
            </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      {/* FIX: Changed overflow-hidden to overflow-y-auto on mobile (lg:overflow-hidden restores desktop behavior) */}
      <div className="relative pt-10 z-10 flex-1 flex flex-col items-center w-full max-w-[1600px] mx-auto px-4 pb-32 md:pb-40 overflow-y-auto lg:overflow-hidden scroll-smooth hide-scrollbar">
        
        {/* FIX: Removed h-full, used min-h-full so content can grow vertically on mobile */}
        <div className="flex flex-col lg:flex-row items-center justify-start lg:justify-center gap-6 w-full h-auto lg:h-full mt-4 lg:mt-7">
            
            {/* LEFT WING (Specs - Desktop) */}
            {!isMobile && (
                <AnimatePresence mode="wait">
                {activeItem && (
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
            )}

            {/* CENTER VIEWER (Canvas) */}
            {/* FIX: Added shrink-0 so it doesn't get squashed, and adjusted mobile height */}
            <GlassPanel className={`
                relative z-20 overflow-hidden shrink-0 transition-all duration-500
                w-full max-w-[500px] lg:max-w-[700px] 
                ${isMobile ? 'h-[350px] rounded-[24px]' : 'h-[500px] rounded-[48px]'}
            `}>
                <div className="absolute top-0 left-0 w-full p-6 lg:p-8 z-10 pointer-events-none">
                   <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight drop-shadow-lg truncate pr-4">
                    {activeItem ? activeItem.name : "Select an Item"}
                   </h2>
                   {!isMobile && (
                        <p className="text-xs lg:text-sm text-white/60 font-medium tracking-widest uppercase mt-1">
                            {activeCategory}
                        </p>
                   )}
                </div>

                <div className="absolute inset-0 w-full h-full">
                  <Canvas gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={isMobile ? 45 : 35} />
                    <ambientLight intensity={0.7} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <Environment preset="city" blur={1} />
                    <group position={[0, isMobile ? -0.2 : -0.5, 0]} scale={isMobile ? 0.85 : 1}>
                      <HoloCard
                        img={activeItem ? activeItem.texturePath : filteredItems[0]?.texturePath}
                        isActive={!!activeItem}
                      />
                    </group>
                    <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="black" />
                  </Canvas>
                </div>
            </GlassPanel>

            {/* RIGHT WING (Description - Desktop) */}
            {!isMobile && (
                <AnimatePresence mode="wait">
                {activeItem && (
                    <motion.div
                    initial={{ opacity: 0, x: -50, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: 300 }}
                    exit={{ opacity: 0, x: -50, width: 0 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    className="hidden lg:block h-[420px] overflow-hidden shrink-0"
                    >
                    <GlassPanel className="h-full w-[280px] p-6 rounded-3xl flex flex-col bg-black/20 ml-auto">
                        <DescriptionContent item={activeItem} />
                    </GlassPanel>
                    </motion.div>
                )}
                </AnimatePresence>
            )}

            {/* MOBILE: UNIFIED INFO PANEL */}
            {isMobile && activeItem && (
                 <MobileDetailView item={activeItem} />
            )}
        </div>
      </div>

      {/* --- DOCK --- */}
      <div className="fixed bottom-4 left-0 w-full flex justify-center z-50 px-2 pointer-events-none">
        <GlassPanel className="
            pointer-events-auto 
            rounded-3xl 
            flex items-center 
            max-w-full shadow-2xl
            gap-3
            px-3 py-3
            overflow-x-auto hide-scrollbar
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

// --- UPDATED COMPONENT: Mobile Detail View (Scroll Fix) ---
const MobileDetailView = ({ item }) => {
    const [tab, setTab] = useState("info"); // info | specs
    const links = PRODUCT_LINKS[item.id];

    return (
        // FIX: Removed flex-1 and min-h, allowed h-auto so it expands fully. 
        // Added mb-8 to give a little extra space before the dock padding area.
        <GlassPanel className="w-full h-auto flex flex-col rounded-t-[30px] rounded-b-[24px] overflow-hidden animate-in slide-in-from-bottom-4 duration-500 border-t-white/30 mb-4 shrink-0">
            {/* Tabs Header */}
            <div className="flex p-1 bg-black/20 m-3 rounded-xl shrink-0">
                <button 
                    onClick={() => setTab("info")}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${tab === 'info' ? 'bg-white text-black shadow-sm' : 'text-white/50 hover:text-white'}`}
                >
                    <Info size={14} /> Overview
                </button>
                <button 
                    onClick={() => setTab("specs")}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${tab === 'specs' ? 'bg-white text-black shadow-sm' : 'text-white/50 hover:text-white'}`}
                >
                    <List size={14} /> Specs
                </button>
            </div>

            {/* FIX: Removed overflow-y-auto and fixed height. It now renders full length text. */}
            <div className="px-5 pb-5">
                <AnimatePresence mode="wait">
                    {tab === "info" ? (
                        <motion.div 
                            key="info"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            <p className="text-sm leading-relaxed text-white/90 font-light">
                                {item.description}
                            </p>
                            
                            {/* Mobile Links Block */}
                            {links && (
                                <div className="pt-4 border-t border-white/10">
                                     {links.main && (
                                        <a href={links.main} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-400/30 text-blue-100 rounded-xl transition-all">
                                            <ShoppingBag size={16} /> <span className="text-sm font-bold">View Product</span>
                                        </a>
                                     )}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="specs"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className="mb-4 flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                                <div className={`w-3 h-3 rounded-full ${item.unitsAvailable > 0 ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-red-400'}`} />
                                <span className="text-white font-bold">{item.unitsAvailable} Units in Lab</span>
                            </div>
                            <ul className="space-y-2">
                                {item.specs.map((spec, i) => (
                                    <li key={i} className="text-sm text-white/70 py-2 border-b border-white/5 flex items-start gap-2">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                                        {spec}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </GlassPanel>
    );
};

// ... Rest of the component (SpecsContent, DescriptionContent, DockItem) stays the same ...
// (Make sure to include the unchanged components below this when you use it)
// --- SUB COMPONENTS (Desktop Versions) ---

const SpecsContent = ({ item }) => (
    <div className="flex flex-col h-full justify-center">
        <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/50 font-medium uppercase tracking-wider">
                In Stock
            </span>
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.unitsAvailable > 0 ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-red-400'}`} />
                <span className="text-lg font-bold text-white font-audiowide">
                    {item.unitsAvailable < 10 ? `0${item.unitsAvailable}` : item.unitsAvailable}
                </span>
            </div>
        </div>

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

const DescriptionContent = ({ item }) => {
    const links = PRODUCT_LINKS[item.id];
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto styled-scrollbar pr-2">
                <div className="flex items-center gap-2 mb-4 text-purple-300">
                    <Layers size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Description</span>
                </div>
                <p className="text-sm leading-relaxed text-white/80 font-light">
                    {item.description}
                </p>
            </div>

            {links && (
                <div className="mt-4 pt-4 border-t border-white/10 shrink-0">
                    <div className="flex flex-col gap-2">
                        {links.main && (
                            <a href={links.main} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-xl transition-all duration-300 group">
                                <span className="text-xs font-bold flex items-center gap-2">
                                    <ShoppingBag size={14} className="text-white/60 group-hover:text-black" />
                                    View Product
                                </span>
                                <ExternalLink size={12} className="opacity-50 group-hover:opacity-100" />
                            </a>
                        )}
                        {/* Compact secondary links */}
                        <div className="flex flex-wrap gap-1">
                             {/* ... logic for other links ... */}
                             {Object.entries(links.regions || {}).map(([region, url]) => (
                                <a key={region} href={url} target="_blank" className="text-[9px] px-2 py-1 bg-white/5 rounded text-white/50">{region}</a>
                             ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

function DockItem({ item, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative group flex-shrink-0
        flex flex-col items-center justify-center
        transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        ${isActive ? "-translate-y-2 z-10" : "hover:-translate-y-1"} 
      `}
    >
      <div className={`
        w-12 h-12 rounded-2xl 
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
        <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />
      )}
    </button>
  );
}