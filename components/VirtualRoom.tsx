
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic, MicOff, Video, VideoOff, Hand,
  MessageSquare, Settings, LogOut, Send,
  Share2, Terminal, X
} from 'lucide-react';
import { StudyGroup, User } from '../types';

interface VirtualRoomProps {
  room: StudyGroup;
  user: User;
  onLeave: () => void;
}

const VirtualRoom: React.FC<VirtualRoomProps> = ({ room, user, onLeave }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ user: string, text: string, time: string }[]>([
    { user: 'Arjun Das', text: 'Hey everyone, starting with the linked list part now.', time: '10:05 AM' },
    { user: 'Sneha Bose', text: 'Should we review the doubly linked list too?', time: '10:07 AM' },
  ]);

  const localStreamRef = useRef<MediaStream | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  // Callback ref for the local video element to ensure stream attachment even after DOM re-renders
  const setLocalVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoElementRef.current = node;
    if (node && localStreamRef.current && isVideoOn) {
      node.srcObject = localStreamRef.current;
    }
  }, [isVideoOn]);

  // Initialize Media on Join
  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        localStreamRef.current = stream;
        if (videoElementRef.current && isVideoOn) {
          videoElementRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setIsVideoOn(false);
        setIsMuted(true);
      }
    };

    startMedia();

    return () => {
      localStreamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  // Update Track States
  useEffect(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => track.enabled = !isMuted);
    }
  }, [isMuted]);

  useEffect(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = isVideoOn;
      });
      // Force re-attach stream if video turned back on
      if (isVideoOn && videoElementRef.current && !videoElementRef.current.srcObject) {
        videoElementRef.current.srcObject = localStreamRef.current;
      }
    }
  }, [isVideoOn]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChatMessages([...chatMessages, {
      user: user.name.split(' ')[0],
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setMessage('');
  };

  const participants = [
    { name: user.name, avatar: user.avatar, isMe: true, isMuted: isMuted, isVideoOn: isVideoOn, isHandRaised: isHandRaised },
    { name: 'Arjun Das', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun', isMuted: false, isVideoOn: true, isHandRaised: false },
    { name: 'Sneha Bose', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha', isMuted: true, isVideoOn: true, isHandRaised: true },
    { name: 'Rahul Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul', isMuted: false, isVideoOn: false, isHandRaised: false },
    { name: 'Priya Mukherjee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', isMuted: false, isVideoOn: true, isHandRaised: false },
    { name: 'Sayan Ghosh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sayan', isMuted: true, isVideoOn: false, isHandRaised: false },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col text-white font-sans overflow-hidden">
      {/* Top Bar */}
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-black text-sm md:text-base tracking-tight leading-none">{room.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{room.subject} • Live Room</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center -space-x-2">
            {participants.slice(0, 4).map((p, i) => (
              <img key={i} src={p.avatar} className="w-8 h-8 rounded-full border-2 border-slate-900" alt={p.name} />
            ))}
            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">
              +{participants.length}
            </div>
          </div>
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-black transition-all border border-white/5 uppercase tracking-widest">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      {/* Grid Area - Simplified layout without Screen Share */}
      <div className="flex-1 flex overflow-hidden">
        <div className={`flex-1 p-2 md:p-6 transition-all duration-300 ${showChat ? 'md:mr-[350px]' : ''}`}>
          <div className="h-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 auto-rows-fr">
            {participants.map((p, i) => (
              <div key={i} className={`relative rounded-3xl overflow-hidden bg-slate-900 border border-white/5 group ${p.isMe ? 'ring-2 ring-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.2)]' : ''}`}>
                {p.isVideoOn ? (
                  <div className="w-full h-full relative">
                    {p.isMe ? (
                      <video
                        ref={setLocalVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover mirror-mode"
                      />
                    ) : (
                      <div className="w-full h-full relative">
                        <img
                          src={`https://images.unsplash.com/photo-${1500000000000 + (i * 100)}?auto=format&fit=crop&w=800&q=60`}
                          className="w-full h-full object-cover opacity-60"
                          alt="peer-video"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img src={p.avatar} className="w-20 h-20 rounded-full border-4 border-white/20" alt={p.name} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-slate-900">
                    <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center border-2 border-white/5 text-3xl font-black text-white/20">
                      {p.name.charAt(0)}
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Feed Disabled</span>
                  </div>
                )}

                {/* Hand Raise Overlay */}
                {p.isHandRaised && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-white p-2.5 rounded-2xl shadow-xl animate-bounce z-10 border border-amber-400">
                    <Hand className="w-5 h-5 fill-white" />
                  </div>
                )}

                {/* Info Bar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest">{p.name} {p.isMe && '(You)'}</span>
                    {p.isMuted && <MicOff className="w-3 h-3 text-red-500" />}
                  </div>

                  {!p.isMuted && (
                    <div className="flex items-end gap-0.5 h-3">
                      <div className="w-0.5 bg-green-500 animate-[pulse_0.4s_infinite_0.1s]"></div>
                      <div className="w-0.5 bg-green-500 animate-[pulse_0.4s_infinite_0.3s]"></div>
                      <div className="w-0.5 bg-green-500 animate-[pulse_0.4s_infinite_0.2s]"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Sidebar - Mobile Overlay, Desktop Sidebar */}
        <div className={`fixed inset-x-0 md:right-0 md:left-auto top-16 bottom-24 md:top-16 md:bottom-24 w-full md:w-[350px] bg-slate-900/95 md:bg-slate-900 backdrop-blur-lg md:backdrop-blur-none border-t md:border-t-0 md:border-l border-white/5 flex flex-col transition-transform duration-300 ${showChat ? 'translate-x-0' : 'translate-x-full'} z-10`}>
          <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs md:text-[10px] font-black uppercase tracking-widest">In-Room Chat</h3>
            </div>
            <button onClick={() => setShowChat(false)} className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 no-scrollbar">
            {chatMessages.map((m, i) => (
              <div key={i} className="flex flex-col gap-1.5 animate-in slide-in-from-right-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{m.user}</span>
                  <span className="text-[8px] text-slate-500 font-bold">{m.time}</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-3.5 text-xs font-medium text-slate-300 border border-white/5">
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 md:p-6 pt-0">
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Chat with peers..."
                className="w-full bg-slate-800 border border-white/5 rounded-2xl px-5 py-3.5 text-xs font-medium outline-none focus:border-indigo-500 transition-all"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-indigo-500 hover:text-indigo-400 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-24 bg-slate-900 border-t border-white/5 px-6 md:px-12 flex items-center justify-between relative z-20">
        <div className="hidden lg:flex items-center gap-4 w-[250px]">
          <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center text-lg font-black shadow-lg shadow-indigo-500/20">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-black tracking-tight">{user.name}</p>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">AOT Peer</p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 flex-1 justify-center">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all active:scale-95 ${isMuted ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-slate-800 text-white border border-white/10 hover:bg-slate-700'}`}
          >
            {isMuted ? <MicOff className="w-5 h-5 md:w-6 md:h-6" /> : <Mic className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all active:scale-95 ${!isVideoOn ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-slate-800 text-white border border-white/10 hover:bg-slate-700'}`}
          >
            {!isVideoOn ? <VideoOff className="w-5 h-5 md:w-6 md:h-6" /> : <Video className="w-5 h-5 md:w-6 md:h-6" />}
          </button>

          <div className="w-px h-8 bg-white/10 mx-2 hidden md:block"></div>

          <button
            onClick={() => setIsHandRaised(!isHandRaised)}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all active:scale-95 ${isHandRaised ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-slate-800 text-white border border-white/10 hover:bg-slate-700'}`}
          >
            <Hand className={`w-5 h-5 md:w-6 md:h-6 ${isHandRaised ? 'fill-white' : ''}`} />
          </button>
          <button
            onClick={() => setShowChat(!showChat)}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all active:scale-95 ${showChat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800 text-white border border-white/10'}`}
          >
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button onClick={onLeave} className="bg-red-600 text-white px-6 md:px-8 h-12 md:h-14 rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 ml-2 active:scale-95">
            Leave Room
          </button>
        </div>

        <div className="hidden lg:flex items-center justify-end gap-3 w-[250px]">
          <button className="p-3.5 bg-slate-800 rounded-xl text-white/40 hover:text-white transition-colors border border-white/5"><Settings className="w-5 h-5" /></button>
        </div>
      </div>

      <style>{`
        .mirror-mode { transform: scaleX(-1); }
        @keyframes pulse { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(2); } }
      `}</style>
    </div>
  );
};

export default VirtualRoom;
