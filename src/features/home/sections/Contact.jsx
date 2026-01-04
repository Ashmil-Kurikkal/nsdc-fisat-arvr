import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Globe, Linkedin, Github } from 'lucide-react';
import Section from '../../../components/layout/Section';
import LiquidGlass from '../../../components/ui/LiquidGlass';
import GlassButton from '../../../components/ui/GlassButton';
import { fadeInUp } from '../../../components/ui/utils/Animations';

const Contact = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    //form submission logic here
    console.log("Form submitted");
  };

  const contactInfo = [
    { 
      icon: MapPin, 
      label: "Visit The Lab", 
      value: "NSDC FISAT AR/VR Lab, Hormis Nagar, Mookkannoor, Kerala 683577" 
    },
    { 
      icon: Mail, 
      label: "Email Us", 
      value: "arvrlab@fisat.ac.in" 
    },
    { 
      icon: Phone, 
      label: "Call Us", 
      value: "+91 2255" 
    }
  ];

  return (
    <Section id="contact">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div className="text-center space-y-4 mb-12" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Get In <span className="text-slate-500">Touch</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Have an idea for a project? Want to collaborate on research? Or just want to visit the lab? 
            Drop us a message and let's build the future together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT COLUMN: Contact Info */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-slate-900 rounded-full text-white shadow-lg flex justify-center items-center">
                    <item.icon size={20} />
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-slate-900 text-lg">{item.label}</h4>
                    <p className="text-slate-600 leading-relaxed">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social / External Links */}
            <div className="pt-6 border-t border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4">Connect with us</h4>
              <div className="flex gap-4">
                {[Github, Linkedin, Globe].map((Icon, i) => (
                  <GlassButton key={i} className="!p-3">
                    <Icon size={20} />
                  </GlassButton>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div variants={fadeInUp}>
            <LiquidGlass className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                    <input 
                      type="text" 
                      placeholder="John" 
                      className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/40 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white/60 transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe" 
                      className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/40 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white/60 transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/40 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white/60 transition-all backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                  <textarea 
                    rows="4" 
                    placeholder="Tell us about your project..." 
                    className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/40 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white/60 transition-all backdrop-blur-sm resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <GlassButton type="submit" className="w-full justify-center !py-3 !text-base font-bold">
                    <Send size={18} />
                    Send Message
                  </GlassButton>
                </div>

              </form>
            </LiquidGlass>
          </motion.div>

        </div>
      </div>
    </Section>
  );
};

export default Contact;