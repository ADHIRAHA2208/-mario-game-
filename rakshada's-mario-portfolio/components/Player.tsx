
import React from 'react';
import { motion } from 'framer-motion';

interface PlayerProps {
  isJumping: boolean;
  isMoving: boolean;
  direction: 'left' | 'right';
}

const Player: React.FC<PlayerProps> = ({ isJumping, isMoving, direction }) => {
  return (
    <div className="relative group">
      {/* Shadow */}
      <motion.div 
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-black/20 rounded-full blur-[1px]"
        animate={{
          scale: isJumping ? 0.5 : 1,
          opacity: isJumping ? 0.2 : 0.4
        }}
      />
      
      <motion.div
        className="relative w-12 h-16 flex flex-col items-center"
        animate={{
          scaleX: direction === 'left' ? -1 : 1,
          y: isJumping ? -140 : 0,
          scaleY: isJumping ? [1, 1.2, 0.9, 1] : 1,
          rotate: isJumping ? (direction === 'right' ? [0, 5, -5, 0] : [0, -5, 5, 0]) : 0
        }}
        transition={{ 
          y: { type: 'spring', stiffness: 200, damping: 15 },
          scaleY: { duration: 0.4 }
        }}
      >
        {/* Hat */}
        <div className="w-10 h-4 bg-[#E4000F] rounded-t-lg relative z-10">
          <div className="absolute top-1 left-3 w-4 h-1.5 bg-white/40 rounded-full" />
          <div className="absolute -bottom-1 left-0 w-full h-2 bg-[#E4000F]" />
        </div>
        
        {/* Face/Head */}
        <div className="w-9 h-9 bg-[#FECB9E] rounded-lg -mt-1 relative shadow-inner">
          <div className="absolute top-3 right-1.5 w-2 h-2.5 bg-black rounded-sm" /> {/* Eye */}
          <div className="absolute bottom-2 right-0 w-3 h-2 bg-[#703000] rounded-sm" /> {/* Moustache */}
          <div className="absolute bottom-1 right-3 w-2 h-2 bg-[#FF8B8B] rounded-full opacity-40" /> {/* Blush */}
        </div>
        
        {/* Body (Overalls) */}
        <div className="w-11 h-9 bg-[#E4000F] rounded-b-lg relative -mt-1">
          {/* Blue Straps */}
          <div className="absolute left-1.5 top-0 w-2.5 h-full bg-[#0051B8]" />
          <div className="absolute right-1.5 top-0 w-2.5 h-full bg-[#0051B8]" />
          <div className="absolute bottom-0 w-full h-4 bg-[#0051B8] rounded-b-lg" />
          {/* Buttons */}
          <div className="absolute left-2 top-2.5 w-2 h-2 bg-[#FEE100] rounded-full shadow-sm" />
          <div className="absolute right-2 top-2.5 w-2 h-2 bg-[#FEE100] rounded-full shadow-sm" />
        </div>
        
        {/* Legs/Feet */}
        <div className="flex justify-between w-10 -mt-1">
          <motion.div 
            className="w-4.5 h-2.5 bg-[#4A2000] rounded-sm shadow-md"
            animate={isMoving && !isJumping ? { 
              y: [0, -4, 0],
              x: [0, 2, 0]
            } : {}}
            transition={{ repeat: Infinity, duration: 0.25 }}
          />
          <motion.div 
            className="w-4.5 h-2.5 bg-[#4A2000] rounded-sm shadow-md"
            animate={isMoving && !isJumping ? { 
              y: [0, -4, 0],
              x: [0, -2, 0]
            } : {}}
            transition={{ repeat: Infinity, duration: 0.25, delay: 0.125 }}
          />
        </div>
        
        {/* Floating Label */}
        <motion.div 
          className="absolute -top-12 whitespace-nowrap bg-black/80 text-white px-3 py-1 rounded-md text-[9px] font-bold border border-white/20 uppercase tracking-tighter"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          P1: RAKSHADA
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Player;
