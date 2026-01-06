
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, Sparkles } from 'lucide-react';

interface BlockProps {
  type: 'question' | 'brick' | 'pipe' | 'goomba';
  label?: string;
  content?: React.ReactNode;
  icon?: LucideIcon;
  onHit?: () => void;
}

export const Block: React.FC<BlockProps> = ({ type, label, content, icon: Icon, onHit }) => {
  const [isHit, setIsHit] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleHit = () => {
    if (type === 'goomba') return;
    if (!isHit) {
      setIsHit(true);
      setShowContent(true);
      if (onHit) onHit();
    } else {
      setShowContent(!showContent);
    }
  };

  if (type === 'goomba') {
    return (
      <div className="relative group flex flex-col items-center">
        <div className="absolute -top-12 bg-black text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {label || 'BUG DETECTED'}
        </div>
        <motion.div
          animate={{ x: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-12 h-12 bg-[#923404] rounded-t-full relative flex flex-col items-center justify-end overflow-hidden border-b-4 border-[#4A2000]"
        >
           <div className="flex gap-4 mb-2">
              <div className="w-1.5 h-3 bg-white rounded-full rotate-12" />
              <div className="w-1.5 h-3 bg-white rounded-full -rotate-12" />
           </div>
           <div className="w-8 h-2 bg-black/20 rounded-full mb-1" />
        </motion.div>
      </div>
    );
  }

  if (type === 'pipe') {
    return (
      <div className="relative group flex flex-col items-center">
        <AnimatePresence>
          {label && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute -top-16 bg-[#00a800] text-white px-4 py-2 rounded-md shadow-lg border-2 border-white font-bold z-50 whitespace-nowrap pixel-font text-[10px]"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-32 h-12 bg-[#00D000] border-x-4 border-t-4 border-[#005000] rounded-t-md shadow-[inset_0_4px_0_rgba(255,255,255,0.4)]" />
        <div className="w-28 h-64 bg-[#00A800] border-x-4 border-[#005000] shadow-[inset_-10px_0_20px_rgba(0,0,0,0.2)] relative overflow-hidden">
             <div className="absolute left-4 top-0 w-6 h-full bg-white/20" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative cursor-pointer select-none" onClick={handleHit}>
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -240 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 w-80 bg-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-[#F8B800] z-50"
          >
             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 border-r-4 border-b-4 border-[#F8B800]" />
            <div className="text-[#923404] font-black text-lg mb-3 flex items-center gap-3 border-b-2 border-[#F8B800]/20 pb-2">
              {Icon ? <Icon className="text-[#F8B800]" /> : <Sparkles className="text-[#F8B800]" />}
              {label}
            </div>
            <div className="text-gray-600 text-sm leading-relaxed">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`w-16 h-16 flex items-center justify-center rounded-sm shadow-xl border-b-[6px] border-black/20 ${
          type === 'question' 
            ? (isHit ? 'bg-[#7E7E7E]' : 'bg-[#F8B800]') 
            : 'bg-[#C84C0C]'
        } relative overflow-hidden`}
        whileHover={{ scale: 1.05 }}
        animate={isHit ? { y: [0, -20, 0] } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {type === 'question' && !isHit && (
          <motion.span 
            animate={{ opacity: [1, 0.5, 1] }} 
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-white text-3xl font-black drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]"
          >
            ?
          </motion.span>
        )}
        {type === 'brick' && (
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-1 p-1">
            <div className="bg-[#923404]/40 rounded-sm border-t border-white/20" />
            <div className="bg-[#923404]/40 rounded-sm border-t border-white/20" />
            <div className="bg-[#923404]/40 rounded-sm border-t border-white/20" />
            <div className="bg-[#923404]/40 rounded-sm border-t border-white/20" />
          </div>
        )}
        
        {/* Particle/Coin effect on hit */}
        <AnimatePresence>
          {isHit && (
            <motion.div 
              initial={{ y: 0, opacity: 1 }} 
              animate={{ y: -100, opacity: 0, scale: 1.5 }} 
              className="absolute pointer-events-none"
            >
               <div className="w-8 h-8 bg-[#F8B800] rounded-full border-4 border-white shadow-lg flex items-center justify-center font-black text-[#923404]">
                 $
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
