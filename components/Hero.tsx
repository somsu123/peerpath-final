
import React from 'react';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

const Hero: React.FC<{ onStart: () => void; onExploreHub: () => void }> = ({ onStart, onExploreHub }) => {
  return (
    <div className="relative overflow-hidden min-h-[90vh] flex items-center px-5">
      {/* --- Soothing Dashboard Background Layers --- */}
      
      {/* Layer 1: High-Quality Campus Front/Drone View */}
      <div className="absolute inset-0 -z-30">
        <img 
          src="https://images.unsplash.com/photo-1523050853064-897b2505500a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover object-center" 
          alt="AOT Campus View"
        />
        {/* Layer 2: Sophisticated Overlay (Soothing Gradient) */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/95 via-white/70 to-[#F8FAFC]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-transparent to-transparent h-1/2 bottom-0"></div>
      </div>

      {/* Layer 3: The Academic Grid (Soothing & Structured) */}
      <div className="absolute inset-0 -z-20 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      <div className="absolute inset-0 -z-20 opacity-[0.05] pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(#4f46e5 0.5px, transparent 0.5px), linear-gradient(90deg, #4f46e5 0.5px, transparent 0.5px)', backgroundSize: '120px 120px' }}>
      </div>

      {/* Layer 4: Soft Floating Blobs (Aesthetic Glows) */}
      <div className="absolute top-[-10%] right-[-5%] -z-10 w-[50rem] h-[50rem] bg-indigo-200/30 rounded-full blur-[120px] animate-pulse duration-[10s]"></div>
      <div className="absolute bottom-[10%] left-[-5%] -z-10 w-[30rem] h-[30rem] bg-violet-100/40 rounded-full blur-[100px]"></div>

      {/* --- Hero Content --- */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-3xl space-y-10 md:space-y-14 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-indigo-100 shadow-xl shadow-indigo-100/20 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-indigo-600 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <Sparkles className="w-3.5 h-3.5" />
              Academic Excellence at AOT
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/5 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest text-slate-600 border border-slate-200">
              <MapPin className="w-3 h-3" />
              Adisaptagram, WB
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 leading-[0.95] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Connect. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-size-200 animate-gradient-x">Collaborate.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 opacity-90">
              The unified digital workspace for Academy of Technology. Experience a new era of peer learning and AI-powered academic support.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 md:gap-8 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <button 
              onClick={onStart}
              className="group relative flex items-center justify-center gap-4 bg-indigo-600 text-white px-10 py-6 md:py-8 rounded-[2rem] font-black text-xl md:text-2xl hover:bg-indigo-700 transition-all active:scale-[0.96] shadow-[0_30px_60px_-15px_rgba(79,70,229,0.4)] w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-500" />
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
            
            <button 
              onClick={onExploreHub}
              className="group flex items-center justify-center gap-4 bg-white/60 backdrop-blur-xl text-slate-700 border-2 border-white px-10 py-6 md:py-8 rounded-[2rem] font-black text-xl md:text-2xl hover:bg-white hover:border-indigo-100 transition-all active:scale-[0.96] shadow-xl shadow-slate-200/50 w-full sm:w-auto"
            >
              Explore AOT Hub
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 pt-12 animate-in fade-in duration-1000 delay-500">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-14 h-14 rounded-2xl border-[4px] border-white overflow-hidden shadow-xl ring-1 ring-slate-100 transform hover:-translate-y-2 transition-transform duration-300">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=student${i}`} className="w-full h-full object-cover bg-indigo-50" alt="Student" />
                </div>
              ))}
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 border-[4px] border-white flex items-center justify-center text-white text-[11px] font-black shadow-xl ring-1 ring-slate-100">
                +4k
              </div>
            </div>
            <div className="text-sm md:text-base font-bold text-slate-400 text-center md:text-left leading-tight">
              <span className="text-indigo-600 font-black">4,200+ Students</span> already registered<br />
              <span className="text-slate-300 text-xs uppercase tracking-widest font-black">Across All 6 Departments</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
