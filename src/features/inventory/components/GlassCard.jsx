import { motion } from "framer-motion";

export const GlassPanel = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`
        bg-white/10 backdrop-blur-2xl 
        border border-white/20 
        shadow-2xl
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};