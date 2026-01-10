
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Smile, Paperclip, MoreVertical, CheckCheck, ChevronLeft } from 'lucide-react';
import { Peer, P2PMessage, User } from '../types';

interface PrivateChatProps {
  peer: Peer;
  currentUser: User;
  onClose: () => void;
  onNewMessageReceived?: (msg: P2PMessage) => void;
}

const PrivateChat: React.FC<PrivateChatProps> = ({ peer, currentUser, onClose, onNewMessageReceived }) => {
  const [messages, setMessages] = useState<P2PMessage[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`chat_${peer.id}`);
    if (saved) {
      setMessages(JSON.parse(saved).map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
    } else {
      const initial: P2PMessage = {
        id: 'init_' + peer.id,
        senderId: peer.id,
        receiverId: currentUser.id,
        content: `Hey ${currentUser.name.split(' ')[0]}! I saw you're from ${currentUser.college}. Want to collaborate on some projects?`,
        timestamp: new Date()
      };
      setMessages([initial]);
    }
  }, [peer.id, currentUser]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (messages.length > 0) {
      localStorage.setItem(`chat_${peer.id}`, JSON.stringify(messages));
    }
  }, [messages, peer.id]);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const isToday = now.toDateString() === date.toDateString();
    
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = yesterday.toDateString() === date.toDateString();

    if (isToday) return `Today, ${timeStr}`;
    if (isYesterday) return `Yesterday, ${timeStr}`;
    
    return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${timeStr}`;
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const newMessage: P2PMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: peer.id,
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    setTimeout(() => {
      const reply: P2PMessage = {
        id: (Date.now() + 1).toString(),
        senderId: peer.id,
        receiverId: currentUser.id,
        content: "That sounds great! I'm usually free after labs. Let's coordinate.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, reply]);
      if (onNewMessageReceived) {
        onNewMessageReceived(reply);
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 lg:inset-auto lg:bottom-0 lg:right-4 lg:w-[400px] lg:h-[600px] bg-white lg:shadow-2xl lg:rounded-t-3xl border-l border-slate-200 lg:border flex flex-col z-[70] animate-in slide-in-from-bottom lg:slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 md:p-5 border-b border-slate-100 flex items-center justify-between bg-indigo-600 lg:rounded-t-3xl text-white pt-[calc(1rem+env(safe-area-inset-top))] lg:pt-5">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="lg:hidden p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="relative">
            <img src={peer.avatar} alt={peer.name} className="w-10 h-10 md:w-12 md:h-12 rounded-2xl border-2 border-white/20" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-indigo-600"></div>
          </div>
          <div>
            <h4 className="font-black text-sm md:text-base leading-tight">{peer.name}</h4>
            <p className="text-[10px] text-indigo-100 font-bold uppercase tracking-wider">{peer.subject}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2.5 hover:bg-white/10 rounded-xl transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
          <button onClick={onClose} className="hidden lg:block p-2.5 hover:bg-white/10 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 bg-slate-50/50 no-scrollbar"
      >
        <div className="text-center py-6">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
            Encrypted AOT Session
          </span>
        </div>
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1 duration-300`}
          >
            <div className={`max-w-[85%] rounded-[1.75rem] px-5 py-3.5 shadow-sm text-sm font-medium ${
              msg.senderId === currentUser.id 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              <div className={`flex items-center gap-1.5 mt-2 justify-end opacity-60 ${
                msg.senderId === currentUser.id ? 'text-indigo-100' : 'text-slate-400'
              }`}>
                <span className="text-[9px] font-black uppercase whitespace-nowrap">
                  {formatTimestamp(msg.timestamp)}
                </span>
                {msg.senderId === currentUser.id && <CheckCheck className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <form 
        onSubmit={handleSendMessage} 
        className="p-4 md:p-6 bg-white border-t border-slate-100 pb-[calc(1rem+env(safe-area-inset-bottom))] lg:pb-6"
      >
        <div className="flex items-center gap-3">
          <button type="button" className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all active:scale-90">
            <Smile className="w-6 h-6" />
          </button>
          <div className="relative flex-1">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] px-6 py-4 pr-12 focus:bg-white focus:border-indigo-600 focus:ring-8 focus:ring-indigo-50 outline-none transition-all text-sm font-black text-slate-700 h-14"
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-600 active:scale-90">
              <Paperclip className="w-5 h-5" />
            </button>
          </div>
          <button 
            type="submit"
            disabled={!input.trim()}
            className="p-4 bg-indigo-600 text-white rounded-[1.25rem] hover:bg-indigo-700 active:scale-90 disabled:opacity-50 transition-all shadow-xl shadow-indigo-100"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrivateChat;
