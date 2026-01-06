
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Code2, BookOpen, Briefcase, GraduationCap, Github, Mail, Phone, Star, Music, Volume2, VolumeX, Terminal } from 'lucide-react';
import { RESUME_DATA } from './constants';
import Player from './components/Player';
import { Block } from './components/WorldObject';
import HUD from './components/HUD';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isJumping, setIsJumping] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isMoving, setIsMoving] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const xPos = useTransform(scrollYProgress, [0, 1], ["0%", "-92%"]);
  const cloudX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const mountainX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const farBushX = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  
  // Progress for the progress bar
  const progressPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    let timeout: number;
    const handleScroll = () => {
      setIsMoving(true);
      clearTimeout(timeout);
      timeout = window.setTimeout(() => setIsMoving(false), 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
      }
      if (e.code === 'ArrowRight') setDirection('right');
      if (e.code === 'ArrowLeft') setDirection('left');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={containerRef} className="h-[1200vh] relative overflow-hidden bg-[#5c94fc] selection:bg-yellow-400 selection:text-black">
      {/* CRT Effects Overlay */}
      <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>

      <HUD />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Clouds - Far */}
        <motion.div style={{ x: cloudX }} className="absolute top-24 flex gap-[400px] opacity-30">
           {[...Array(15)].map((_, i) => (
             <div key={i} className="w-48 h-12 bg-white rounded-full relative">
                <div className="absolute -top-10 left-6 w-24 h-24 bg-white rounded-full shadow-lg" />
                <div className="absolute -top-6 left-20 w-16 h-16 bg-white rounded-full shadow-lg" />
             </div>
           ))}
        </motion.div>
        
        {/* Distant Hills - Parallax Layer 1 */}
        <motion.div style={{ x: mountainX }} className="absolute bottom-40 flex items-end gap-0 opacity-40">
           {[...Array(12)].map((_, i) => (
             <div key={i} className={`w-[800px] h-[400px] bg-[#48D048] rounded-t-[400px] -mr-[400px] border-t-[20px] border-[#00A800]/20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]`} />
           ))}
        </motion.div>

        {/* Bushes - Parallax Layer 2 */}
        <motion.div style={{ x: farBushX }} className="absolute bottom-40 flex items-end gap-[600px] opacity-60">
           {[...Array(10)].map((_, i) => (
             <div key={i} className="flex items-end">
               <div className="w-32 h-16 bg-[#00A800] rounded-t-full relative">
                 <div className="absolute top-2 left-4 w-4 h-4 bg-white/20 rounded-full" />
               </div>
               <div className="w-24 h-12 bg-[#00A800] rounded-t-full -ml-8" />
             </div>
           ))}
        </motion.div>
      </div>

      <div className="fixed top-0 left-0 w-full h-screen flex items-center">
        <motion.div 
          style={{ x: xPos }} 
          className="flex items-center min-w-[15000px] h-full pl-[10vw] relative"
        >
          {/* Floor / Ground */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-[#C84C0C] border-t-[8px] border-black/30 grid grid-cols-[repeat(1000,64px)] overflow-hidden">
            {[...Array(2000)].map((_, i) => (
               <div key={i} className="w-16 h-16 border-r border-b border-black/10 bg-[#923404] relative">
                  <div className="absolute top-2 left-2 w-2 h-2 bg-white/5 rounded-sm" />
               </div>
            ))}
          </div>

          {/* Section: Start / Hero */}
          <div className="flex items-end mb-40 mr-[30vw]">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/95 backdrop-blur-md p-12 rounded-[2rem] shadow-2xl border-b-[12px] border-gray-200 max-w-2xl"
            >
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                 <span className="pixel-font text-xs text-gray-400 tracking-widest">LEVEL 1-1: RESUME</span>
               </div>
               <h1 className="text-7xl font-black mb-4 text-[#C84C0C] drop-shadow-sm uppercase tracking-tighter leading-none">{RESUME_DATA.name}</h1>
               <p className="text-2xl font-bold text-[#F8B800] mb-8 uppercase tracking-[0.2em]">{RESUME_DATA.title}</p>
               <div className="p-6 bg-gray-50 rounded-xl border-l-4 border-[#C84C0C] italic text-gray-600 mb-8 leading-relaxed">
                  "{RESUME_DATA.summary}"
               </div>
               <div className="flex flex-wrap gap-4">
                 <a href={`mailto:rakshadatawade01@gmail.com`} className="group flex items-center gap-3 bg-[#E4000F] hover:bg-[#C4000D] text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg active:scale-95">
                   <Mail size={20} className="group-hover:rotate-12 transition-transform" /> HIRE RAKSHADA
                 </a>
                 <div className="flex items-center gap-3 bg-[#0051B8] text-white px-8 py-4 rounded-xl font-bold shadow-lg">
                   <Phone size={20} /> +91 8591272501
                 </div>
               </div>
            </motion.div>
            <div className="ml-32 flex gap-6 items-end">
               <Block type="brick" />
               <Block type="question" label="GITHUB" content={<a href="https://github.com/rakshada" target="_blank" className="text-blue-500 font-bold hover:underline flex items-center gap-2 mt-2">LINKEDIN <Terminal size={14}/></a>} icon={Github} />
               <Block type="brick" />
               <Block type="goomba" label="BUG: MEMORY LEAK" />
            </div>
          </div>

          {/* Section: Experience */}
          <div className="flex items-end mb-40 mr-[35vw] gap-20">
            <div className="mb-48">
              <div className="mb-20">
                <h2 className="text-5xl text-white pixel-font drop-shadow-[4px_4px_0_rgba(0,0,0,0.4)]">EXPERIENCE</h2>
                <p className="text-white/70 mt-2 font-bold uppercase tracking-widest">Select blocks to expand</p>
              </div>
              <div className="flex gap-12">
                {RESUME_DATA.experience.map((exp, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-8">
                    <Block 
                      type="question" 
                      label={exp.company}
                      icon={Briefcase}
                      content={
                        <div className="space-y-3">
                          <p className="font-black text-[#C84C0C] text-lg uppercase tracking-tight">{exp.role}</p>
                          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                             <span>{exp.period}</span>
                             <span>{exp.location}</span>
                          </div>
                          <ul className="text-xs space-y-2 mt-4">
                            {exp.description.map((d, i) => (
                              <li key={i} className="flex gap-2 items-start">
                                <span className="text-[#F8B800] mt-1">▶</span>
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      }
                    />
                    <div className="w-1 h-20 bg-white/20 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
            <Block type="pipe" label="SKILLS_SUB_LVL" />
          </div>

          {/* Section: Skills */}
          <div className="flex items-end mb-40 mr-[40vw]">
            <div className="relative">
              <h2 className="text-5xl text-white pixel-font mb-16 drop-shadow-[4px_4px_0_rgba(0,0,0,0.4)]">TECH_STACK</h2>
              <div className="grid grid-cols-2 gap-10">
                {RESUME_DATA.skills.map((cat, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-8 rounded-3xl shadow-2xl border-b-[10px] border-gray-200 w-[400px]"
                  >
                    <h3 className="font-black text-2xl text-[#E4000F] mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Code2 className="text-[#F8B800]" /> {cat.category}
                      </div>
                      <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-400">LVL {cat.level}</span>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {cat.skills.map((s, i) => (
                        <span key={i} className="px-4 py-2 bg-[#FEE100]/10 text-[#923404] rounded-xl text-sm font-black border-2 border-[#FEE100]/30">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(cat.level/5)*100}%` }}
                        className="h-full bg-[#F8B800]"
                       />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-8 ml-32">
               {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                    className="w-14 h-14 bg-[#F8B800] rounded-full border-4 border-white shadow-lg flex items-center justify-center font-black text-[#923404] text-xl"
                  >
                    $
                  </motion.div>
               ))}
            </div>
          </div>

          {/* Section: Projects */}
          <div className="flex items-end mb-40 mr-[30vw] gap-12">
            <div className="mb-20">
              <h2 className="text-5xl text-white pixel-font mb-20 drop-shadow-[4px_4px_0_rgba(0,0,0,0.4)]">PROJECTS</h2>
              <div className="flex gap-8">
                {RESUME_DATA.projects.map((proj, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <Block 
                      type="brick" 
                      label={proj.title}
                      icon={BookOpen}
                      content={
                        <div className="space-y-4">
                          <p className="text-xs font-black text-[#E4000F] uppercase tracking-tighter">{proj.company}</p>
                          <div className="space-y-2">
                            {proj.description.map((d, i) => (
                              <p key={i} className="text-xs leading-relaxed">• {d}</p>
                            ))}
                          </div>
                          {proj.github && (
                             <a href={proj.github} className="block mt-4 text-center bg-gray-900 text-white py-2 rounded-lg text-[10px] font-bold uppercase hover:bg-black transition-colors">
                               View Repo
                             </a>
                          )}
                        </div>
                      }
                    />
                    <div className="mt-8 text-white/50 pixel-font text-[8px] uppercase">PROJECT_0{idx+1}</div>
                  </div>
                ))}
              </div>
            </div>
             <Block type="pipe" label="ACADEMIA" />
          </div>

          {/* Section: Education */}
          <div className="flex items-end mb-40 mr-[40vw]">
            <motion.div 
              whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
              className="bg-[#0051B8] p-16 rounded-[4rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-[10px] border-white text-white min-w-[700px] relative overflow-hidden"
            >
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
               <h2 className="text-5xl pixel-font mb-12 flex items-center gap-6">
                 <GraduationCap size={50} className="text-[#F8B800]" /> EDUCATION
               </h2>
               <div className="space-y-12">
                 {RESUME_DATA.education.map((edu, idx) => (
                   <div key={idx} className="flex justify-between items-center group">
                      <div className="space-y-2">
                        <h4 className="text-3xl font-black group-hover:text-[#F8B800] transition-colors">{edu.school}</h4>
                        <p className="text-xl opacity-70 font-bold uppercase tracking-widest">{edu.degree}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-black text-[#F8B800]">{edu.pointer}</div>
                        <p className="text-sm opacity-50 pixel-font mt-2">CLASS_OF_{edu.year.split('-')[1]}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </motion.div>
          </div>

          {/* Final Area */}
          <div className="flex items-end h-full mb-40 pr-[1500px] relative">
             <div className="flex flex-col items-center">
                <div className="w-4 h-[600px] bg-white border-x-2 border-gray-400 relative">
                   <motion.div 
                    animate={{ y: [0, 400, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute -left-12 top-0 w-24 h-16 bg-white border-4 border-[#00A800] flex items-center justify-center font-bold text-[#00A800] pixel-font text-[10px]"
                   >
                     FINISH
                   </motion.div>
                </div>
                <div className="w-80 h-[140px] bg-[#923404] rounded-t-3xl mt-4 border-t-8 border-[#C84C0C] relative shadow-2xl">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-20 bg-black/40 rounded-t-lg border-x-4 border-t-4 border-black/20" />
                </div>
             </div>
             
             <div className="ml-64 max-w-lg">
                <h3 className="text-6xl text-white font-black pixel-font mb-8 drop-shadow-xl">GAME OVER?</h3>
                <p className="text-white text-xl font-bold mb-12 opacity-80 leading-relaxed">Level 1 Complete! Rakshada is ready for her next big challenge in software engineering. Ready to hit "Start"?</p>
                
                <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border-2 border-white/20">
                  <p className="pixel-font text-white text-xs mb-6">CONNECT_PLAYER_1</p>
                  <div className="grid grid-cols-2 gap-6">
                    <a href="mailto:rakshadatawade01@gmail.com" className="bg-[#E4000F] p-4 rounded-xl flex items-center justify-center gap-3 text-white font-bold hover:scale-105 transition-transform">
                      <Mail /> EMAIL
                    </a>
                    <a href="https://github.com/rakshada" className="bg-gray-900 p-4 rounded-xl flex items-center justify-center gap-3 text-white font-bold hover:scale-105 transition-transform">
                      <Github /> GITHUB
                    </a>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* The Player - Centered logic */}
        <div className="fixed bottom-40 left-[25%] z-[150] pointer-events-none">
          <Player 
            isJumping={isJumping} 
            isMoving={isMoving} 
            direction={direction} 
          />
        </div>
      </div>
      
      {/* Bottom Progress Bar UI */}
      <div className="fixed bottom-0 left-0 w-full h-1.5 bg-black/20 z-[190]">
         <motion.div 
          style={{ width: progressPercent.get() + "%" }}
          className="h-full bg-[#F8B800] shadow-[0_0_10px_#F8B800]"
         />
      </div>

      {/* Audio Control */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-8 right-8 z-[210] w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/20 text-white transition-all shadow-xl"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <AnimatePresence>
        {!isMoving && scrollYProgress.get() < 0.01 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-[200]"
          >
            <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center p-2">
               <motion.div 
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 bg-white rounded-full"
               />
            </div>
            <span className="text-white pixel-font text-[10px] tracking-widest opacity-60">SCROLL TO START</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
