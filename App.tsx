
import React, { useState, useEffect, useCallback } from 'react';
import { AppTab, User as UserType, Peer, AppNotification, StudyGroup } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PeerFinder from './components/PeerFinder';
import StudyGroups from './components/StudyGroups';
import AITutor from './components/AITutor';
import AuthModal from './components/AuthModal';
import PrivateChat from './components/PrivateChat';
import ResourceHub from './components/ResourceHub';
import VirtualRoom from './components/VirtualRoom';
import ProfileSettings from './components/ProfileSettings';
import CampusHub from './components/CampusHub';
import SyllabusTracker from './components/SyllabusTracker';
import AOTCalendar from './components/AOTCalendar';
import { BookOpen, Users, Layout, Zap, CheckCircle, MessageSquare, Library, ArrowRight, Trophy, GraduationCap, Calendar } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activePeerChat, setActivePeerChat] = useState<Peer | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [activeRoom, setActiveRoom] = useState<StudyGroup | null>(null);
  const [notifiedRoomIds, setNotifiedRoomIds] = useState<string[]>([]);
  const [roomsGoneLive, setRoomsGoneLive] = useState<string[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('peerpath_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
    const savedNotifications = localStorage.getItem('peerpath_notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    const savedNotified = localStorage.getItem('peerpath_notified_rooms');
    if (savedNotified) {
      setNotifiedRoomIds(JSON.parse(savedNotified));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('peerpath_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('peerpath_notified_rooms', JSON.stringify(notifiedRoomIds));
  }, [notifiedRoomIds]);

  const addNotification = useCallback((n: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: AppNotification = {
      ...n,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      isRead: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const handleClearNotifications = () => setNotifications([]);
  const handleReadNotification = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    const newUser: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      college: 'Academy of Technology',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
      department: 'CSE',
      year: '3rd Year'
    };
    setCurrentUser(newUser);
    localStorage.setItem('peerpath_user', JSON.stringify(newUser));
    addNotification({
      type: 'follow',
      title: 'Welcome onboard!',
      message: `Hey ${userData.name.split(' ')[0]}, you're now part of the AOT PeerPath network.`
    });
  };

  const handleUpdateProfile = (updatedUser: UserType) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('peerpath_user', JSON.stringify(updatedUser));

    // Also update in registry for login persistence
    const allUsers = JSON.parse(localStorage.getItem('peerpath_registry') || '[]');
    const userIndex = allUsers.findIndex((u: any) => u.email === updatedUser.email);
    if (userIndex !== -1) {
      allUsers[userIndex] = { ...allUsers[userIndex], name: updatedUser.name };
      localStorage.setItem('peerpath_registry', JSON.stringify(allUsers));
    }

    addNotification({
      type: 'follow',
      title: 'Profile Updated',
      message: 'Your account settings have been successfully saved.'
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('peerpath_user');
    setActiveTab('home');
    setActivePeerChat(null);
    setActiveRoom(null);
    setIsSettingsOpen(false);
  };

  const handleStartPeerChat = (peer: Peer) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setActivePeerChat(peer);
  };

  const handleFollowPeer = (peer: Peer) => {
    addNotification({
      type: 'follow',
      title: 'New Connection',
      message: `You started following ${peer.name}. They will be notified.`
    });
  };

  const handleJoinGroup = (group: StudyGroup) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setActiveRoom(group);
    addNotification({
      type: 'invite',
      title: 'Room Entered',
      message: `You've joined "${group.title}". Stay focused!`
    });
  };

  const handleNotifyRoom = (group: StudyGroup) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    if (notifiedRoomIds.includes(group.id)) return;

    setNotifiedRoomIds(prev => [...prev, group.id]);
    addNotification({
      type: 'invite',
      title: 'Notification Set',
      message: `We'll alert you when "${group.title}" goes live.`
    });

    // Simulate room going live after a delay
    setTimeout(() => {
      setNotifiedRoomIds(prev => prev.filter(id => id !== group.id));
      setRoomsGoneLive(prev => [...prev, group.id]);

      addNotification({
        type: 'invite',
        title: 'Room Now Live!',
        message: `"${group.title}" is now active. Join your peers!`,
        link: 'groups'
      });
    }, 8000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-12 md:space-y-32">
            <Hero
              onStart={() => currentUser ? setActiveTab('peers') : setIsAuthModalOpen(true)}
              onExploreHub={() => setActiveTab('campus-hub')}
            />

            <section className="max-w-7xl mx-auto px-5 md:px-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-3 block">Campus Clusters</span>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Department Hubs</h2>
                </div>
                <button onClick={() => setActiveTab('groups')} className="flex items-center gap-2 text-indigo-600 font-black uppercase text-xs tracking-widest hover:gap-4 transition-all">
                  Browse All Rooms <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                {[
                  { name: 'CSE', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80', active: 42 },
                  { name: 'CSBS', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80', active: 22 },
                  { name: 'ECE', img: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=400&q=80', active: 19 },
                  { name: 'EEE', img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80', active: 16 },
                  { name: 'ME', img: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=400&q=80', active: 12 },
                  { name: 'EE', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80', active: 15 },
                ].map((dept, i) => (
                  <div key={i} className="group relative h-72 md:h-96 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl shadow-slate-200/50">
                    <img src={dept.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={dept.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-black text-white tracking-tighter mb-1">{dept.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{dept.active} Active Rooms</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="max-w-6xl mx-auto px-5 md:px-10">
              <div className="text-center mb-16 md:mb-24">
                <span className="text-[10px] md:text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4 block">Engineered for AOT</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-5 tracking-tight">Elevate your learning.</h2>
                <p className="text-slate-500 max-w-2xl mx-auto font-medium md:text-lg leading-relaxed">
                  Bridge the gap between departmental silos with a unified learning architecture.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Users className="w-8 h-8 text-indigo-600" />,
                    title: 'Peer Finder',
                    desc: 'Directly connect with high-achievers from all departments.',
                    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80'
                  },
                  {
                    icon: <Zap className="w-8 h-8 text-amber-500" />,
                    title: 'AI Assistant',
                    desc: 'Gemini-powered tutor tailored to MAKAUT curriculum patterns.',
                    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80'
                  },
                  {
                    icon: <Layout className="w-8 h-8 text-emerald-500" />,
                    title: 'Live Rooms',
                    desc: 'Real-time collaborative sessions for lab prep and assignments.',
                    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80'
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="bg-white rounded-[3rem] border border-slate-100 hover:border-indigo-100 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] transition-all duration-500 group overflow-hidden flex flex-col">
                    <div className="h-48 overflow-hidden relative">
                      <img src={feature.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-80" alt={feature.title} />
                      <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply"></div>
                      <div className="absolute top-6 left-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                        {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-7 h-7' })}
                      </div>
                    </div>
                    <div className="p-10 flex-1">
                      <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                      <p className="text-slate-500 leading-relaxed font-semibold text-sm md:text-base">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {currentUser && (
                <div className="mt-20 md:mt-32 p-8 md:p-14 rounded-[4rem] bg-indigo-600 text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl shadow-indigo-200 relative overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1498243639359-2cd19655a1ef?auto=format&fit=crop&w=800&q=80"
                    className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-1000"
                    alt="Study Banner"
                  />
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center text-center md:text-left relative z-10">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center border border-white/20 shadow-inner">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Campus Verified</h3>
                      <p className="text-indigo-100 text-base md:text-xl font-medium opacity-90">Ready for a study session, {currentUser.name.split(' ')[0]}?</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('groups')} className="bg-white text-indigo-600 px-12 py-6 rounded-2xl font-black text-lg hover:bg-slate-50 active:scale-95 transition-all shadow-2xl shadow-indigo-900/20 w-full lg:w-auto relative z-10">
                    Join Live Room
                  </button>
                </div>
              )}
            </section>
          </div>
        );
      case 'peers':
        return <div className="pt-24 md:pt-32 px-5 md:px-10 pb-20 md:pb-12"><PeerFinder onChatStart={handleStartPeerChat} onFollow={handleFollowPeer} /></div>;
      case 'groups':
        return <div className="pt-24 md:pt-32 px-5 md:px-10 pb-20 md:pb-12"><StudyGroups onJoin={handleJoinGroup} onNotify={handleNotifyRoom} notifiedRoomIds={notifiedRoomIds} roomsGoneLive={roomsGoneLive} /></div>;
      case 'ai-tutor':
        return <div className="pt-20 md:pt-32 px-4 md:px-10 pb-24 md:pb-12 h-[calc(100dvh)]"><AITutor /></div>;
      case 'resources':
        return <div className="pt-24 md:pt-32 px-5 md:px-10 pb-24 md:pb-12"><ResourceHub /></div>;
      case 'campus-hub':
        return <div className="pt-24 md:pt-32 px-5 md:px-10 pb-24 md:pb-12"><CampusHub /></div>;
      case 'syllabus-tracker':
        return <div className="pt-24 md:pt-32 px-5 md:px-10 pb-24 md:pb-12"><SyllabusTracker /></div>;
      case 'aot-calendar':
        return <div className="pt-24 md:pt-32 px-5 md:px-10 pb-24 md:pb-12"><AOTCalendar currentUser={currentUser} /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {!activeRoom && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          onAuthClick={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          onSettingsClick={() => setIsSettingsOpen(true)}
          notifications={notifications}
          onClearNotifications={handleClearNotifications}
          onReadNotification={handleReadNotification}
        />
      )}

      <main className={`container mx-auto relative z-10 transition-all duration-300 ${activeRoom ? '' : 'pt-0'}`}>
        {renderContent()}
      </main>

      {!activeRoom && (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-2xl border-t border-slate-100 px-3 pb-safe pt-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between gap-1 min-w-max">
            {[
              { id: 'home', icon: <Layout className="w-5 h-5" />, label: 'Home' },
              { id: 'peers', icon: <Users className="w-5 h-5" />, label: 'Peers' },
              { id: 'groups', icon: <BookOpen className="w-5 h-5" />, label: 'Groups' },
              { id: 'ai-tutor', icon: <MessageSquare className="w-5 h-5" />, label: 'AI' },
              { id: 'syllabus-tracker', icon: <GraduationCap className="w-5 h-5" />, label: 'Syllabus' },
              { id: 'aot-calendar', icon: <Calendar className="w-5 h-5" />, label: 'Events' },
              { id: 'resources', icon: <Library className="w-5 h-5" />, label: 'Files' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AppTab)}
                className={`flex flex-col items-center gap-1 transition-all px-3 py-1 flex-shrink-0
                ${activeTab === tab.id ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${activeTab === tab.id ? 'bg-indigo-50' : ''}`}>
                  {tab.icon}
                </div>
                <span className="text-[9px] font-bold tracking-tight whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {currentUser && (
        <ProfileSettings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          user={currentUser}
          onUpdate={handleUpdateProfile}
          onLogout={handleLogout}
        />
      )}

      {activePeerChat && currentUser && (
        <PrivateChat
          peer={activePeerChat}
          currentUser={currentUser}
          onClose={() => setActivePeerChat(null)}
          onNewMessageReceived={(msg) => addNotification({
            type: 'message',
            title: activePeerChat.name,
            message: msg.content
          })}
        />
      )}

      {activeRoom && currentUser && (
        <VirtualRoom
          room={activeRoom}
          user={currentUser}
          onLeave={() => setActiveRoom(null)}
        />
      )}

      {!activeRoom && (
        <footer className="hidden md:block border-t border-slate-100 bg-white py-24 px-10 mt-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500"></div>
          <div className="max-w-6xl mx-auto grid grid-cols-4 gap-12">
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-600 p-2 rounded-xl">
                  <BookOpen className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tighter">PeerPath</span>
              </div>
              <p className="text-slate-500 font-semibold leading-relaxed mb-6">
                Empowering the student community at Academy of Technology through AI and peer collaboration.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer"></div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8">Academic</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li className="hover:text-indigo-600 cursor-pointer transition-all" onClick={() => setActiveTab('syllabus-tracker')}>Syllabus Tracker</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-all" onClick={() => setActiveTab('aot-calendar')}>AOT Calendar</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-all" onClick={() => setActiveTab('resources')}>Resource Hub</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8">Platform</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li className="hover:text-indigo-600 cursor-pointer transition-all" onClick={() => setActiveTab('peers')}>Peer Finder</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-all" onClick={() => setActiveTab('groups')}>Study Groups</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-all" onClick={() => setActiveTab('campus-hub')}>Campus Hub</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8">Community</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li className="hover:text-indigo-600 cursor-pointer transition-all">Student Council</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-all">Tech Clubs</li>
                <li className="hover:text-indigo-600 cursor-pointer transition-all">Support</li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-20 pt-10 border-t border-slate-50 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <p>© 2024 PeerPath AOT Chapter. All Rights Reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-slate-600 cursor-pointer">Privacy</span>
              <span className="hover:text-slate-600 cursor-pointer">Terms</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
