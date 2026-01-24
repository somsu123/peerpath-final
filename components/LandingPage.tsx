
import React from 'react';
import { ArrowRight, Users, Zap, Layout, CheckCircle, Sparkles, MapPin, Globe } from 'lucide-react';
import { User } from '../types';
import Hero from './Hero';

interface LandingPageProps {
    onNavigate: (tab: any) => void;
    onAuth: () => void;
    currentUser: User | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onAuth, currentUser }) => {
    return (
        <div className="space-y-16 md:space-y-32 pb-20">
            {/* Hero Section */}
            <Hero
                onStart={() => currentUser ? onNavigate('peers') : onAuth()}
                onExploreHub={() => onNavigate('campus-hub')}
            />

            {/* Campus Clusters Section */}
            <section className="max-w-7xl mx-auto px-5 md:px-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-8 h-[2px] bg-indigo-600"></span>
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Campus Clusters</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
                            Department <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Hubs</span>
                        </h2>
                    </div>
                    <button
                        onClick={() => onNavigate('groups')}
                        className="group flex items-center gap-3 text-slate-500 font-bold uppercase text-xs tracking-widest hover:text-indigo-600 transition-all"
                    >
                        Browse All Rooms
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                    {[
                        { name: 'CSE', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80', active: 42, color: 'from-blue-600 to-indigo-600' },
                        { name: 'CSBS', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80', active: 22, color: 'from-emerald-600 to-teal-600' },
                        { name: 'ECE', img: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=400&q=80', active: 19, color: 'from-orange-600 to-amber-600' },
                        { name: 'EEE', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80', active: 16, color: 'from-yellow-500 to-amber-500' },
                        { name: 'ME', img: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=400&q=80', active: 12, color: 'from-red-600 to-rose-600' },
                        { name: 'EE', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80', active: 15, color: 'from-cyan-600 to-blue-600' },
                    ].map((dept, i) => (
                        <div key={i} className="group relative h-80 rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 hover:-translate-y-2">
                            <img src={dept.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={dept.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                            <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-30 mix-blend-overlay transition-opacity duration-500`}></div>

                            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                <ArrowRight className="text-white w-4 h-4" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-3xl font-black text-white tracking-tighter mb-2">{dept.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                    </span>
                                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{dept.active} Active Rooms</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-5 md:px-10">
                <div className="text-center mb-20 md:mb-28">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-6">
                        <Sparkles className="w-3 h-3" /> Engineered for AOT
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Elevate your <span className="text-indigo-600">learning.</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium md:text-xl leading-relaxed">
                        Bridge the gap between departmental silos with a unified learning architecture designed for the future.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {[
                        {
                            icon: <Users className="w-8 h-8 text-indigo-600" />,
                            title: 'Peer Finder',
                            desc: 'Directly connect with high-achievers from all departments based on skills and interests.',
                            img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80'
                        },
                        {
                            icon: <Zap className="w-8 h-8 text-amber-500" />,
                            title: 'AI Assistant',
                            desc: 'Advanced Gemini-powered tutor tailored to MAKAUT curriculum patterns and deeper learning.',
                            img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80'
                        },
                        {
                            icon: <Layout className="w-8 h-8 text-emerald-500" />,
                            title: 'Live Rooms',
                            desc: 'Real-time collaborative sessions for lab prep, hackathons, and assignments.',
                            img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80'
                        },
                    ].map((feature, idx) => (
                        <div key={idx} className="group bg-white rounded-[2.5rem] p-2 hover:bg-slate-50 transition-colors duration-500">
                            <div className="bg-white rounded-[2rem] border border-slate-100 h-full overflow-hidden relative hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group-hover:-translate-y-2">
                                <div className="h-56 overflow-hidden relative">
                                    <img src={feature.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-90" alt={feature.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                                    <div className="absolute top-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                                        {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-8 h-8' })}
                                    </div>
                                </div>
                                <div className="p-8 md:p-10">
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-semibold text-sm md:text-base">{feature.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {currentUser && (
                    <div className="mt-24 md:mt-40 relative">
                        <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] rotate-1 opacity-20 blur-xl"></div>
                        <div className="relative p-8 md:p-16 rounded-[3rem] bg-indigo-600 text-white flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden shadow-2xl shadow-indigo-500/30">
                            <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 p-24 bg-indigo-900/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                            <img
                                src="https://images.unsplash.com/photo-1498243639359-2cd19655a1ef?auto=format&fit=crop&w=800&q=80"
                                className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
                                alt="Study Banner"
                            />

                            <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center text-center md:text-left relative z-10 w-full lg:w-auto">
                                <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-white/20 shadow-2xl relative">
                                    <CheckCircle className="w-10 h-10 text-white" />
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-indigo-600"></div>
                                </div>
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-3">Campus Verified</h3>
                                    <p className="text-indigo-200 text-lg md:text-xl font-medium max-w-md">Ready to jump back in, {currentUser.name.split(' ')[0]}?</p>
                                </div>
                            </div>
                            <button
                                onClick={() => onNavigate('groups')}
                                className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 active:scale-95 transition-all shadow-xl w-full lg:w-auto relative z-10 group"
                            >
                                Join Live Room
                                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default LandingPage;
