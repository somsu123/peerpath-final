
import React, { useState } from 'react';
import { Trophy, Calendar, MapPin, Zap, Star, Users, ArrowUpRight, Filter, Search, Bell } from 'lucide-react';

interface CampusEvent {
  id: string;
  title: string;
  category: 'Hackathon' | 'Championship' | 'Tech Fest' | 'Function' | 'Workshop';
  description: string;
  date: string;
  location: string;
  participants: number;
  hostedBy: string;
  image: string;
  status: 'Upcoming' | 'Live' | 'Ended';
}

const CampusHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const events: CampusEvent[] = [
    {
      id: 'e1',
      title: 'AOT Hack-O-Future 2024',
      category: 'Hackathon',
      description: 'The flagship inter-departmental hackathon focused on sustainable campus solutions. Show your coding prowess!',
      date: 'Oct 24 - 26, 2024',
      location: 'Main Auditorium & CS Lab 1',
      participants: 120,
      hostedBy: 'AOT Coding Club',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      status: 'Upcoming'
    },
    {
      id: 'e2',
      title: 'Checkmate: Annual Chess Championship',
      category: 'Championship',
      description: 'Battle of the minds. The annual AOT Chess tournament to crown the Grandmaster of Campus.',
      date: 'Sept 15, 2024',
      location: 'Student Activity Center',
      participants: 64,
      hostedBy: 'AOT Sports Wing',
      image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=600&q=80',
      status: 'Live'
    },
    {
      id: 'e3',
      title: 'Arcadia 24: Mega Tech Fest',
      category: 'Tech Fest',
      description: 'The biggest tech festival of AOT. Robotics, coding contests, and keynote sessions from industry leaders.',
      date: 'Nov 12 - 14, 2024',
      location: 'Entire Campus',
      participants: 2500,
      hostedBy: 'AOT Student Council',
      image: 'https://images.unsplash.com/photo-1540575861501-7ad0582373f2?auto=format&fit=crop&w=600&q=80',
      status: 'Upcoming'
    },
    {
      id: 'e6',
      title: 'AOT Hackathon 2.0 (Junior Edition)',
      category: 'Hackathon',
      description: 'Specially organized for 1st and 2nd-year students to jumpstart their building journey.',
      date: 'Dec 05, 2024',
      location: 'Block D, IT Labs',
      participants: 80,
      hostedBy: 'Department Peers',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
      status: 'Upcoming'
    },
    {
      id: 'e4',
      title: 'Monsoon Induction Meet',
      category: 'Function',
      description: 'Common function for all departments to welcome the new batch and celebrate campus culture.',
      date: 'Aug 30, 2024',
      location: 'Main Playground Stage',
      participants: 1500,
      hostedBy: 'AOT Administration',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
      status: 'Upcoming'
    },
    {
      id: 'e5',
      title: 'Inter-Departmental Cricket Cup',
      category: 'Championship',
      description: 'Final championship match between CSE and ECE departments.',
      date: 'Sept 20, 2024',
      location: 'AOT Cricket Ground',
      participants: 300,
      hostedBy: 'AOT Sports Wing',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80',
      status: 'Upcoming'
    }
  ];

  const categories = ['All', 'Hackathon', 'Championship', 'Tech Fest', 'Function', 'Workshop'];

  const filteredEvents = events.filter(e => {
    const matchesCategory = activeCategory === 'All' || e.category === activeCategory;
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Campus Beat</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">AOT Hub</h2>
          <p className="text-slate-500 font-semibold max-w-xl text-lg">Your central feed for all hackathons, championships, and fests at Academy of Technology.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search hackathons, chess..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-4 focus:border-indigo-500 outline-none shadow-sm transition-all font-semibold"
            />
          </div>
          <button className="p-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-600 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95 shadow-sm">
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-2
              ${activeCategory === cat 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' 
                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map(event => (
          <div key={event.id} className="group bg-white rounded-[3rem] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col">
            <div className="h-64 relative overflow-hidden">
              <img src={event.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={event.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute top-6 left-6 flex gap-2">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md border 
                  ${event.status === 'Live' ? 'bg-red-500/90 text-white border-red-400' : 'bg-white/90 text-slate-900 border-white/20'}`}>
                  {event.status === 'Live' && <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></span>}
                  {event.status}
                </span>
                <span className="bg-indigo-600/90 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg border border-indigo-500/30">
                  {event.category}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 opacity-70" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{event.participants} AOTians Interested</span>
                </div>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                  <button className="p-2 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                  </button>
                </div>
                
                <p className="text-slate-500 font-semibold text-sm leading-relaxed">{event.description}</p>
                
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-3 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    {event.location}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Organized By</p>
                  <p className="text-xs font-black text-slate-900">{event.hostedBy}</p>
                </div>
                <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended for Peers */}
      <div className="bg-slate-50 rounded-[4rem] p-12 md:p-20 border border-slate-100 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
          <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-slate-200 shrink-0">
            <Zap className="w-12 h-12 text-amber-500 fill-amber-500/20" />
          </div>
          <div className="space-y-3">
            <h4 className="text-3xl font-black text-slate-900 tracking-tight">Organizing an Event?</h4>
            <p className="text-slate-500 font-semibold text-lg max-w-xl">If you are a peer host organizing a hackathon or a chess tournament, post it here to reach 3000+ AOTians.</p>
          </div>
          <button className="bg-white text-indigo-600 border-2 border-indigo-100 px-10 py-5 rounded-[1.75rem] font-black text-lg hover:bg-indigo-50 transition-all shadow-sm active:scale-95 w-full md:w-auto">
            Become a Host
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampusHub;
