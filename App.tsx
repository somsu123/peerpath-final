
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
import LandingPage from './components/LandingPage';
import { BookOpen, Users, Layout, MessageSquare, Library, GraduationCap, Calendar } from 'lucide-react';

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

  // Protected Routes Logic
  useEffect(() => {
    if (!currentUser && activeTab !== 'home') {
      setActiveTab('home');
      setIsAuthModalOpen(true);
      addNotification({
        type: 'alert',
        title: 'Authentication Required',
        message: 'Please log in to access this feature.'
      });
    }
  }, [activeTab, currentUser]);

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
          <LandingPage
            onNavigate={setActiveTab}
            onAuth={() => setIsAuthModalOpen(true)}
            currentUser={currentUser}
          />
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
                onClick={() => {
                  if (!currentUser && tab.id !== 'home') {
                    setIsAuthModalOpen(true);
                    return;
                  }
                  setActiveTab(tab.id as AppTab);
                }}
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
