
import React from 'react';
import { User, Code, Trophy, MapPin } from 'lucide-react';

const HUD: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full p-4 lg:p-8 flex justify-between items-start z-[100] text-white pixel-font pointer-events-none">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border-2 border-white/20">
             <p className="text-[10px] mb-1 opacity-70">DEVELOPER</p>
             <p className="text-sm">RAKSHADA</p>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border-2 border-white/20">
             <p className="text-[10px] mb-1 opacity-70">SCORE</p>
             <p className="text-sm">024500</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
           {[1, 2, 3].map(i => (
             <div key={i} className="w-6 h-6 bg-red-500 rounded-sm border-2 border-white shadow-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-50" />
             </div>
           ))}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border-2 border-white/20 text-right">
           <p className="text-[10px] mb-1 opacity-70">WORLD</p>
           <p className="text-sm">CAREER 1-1</p>
        </div>
        <div className="flex items-center gap-2 mt-2 bg-yellow-500/80 px-4 py-2 rounded-full border-2 border-white text-xs">
           <Trophy size={14} className="animate-bounce" />
           <span>HI-SCORE: JAVA MASTER</span>
        </div>
      </div>
    </div>
  );
};

export default HUD;
