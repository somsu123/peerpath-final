
import React, { useState } from 'react';
import { Trophy, Calendar, MapPin, Zap, Star, Users, ArrowUpRight, Filter, Search, Bell, X } from 'lucide-react';

interface CampusEvent {
  id: string;
  title: string;
  category: 'Hackathon' | 'Championship' | 'Tech Fest' | 'Function' | 'Workshop';
  description: string;
  fullDescription: string;
  date: string;
  location: string;
  participants: number;
  hostedBy: string;
  image: string;
  status: 'Upcoming' | 'Live' | 'Ended';
  prizes?: { position: string; reward: string }[];
  rules?: string[];
  timeline?: { time: string; activity: string }[];
  registrationLink?: string;
  contact?: string;
}

const CampusHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);

  const events: CampusEvent[] = [
    {
      id: 'e1',
      title: 'AOT Hack-O-Future 2024',
      category: 'Hackathon',
      description: 'The flagship inter-departmental hackathon focused on sustainable campus solutions. Show your coding prowess!',
      fullDescription: 'Join the most anticipated coding event of the year! AOT Hack-O-Future 2024 is a 48-hour marathon where students collaborate to build innovative solutions for campus sustainability, student welfare, and smart infrastructure. Whether you are a backend wizard, a frontend artist, or a product visionary, there is a place for you here.',
      date: 'Oct 24 - 26, 2024',
      location: 'Main Auditorium & CS Lab 1',
      participants: 120,
      hostedBy: 'AOT Coding Club',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      status: 'Upcoming',
      prizes: [
        { position: '1st Prize', reward: '₹15,000 + Internship Opportunities' },
        { position: '2nd Prize', reward: '₹10,000 + Tech Vouchers' },
        { position: '3rd Prize', reward: '₹5,000 + Goodies' }
      ],
      rules: [
        'Teams must consist of 2 to 4 members.',
        'At least one member must be from a different department (Inter-departmental).',
        'All work must be original and created during the hackathon.',
        'Pre-built templates or frameworks are allowed, but core logic must be new.'
      ],
      timeline: [
        { time: 'Day 1, 10:00 AM', activity: 'Inauguration & Problem Statement Release' },
        { time: 'Day 1, 11:30 AM', activity: 'Hacking Starts' },
        { time: 'Day 2, 02:00 PM', activity: 'Mid-Way Mentor Review' },
        { time: 'Day 3, 10:00 AM', activity: 'Final Submission' },
        { time: 'Day 3, 02:00 PM', activity: 'Final Pitching & Award Ceremony' }
      ],
      registrationLink: '#',
      contact: 'codingclub@aot.edu.in'
    },
    {
      id: 'e2',
      title: 'Checkmate: Annual Chess Championship',
      category: 'Championship',
      description: 'Battle of the minds. The annual AOT Chess tournament to crown the Grandmaster of Campus.',
      fullDescription: 'The AOT Annual Chess Championship brings together the sharpest minds on campus. Participate in a Swiss-system tournament to prove your strategic superiority. The tournament is open to all students across all years and departments.',
      date: 'Sept 15, 2024',
      location: 'Student Activity Center',
      participants: 64,
      hostedBy: 'AOT Sports Wing',
      image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=600&q=80',
      status: 'Live',
      prizes: [
        { position: 'Champion', reward: '₹3,000 + Gold Medal' },
        { position: 'Runner Up', reward: '₹1,500 + Silver Medal' },
        { position: '2nd Runner Up', reward: '₹500 + Bronze Medal' }
      ],
      rules: [
        'FIDE rapid chess rules apply.',
        '10 minutes + 5 seconds increment per move.',
        'Professional behavior and sportsmanship are mandatory.',
        'Use of electronic devices during play is strictly prohibited.'
      ],
      timeline: [
        { time: '09:00 AM', activity: 'Registration & Reporting' },
        { time: '10:00 AM', activity: 'Round 1 Starts' },
        { time: '01:00 PM', activity: 'Lunch Break' },
        { time: '02:00 PM', activity: 'Final Rounds' },
        { time: '04:30 PM', activity: 'Prize Distribution' }
      ],
      registrationLink: '#',
      contact: 'sports@aot.edu.in'
    },
    {
      id: 'e3',
      title: 'Arcadia 24: Mega Tech Fest',
      category: 'Tech Fest',
      description: 'The biggest tech festival of AOT. Robotics, coding contests, and keynote sessions from industry leaders.',
      fullDescription: 'Arcadia is the flagship technical festival of Academy of Technology. It is a celebration of innovation, creativity, and technology. Featuring everything from high-octane Robo-wars to brain-teasing algorithms, Arcadia is the place where engineering meets imagination.',
      date: 'Nov 12 - 14, 2024',
      location: 'Entire Campus',
      participants: 2500,
      hostedBy: 'AOT Student Council',
      image: 'https://images.unsplash.com/photo-1540575861501-7ad0582373f2?auto=format&fit=crop&w=600&q=80',
      status: 'Upcoming',
      prizes: [
        { position: 'Total Prize Pool', reward: 'Over ₹2,00,000' }
      ],
      rules: [
        'Registration for individual events is required.',
        'Valid ID card is mandatory for all participants.',
        'External participants are welcome for selected open events.'
      ],
      timeline: [
        { time: 'Nov 12, 09:30 AM', activity: 'Grand Opening' },
        { time: 'Nov 12-14, All Day', activity: 'Departmental Contests & Exhibitions' },
        { time: 'Nov 13, 11:00 AM', activity: 'Keynote by Google Engineers' },
        { time: 'Nov 14, 06:00 PM', activity: 'Cultural Evening & Closing' }
      ],
      registrationLink: '#',
      contact: 'studentcouncil@aot.edu.in'
    },
    {
      id: 'e6',
      title: 'AOT Hackathon 2.0 (Junior Edition)',
      category: 'Hackathon',
      description: 'Specially organized for 1st and 2nd-year students to jumpstart their building journey.',
      fullDescription: 'A beginner-friendly hackathon designed specifically for the juniors of AOT. If you have never been to a hackathon, this is your perfect starting point. Learn, build, and pitch your first tech project in a supportive environment. Mentors will be available 24/7 to guide you through the process.',
      date: 'Dec 05, 2024',
      location: 'Block D, IT Labs',
      participants: 80,
      hostedBy: 'Department Peers',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
      status: 'Upcoming',
      prizes: [
        { position: 'Top Junior Team', reward: '₹5,000 + Cloud Credits' },
        { position: 'Best UI/UX', reward: 'Design Kit + Stickers' }
      ],
      rules: [
        'Open only to 1st and 2nd-year students.',
        'Teams of 1-3 members.',
        'No prior experience required.'
      ],
      timeline: [
        { time: '10:00 AM', activity: 'Workshop: Getting Started' },
        { time: '11:00 AM', activity: 'Hackathon Kickoff' },
        { time: '04:00 PM', activity: 'Project Presentations' }
      ],
      contact: 'peers@aot.edu.in'
    },
    {
      id: 'e4',
      title: 'Monsoon Induction Meet',
      category: 'Function',
      description: 'Common function for all departments to welcome the new batch and celebrate campus culture.',
      fullDescription: 'The Monsoon Induction Meet is a vibrant celebration to welcome our freshers into the AOT family. Experience performances, interaction sessions, and a grand introduction to the clubs and activities that define AOT. Join us for an evening of music, talent shows, and departmental bonding.',
      date: 'Aug 30, 2024',
      location: 'Main Playground Stage',
      participants: 1500,
      hostedBy: 'AOT Administration',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
      status: 'Upcoming',
      timeline: [
        { time: '04:00 PM', activity: 'Welcome Address' },
        { time: '05:00 PM', activity: 'Cultural Performances' },
        { time: '07:30 PM', activity: 'Dinner & Networking' }
      ],
      contact: 'admin@aot.edu.in'
    },
    {
      id: 'e5',
      title: 'Inter-Departmental Cricket Cup',
      category: 'Championship',
      description: 'Final championship match between CSE and ECE departments.',
      fullDescription: 'The battle for department glory! Watch as CSE and ECE face off in the grand finale of the Inter-Departmental Cricket Cup. Expect high spirits, amazing catches, and intense competition. Cheer for your department and witness history in the making on the AOT Cricket Ground.',
      date: 'Sept 20, 2024',
      location: 'AOT Cricket Ground',
      participants: 300,
      hostedBy: 'AOT Sports Wing',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80',
      status: 'Upcoming',
      prizes: [
        { position: 'Winners', reward: 'Championship Trophy + ₹10,000' },
        { position: 'Man of the Match', reward: 'Exclusive Sports Kit' }
      ],
      rules: [
        'T20 format rules apply.',
        'Proper sports attire is mandatory.',
        'Players must represent their respective departments.'
      ],
      timeline: [
        { time: '10:00 AM', activity: 'Toss & Team Lineups' },
        { time: '10:30 AM', activity: 'Match Starts' },
        { time: '02:00 PM', activity: 'Presentation Ceremony' }
      ],
      contact: 'sports-wing@aot.edu.in'
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

                <p className="text-slate-500 font-semibold text-sm leading-relaxed line-clamp-2">{event.description}</p>

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
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
                >
                  Show Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedEvent(null)}
          ></div>
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in duration-300">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 md:p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition-colors md:text-slate-900 md:bg-slate-100 md:hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-1/3 h-56 md:h-auto relative shrink-0">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white md:hidden">
                <h3 className="text-2xl font-black leading-none mb-2">{selectedEvent.title}</h3>
                <span className="bg-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {selectedEvent.category}
                </span>
              </div>
            </div>

            <div className="flex-1 p-6 md:p-12 overflow-y-auto custom-scrollbar pb-24 md:pb-12">
              <div className="hidden md:block space-y-4 mb-8">
                <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {selectedEvent.category}
                </span>
                <h3 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  {selectedEvent.title}
                </h3>
              </div>

              <div className="space-y-8 md:space-y-10">
                <section>
                  <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-3 md:mb-4">About the Event</h4>
                  <p className="text-slate-600 font-semibold text-base md:text-lg leading-relaxed">
                    {selectedEvent.fullDescription}
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section>
                    <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-3 md:mb-4">Prizes & Perks</h4>
                    <div className="space-y-3">
                      {selectedEvent.prizes && selectedEvent.prizes.length > 0 ? (
                        selectedEvent.prizes.map((prize, i) => (
                          <div key={i} className="flex items-center gap-4 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                            <Trophy className="w-5 h-5 text-amber-500" />
                            <div>
                              <p className="text-xs font-black text-amber-800 uppercase tracking-widest">{prize.position}</p>
                              <p className="text-sm font-black text-amber-900">{prize.reward}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-400 font-bold italic">To be announced...</p>
                      )}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-3 md:mb-4">Key Rules</h4>
                    <ul className="space-y-3">
                      {selectedEvent.rules && selectedEvent.rules.length > 0 ? (
                        selectedEvent.rules.map((rule, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 font-bold text-sm leading-snug">
                            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[10px] text-slate-500">{i + 1}</span>
                            </div>
                            {rule}
                          </li>
                        ))
                      ) : (
                        <p className="text-slate-400 font-bold italic">Guidelines coming soon.</p>
                      )}
                    </ul>
                  </section>
                </div>

                {selectedEvent.timeline && (
                  <section>
                    <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-4 md:mb-6">Event Timeline</h4>
                    <div className="space-y-4 md:space-y-6">
                      {selectedEvent.timeline.map((item, i) => (
                        <div key={i} className="flex gap-4 md:gap-6 relative">
                          {i !== selectedEvent.timeline!.length - 1 && (
                            <div className="absolute left-[11px] top-8 bottom-[-16px] md:bottom-[-24px] w-0.5 bg-slate-100"></div>
                          )}
                          <div className="w-6 h-6 rounded-full bg-indigo-600 ring-4 ring-indigo-50 shrink-0 z-10"></div>
                          <div className="pb-2">
                            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">{item.time}</p>
                            <p className="font-black text-slate-800 text-sm md:text-base">{item.activity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <div className="pt-6 md:pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                      <Users className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Inquiries</p>
                      <p className="text-xs md:text-sm font-black text-slate-900">{selectedEvent.contact || 'No contact provided'}</p>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 active:scale-95">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


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
