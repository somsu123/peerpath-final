import React from 'react';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

const Hero: React.FC<{ onStart: () => void; onExploreHub: () => void }> = ({ onStart, onExploreHub }) => {
  return (
    <div className="relative overflow-hidden min-h-[90vh] flex items-center px-5">
      {/* --- Premium Animated Background --- */}

      {/* Layer 1: Base Gradient Mesh */}
      <div className="absolute inset-0 -z-30 bg-[#F8FAFC]">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Layer 2: Campus Image with Advanced Blend */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 -z-20 opacity-40 mix-blend-overlay mask-gradient-to-t">
        <img
          src="https://images.unsplash.com/photo-1523050853064-897b2505500a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover object-center mask-image-gradient"
          alt="AOT Campus"
        />
      </div>

      {/* Layer 3: Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.03]"></div>

      {/* --- Hero Content --- */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-4xl space-y-10 md:space-y-14 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 animate-in slide-in-from-bottom-4 fade-in duration-700">
            <div className="glass-effect inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-indigo-600 border-indigo-100/50">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Academic Excellence at AOT
            </div>
          </div>

          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 leading-[0.9] tracking-tight relative">
              <span className="block animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">Connect.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-size-200 animate-gradient-xy pb-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                Collaborate.
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
              The unified digital workspace for <span className="text-slate-900 font-bold">Academy of Technology</span>. Experience a new era of peer learning and AI-powered academic support.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 md:gap-8 pt-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-500">
            <button
              onClick={onStart}
              className="group relative flex items-center justify-center gap-4 bg-slate-900 text-white px-10 py-6 md:py-8 rounded-[2rem] font-black text-xl md:text-2xl hover:bg-indigo-600 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-1 active:scale-95 w-full sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <button
              onClick={onExploreHub}
              className="group flex items-center justify-center gap-4 glass-card px-10 py-6 md:py-8 rounded-[2rem] font-black text-xl md:text-2xl text-slate-700 hover:text-indigo-600 transition-all duration-300 hover:-translate-y-1 active:scale-95 w-full sm:w-auto"
            >
              Explore Hub
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 pt-12 animate-in fade-in duration-1000 delay-700">
            <div className="flex -space-x-5 hover:space-x-1 transition-all duration-500 p-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-16 h-16 rounded-full border-[4px] border-white shadow-lg overflow-hidden relative transform hover:-translate-y-2 transition-transform duration-300 bg-indigo-50">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=student${i}`} className="w-full h-full object-cover" alt="Student" />
                </div>
              ))}
              <div className="w-16 h-16 rounded-full bg-slate-900 border-[4px] border-white flex items-center justify-center text-white text-xs font-black shadow-lg z-10">
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
    </div>
  );
};

export default Hero;
