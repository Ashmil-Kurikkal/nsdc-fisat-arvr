import React from 'react';
import { Box, Instagram, Linkedin, Github, Heart, MessageCircle } from 'lucide-react';

const Footer = () => {

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        }
    };
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-slate-900 text-slate-300 pt-16 pb-8 overflow-hidden">
      
      {/* Optional: Background decorative blob to tie in the theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          
          {/* 1. Brand Section */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/10">
                <Box size={22} strokeWidth={2.5} />
              </div>
              <span className="font-audiowide text-xl tracking-tight">AR/VR LAB</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Empowering the next generation of innovators with immersive technologies. 
              Explore, build, and shape the future of reality at NSDC FISAT.
            </p>
          </div>
          {/* 3. Socials / Connect */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg flex flex-row">Our Socials</h4>
            <div className="flex gap-3">
              {[Github, Linkedin, Instagram].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-sm text-slate-500 pt-2">
              Mookkannoor, Angamaly<br />Kerala, India
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

        {/* Bottom Bar: Copyright & Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          
          <p>© {currentYear} NSDC FISAT AR/VR Lab. All rights reserved.</p>
          
          <div className="flex items-center gap-1 group cursor-default">
            <span>Designed & Developed by</span>
            
            <div className="flex items-center gap-3 ml-1">
                {/* Name Link */}
                <a 
                    href="https://github.com/Ashmil-Kurikkal" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-300 font-medium hover:text-white transition-colors flex items-center gap-1"
                >
                   Ashmil Kurikkal
                   <Heart size={12} className="text-red-500 fill-red-500 group-hover:animate-bounce" />
                </a>

                {/* Vertical Divider */}
                <div className="h-3 w-px bg-white/20"></div>

                {/* Personal Links */}
                <div className="flex items-center gap-2">
                    <a href="https://www.linkedin.com/in/ashmil-kurikkal/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#0077b5] transition-colors" title="LinkedIn">
                        <Linkedin size={14} />
                    </a>
                    <a href="https://www.instagram.com/ashmilkurikkal/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#E4405F] transition-colors" title="Instagram">
                        <Instagram size={14} />
                    </a>
                    <a href="https://wa.me/918129353938" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#25D366] transition-colors" title="WhatsApp">
                        <MessageCircle size={14} />
                    </a>
                </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;