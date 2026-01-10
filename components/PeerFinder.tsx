
import React, { useState, useEffect } from 'react';
import { Search, Filter, MessageSquare, Star, UserPlus, Check } from 'lucide-react';
import { Peer } from '../types';

interface PeerFinderProps {
  onChatStart: (peer: Peer) => void;
  onFollow?: (peer: Peer) => void;
}

const PeerFinder: React.FC<PeerFinderProps> = ({ onChatStart, onFollow }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [followedIds, setFollowedIds] = useState<string[]>([]);
  
  useEffect(() => {
    const saved = localStorage.getItem('followed_peers');
    if (saved) setFollowedIds(JSON.parse(saved));
  }, []);

  const toggleFollow = (peer: Peer) => {
    const newFollowed = followedIds.includes(peer.id) 
      ? followedIds.filter(fid => fid !== peer.id)
      : [...followedIds, peer.id];
    
    if (!followedIds.includes(peer.id) && onFollow) {
      onFollow(peer);
    }
    
    setFollowedIds(newFollowed);
    localStorage.setItem('followed_peers', JSON.stringify(newFollowed));
  };

  const mockPeers: Peer[] = [
    { id: '1', name: 'Arjun Das', subject: 'Computer Science & Engineering', avatar: 'https://picsum.photos/seed/arjun/100/100', rating: 4.8, tags: ['3rd Year', 'Coding Club'] },
    { id: '2', name: 'Priya Mukherjee', subject: 'CS & Business Systems', avatar: 'https://picsum.photos/seed/priya/100/100', rating: 4.9, tags: ['3rd Year', 'Business Lead'] },
    { id: '3', name: 'Sayan Ghosh', subject: 'Electronics & Communication', avatar: 'https://picsum.photos/seed/sayan/100/100', rating: 4.7, tags: ['2nd Year', 'Robotics'] },
    { id: '4', name: 'Ananya Roy', subject: 'Electrical & Electronics', avatar: 'https://picsum.photos/seed/ananya/100/100', rating: 4.9, tags: ['3rd Year', 'Smart Grids'] },
    { id: '5', name: 'Rahul Sharma', subject: 'Mechanical Engineering', avatar: 'https://picsum.photos/seed/rahul/100/100', rating: 4.5, tags: ['Final Year', 'Auto Enthusiast'] },
    { id: '6', name: 'Sneha Bose', subject: 'Computer Science & Engineering', avatar: 'https://picsum.photos/seed/sneha/100/100', rating: 5.0, tags: ['1st Year', 'AOT Tech'] },
  ];

  const filteredPeers = mockPeers.filter(peer => 
    peer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peer.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peer.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">Campus Peers</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Direct access to the AOT student network.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2 md:gap-4">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search CSE, CSBS, 3rd year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 focus:border-indigo-500 outline-none shadow-sm transition-all text-sm font-semibold"
            />
          </div>
          <button className="flex items-center justify-center p-3.5 bg-white border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all shadow-sm active:scale-90">
            <Filter className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {filteredPeers.map((peer) => {
          const isFollowing = followedIds.includes(peer.id);
          return (
            <div key={peer.id} className="group bg-white border border-slate-100 rounded-[2.5rem] p-6 hover:shadow-2xl hover:shadow-indigo-50/50 transition-all duration-500 border-b-[6px] border-b-slate-100/50">
              <div className="flex items-start justify-between mb-5">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] overflow-hidden ring-4 ring-slate-50">
                    <img src={peer.avatar} alt={peer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
                </div>
                <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3.5 py-2 rounded-full text-xs font-black tracking-tighter shadow-sm border border-indigo-100/50">
                  <Star className="w-3.5 h-3.5 fill-indigo-700" />
                  {peer.rating}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-900 mb-1 leading-none">{peer.name}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 inline-block px-2 py-1 rounded-md mt-2">
                  {peer.subject}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-8">
                {peer.tags.map((tag) => (
                  <span key={tag} className="text-[9px] bg-slate-50 text-slate-400 border border-slate-100 px-2 py-1 rounded-lg font-black uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => onChatStart(peer)}
                  className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white py-4.5 rounded-2xl font-black text-base hover:bg-indigo-700 active:scale-[0.96] transition-all shadow-xl shadow-indigo-100 h-14"
                >
                  <MessageSquare className="w-5 h-5" />
                  Send Message
                </button>
                <button 
                  onClick={() => toggleFollow(peer)}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm transition-all active:scale-[0.96] border-2 h-14
                    ${isFollowing 
                      ? 'bg-slate-100 border-slate-100 text-slate-600' 
                      : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                >
                  {isFollowing ? (
                    <><Check className="w-4 h-4" /> Following</>
                  ) : (
                    <><UserPlus className="w-4 h-4" /> Follow Student</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PeerFinder;
