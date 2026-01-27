
import React, { useState } from 'react';
import { AppTab, User as UserType, AppNotification } from '../types';
import { BookOpen, Users, Layout, MessageSquare, Library, LogOut, User, Bell, Trash2, Settings, Calendar, GraduationCap } from 'lucide-react';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  currentUser: UserType | null;
  onAuthClick: () => void;
  onLogout: () => void;
  onSettingsClick?: () => void;
  notifications: AppNotification[];
  onClearNotifications: () => void;
  onReadNotification: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onAuthClick,
  onLogout,
  onSettingsClick,
  notifications,
  onClearNotifications,
  onReadNotification
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const tabs: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Dashboard', icon: <Layout className="w-5 h-5" /> },
    { id: 'peers', label: 'Find Peers', icon: <Users className="w-5 h-5" /> },
    { id: 'groups', label: 'Study Groups', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'ai-tutor', label: 'AI Tutor', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'resources', label: 'Resources', icon: <Library className="w-5 h-5" /> },
    { id: 'syllabus-tracker', label: 'Syllabus', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'aot-calendar', label: 'Calendar', icon: <Calendar className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] glass-effect border-b border-slate-100 h-16 md:h-20 flex items-center px-4 md:px-10 transition-all">
      <div className="flex items-center gap-3 mr-auto" onClick={() => setActiveTab('home')}>
        <img src="/logo.png" alt="PeerPath" className="h-14 md:h-16 lg:h-20 w-auto object-contain cursor-pointer transition-all duration-300 hover:scale-105" />
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center gap-2 bg-slate-50/50 p-1.5 rounded-2xl border border-slate-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (!currentUser && tab.id !== 'home') {
                onAuthClick();
                return;
              }
              setActiveTab(tab.id);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all text-sm font-bold
              ${activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-100'
                : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        {currentUser && (
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 md:p-3 rounded-xl bg-white border border-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all active:scale-90 relative"
            >
              <Bell className="w-5 h-5 md:w-6 md:h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 md:w-5 md:h-5 bg-red-500 text-white text-[8px] md:text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)}></div>
                <div className="fixed left-4 right-4 top-[72px] md:absolute md:top-[calc(100%+12px)] md:left-auto md:right-0 md:w-[380px] bg-white border border-slate-100 rounded-3xl shadow-2xl py-4 flex flex-col z-20 animate-in slide-in-from-top-2 duration-200 overflow-hidden">
                  <div className="px-6 py-2 flex items-center justify-between border-b border-slate-50 pb-4">
                    <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest">Notifications</h5>
                    {notifications.length > 0 && (
                      <button onClick={onClearNotifications} className="text-[10px] font-black text-slate-400 hover:text-red-500 flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Clear All
                      </button>
                    )}
                  </div>
                  <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="p-10 text-center">
                        <Bell className="w-8 h-8 text-slate-100 mx-auto mb-3" />
                        <p className="text-xs font-bold text-slate-400">All caught up!</p>
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => { onReadNotification(n.id); setShowNotifications(false); }}
                          className={`px-6 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors relative
                            ${!n.isRead ? 'bg-indigo-50/30' : ''}`}
                        >
                          {!n.isRead && <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>}
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{n.type}</span>
                            <h6 className="text-sm font-black text-slate-900 leading-tight">{n.title}</h6>
                            <p className="text-xs font-semibold text-slate-500 line-clamp-2 mt-0.5">{n.message}</p>
                            <span className="text-[9px] font-bold text-slate-300 mt-2">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {currentUser ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-bold text-slate-900 leading-none">{currentUser.name.split(' ')[0]}</span>
              <span className="text-[10px] text-slate-400 font-medium">Verified Student</span>
            </div>
            <div className="group relative">
              <button className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-indigo-600 overflow-hidden shadow-sm active:scale-95 transition-all">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>
              <div className="absolute top-[120%] right-0 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all z-[70]">
                <div className="px-4 py-3 border-b border-slate-50">
                  <p className="text-sm font-black text-slate-900">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium truncate">{currentUser.email}</p>
                </div>
                <button
                  onClick={onSettingsClick}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Account Settings
                </button>
                <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 md:gap-3">
            <button
              onClick={onAuthClick}
              className="text-slate-500 px-3 md:px-5 py-2.5 rounded-xl text-xs md:text-sm font-black hover:text-indigo-600 transition-all active:scale-95"
            >
              Log In
            </button>
            <button
              onClick={onAuthClick}
              className="bg-indigo-600 text-white px-5 md:px-8 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-95"
            >
              Join Path
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
