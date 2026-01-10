
import React, { useState } from 'react';
import { BookOpen, Users, PlayCircle, Plus, Calendar, Filter, Share2, Info, X, Check, Search, Hash, Terminal, Bell, Clock, CalendarClock } from 'lucide-react';
import { StudyGroup } from '../types';

interface StudyGroupsProps {
  onJoin?: (group: StudyGroup) => void;
  onNotify?: (group: StudyGroup) => void;
  notifiedRoomIds?: string[];
  roomsGoneLive?: string[];
}

const StudyGroups: React.FC<StudyGroupsProps> = ({ onJoin, onNotify, notifiedRoomIds = [], roomsGoneLive = [] }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showScheduler, setShowScheduler] = useState(false);
  const [newRoomData, setNewRoomData] = useState({ 
    title: '', 
    subject: 'CSE',
    customTime: ''
  });

  const [groups, setGroups] = useState<StudyGroup[]>([
    { id: '1', title: 'Data Structures with C', description: 'Deep dive into linked lists and trees for upcoming semester labs.', membersCount: 12, subject: 'CSE', isLive: true },
    { id: '2', title: 'Business Process Management', description: 'Reviewing enterprise architecture and workflows for CSBS batch.', membersCount: 45, subject: 'CSBS', isLive: true },
    { id: '3', title: 'Microprocessors & Microcontrollers', description: '8085 assembly language practice session.', membersCount: 8, subject: 'ECE', isLive: false, scheduledTime: new Date(Date.now() + 3600000) },
    { id: '4', title: 'Control Systems Review', description: 'Solving root locus and state-space analysis problems.', membersCount: 22, subject: 'EE', isLive: false, scheduledTime: new Date(Date.now() + 7200000) },
    { id: '5', title: 'Power Electronics Laboratory', description: 'Discussing inverter circuits and switch-mode supplies.', membersCount: 5, subject: 'EEE', isLive: true },
    { id: '6', title: 'Database Management Systems', description: 'SQL query optimization and normalization workshop.', membersCount: 18, subject: 'CSE', isLive: false, scheduledTime: new Date(Date.now() + 86400000) },
    { id: '7', title: 'Digital Logic Circuits', description: 'K-map simplification and sequential circuit design.', membersCount: 14, subject: 'ECE', isLive: true },
  ]);

  const filters = ['All', 'CSE', 'CSBS', 'ECE', 'EEE', 'ME', 'EE', 'Live Only'];

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          group.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const isActuallyLive = group.isLive || roomsGoneLive.includes(group.id);
    const matchesFilter = activeFilter === 'All' 
      ? true 
      : activeFilter === 'Live Only' 
        ? isActuallyLive 
        : group.subject === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCreateRoom = (isLiveNow: boolean) => {
    if (!newRoomData.title.trim()) return;

    const scheduledDate = !isLiveNow && newRoomData.customTime ? new Date(newRoomData.customTime) : undefined;

    const newRoom: StudyGroup = {
      id: Math.random().toString(36).substr(2, 9),
      title: newRoomData.title,
      description: `Collaborative session for ${newRoomData.subject} students.`,
      membersCount: 1,
      subject: newRoomData.subject,
      isLive: isLiveNow,
      scheduledTime: scheduledDate
    };

    setGroups([newRoom, ...groups]);
    setIsCreateModalOpen(false);
    resetForm();
    
    if (isLiveNow && onJoin) {
      onJoin(newRoom);
    } else if (!isLiveNow && onNotify) {
      onNotify(newRoom);
    }
  };

  const resetForm = () => {
    setNewRoomData({ title: '', subject: 'CSE', customTime: '' });
    setShowScheduler(false);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleGroupAction = (group: StudyGroup) => {
    const isActuallyLive = group.isLive || roomsGoneLive.includes(group.id);
    if (isActuallyLive) {
      if (onJoin) onJoin(group);
    } else {
      if (onNotify) onNotify(group);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100 mb-2">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Campus Hub</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Study Rooms</h2>
          <p className="text-slate-500 font-semibold max-w-lg">Join high-intensity focus sessions or schedule collaborative assignment reviews.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-3 bg-indigo-600 text-white px-8 py-5 rounded-[2rem] font-black hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 active:scale-[0.96] w-full md:w-auto h-16 md:h-18 group"
        >
          <div className="bg-white/20 p-1.5 rounded-xl group-hover:rotate-90 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          Host New Room
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by topic, department or room name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-2 border-slate-50 rounded-[1.5rem] pl-14 pr-6 py-4.5 focus:border-indigo-600 focus:bg-white outline-none shadow-sm transition-all font-semibold"
          />
        </div>
        <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 no-scrollbar">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap border-2
                ${activeFilter === f 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' 
                  : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => {
            const isNotified = notifiedRoomIds.includes(group.id);
            const isActuallyLive = group.isLive || roomsGoneLive.includes(group.id);
            return (
              <div key={group.id} className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden hover:shadow-[0_32px_64px_-16px_rgba(79,70,229,0.08)] transition-all duration-500 group relative border-b-[8px] border-b-slate-100/50 flex flex-col">
                <div className="p-8 md:p-12 flex-1">
                  <div className="flex items-center justify-between mb-8">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border 
                      ${isActuallyLive ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
                    >
                      {isActuallyLive ? (
                        <>
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                          Live Session
                        </>
                      ) : (
                        <>
                          <Calendar className="w-3.5 h-3.5" />
                          {group.scheduledTime 
                            ? `Starts at ${group.scheduledTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                            : 'Upcoming'}
                        </>
                      )}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-90" title="Share Room">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-90" title="Room Details">
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <Hash className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{group.subject} Department</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors leading-tight">{group.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-semibold text-sm md:text-lg opacity-80">{group.description}</p>
                  </div>
                </div>

                <div className="px-8 md:px-12 py-8 bg-slate-50/50 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 group/avatars">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-2xl border-[4px] border-white bg-slate-200 shadow-sm overflow-hidden transform group-hover/avatars:translate-x-1 transition-transform">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=peer${i}${group.id}`} alt="Peer" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 text-sm md:text-base">{group.membersCount} AOTians</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">In this Room</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleGroupAction(group)}
                    className={`w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-[1.5rem] font-black transition-all active:scale-[0.96] text-base h-16 md:h-18 min-w-[180px]
                    ${isActuallyLive 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xl shadow-indigo-100' 
                      : isNotified 
                        ? 'bg-emerald-50 border-2 border-emerald-100 text-emerald-600'
                        : 'bg-white border-2 border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                  >
                    {isActuallyLive ? (
                      <><PlayCircle className="w-6 h-6" /> Enter Room</>
                    ) : isNotified ? (
                      <><Check className="w-6 h-6" /> Notified</>
                    ) : (
                      <><Bell className="w-6 h-6" /> Notify Me</>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center bg-white border border-dashed border-slate-200 rounded-[3rem]">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <BookOpen className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-black text-slate-900">No rooms found</h4>
            <button onClick={() => { setActiveFilter('All'); setSearchTerm(''); }} className="mt-6 text-indigo-600 font-black uppercase tracking-widest text-xs hover:underline">Clear all filters</button>
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={handleCloseModal}></div>
          <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 animate-in fade-in zoom-in duration-300 border border-slate-100">
            <button onClick={handleCloseModal} className="absolute top-8 right-8 p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
              <X className="w-6 h-6" />
            </button>
            
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-100">
                  <Terminal className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Host New Room</h3>
                <p className="text-slate-400 font-medium text-sm mt-1">Configure your study session details</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Room Title</label>
                  <input 
                    type="text" 
                    value={newRoomData.title}
                    onChange={(e) => setNewRoomData({...newRoomData, title: e.target.value})}
                    placeholder="e.g. CSBS Marketing Unit 2" 
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Department</label>
                  <select 
                    value={newRoomData.subject}
                    onChange={(e) => setNewRoomData({...newRoomData, subject: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold"
                  >
                    <option value="CSE">CSE</option>
                    <option value="CSBS">CSBS</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="ME">ME</option>
                    <option value="EE">EE</option>
                  </select>
                </div>

                {!showScheduler ? (
                  <button 
                    onClick={() => setShowScheduler(true)}
                    className="w-full flex items-center justify-center gap-3 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-black text-xs uppercase tracking-widest hover:border-indigo-300 hover:text-indigo-600 transition-all"
                  >
                    <CalendarClock className="w-4 h-4" />
                    Customize timing for when the room goes live
                  </button>
                ) : (
                  <div className="space-y-3 p-6 bg-indigo-50/50 border border-indigo-100 rounded-3xl animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest ml-2">Scheduled Time</label>
                      <button onClick={() => setShowScheduler(false)} className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest">Cancel Schedule</button>
                    </div>
                    <input 
                      type="datetime-local" 
                      value={newRoomData.customTime}
                      onChange={(e) => setNewRoomData({...newRoomData, customTime: e.target.value})}
                      className="w-full bg-white border-2 border-white rounded-xl px-5 py-3.5 focus:border-indigo-600 outline-none transition-all font-bold text-slate-700 shadow-sm" 
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleCreateRoom(showScheduler ? false : true)}
                  disabled={!newRoomData.title.trim() || (showScheduler && !newRoomData.customTime)}
                  className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {showScheduler ? <Clock className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
                  {showScheduler ? 'Schedule Room' : 'Start Now Live'}
                </button>
                <button 
                  onClick={handleCloseModal}
                  className="w-full bg-slate-50 text-slate-500 py-5 rounded-2xl font-black text-lg hover:bg-slate-100 active:scale-95 transition-all border border-slate-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyGroups;
