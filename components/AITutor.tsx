
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, RefreshCw, Sparkles, ChevronLeft } from 'lucide-react';
import { askAITutor } from '../services/geminiService';
import { ChatMessage } from '../types';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hi! I'm PeerPath AI. I'm optimized with AOT departmental data. How can I help with your studies today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await askAITutor(input);
    
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      content: aiResponse,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col bg-white md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-100/50 border border-slate-100 transition-all">
      {/* Header */}
      <div className="bg-indigo-600 px-6 py-5 md:py-6 flex items-center justify-between shadow-lg shadow-indigo-100 relative z-20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/20 rounded-xl shadow-inner">
            <Bot className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-black text-lg tracking-tight">AOT AI Tutor</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
              <span className="text-indigo-100 text-[10px] font-black uppercase tracking-widest">Advanced Mode</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button 
            onClick={() => setMessages([messages[0]])}
            className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Reset Chat"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/30 scroll-smooth no-scrollbar"
      >
        <div className="text-center pb-4">
           <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
             Session Started: {new Date().toLocaleDateString()}
           </span>
        </div>
        
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`flex gap-3 md:gap-4 max-w-[92%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 md:w-11 md:h-11 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-md
                ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-white border border-slate-100'}`}
              >
                {msg.role === 'user' ? <User className="text-white w-5 h-5" /> : <Sparkles className="text-indigo-600 w-5 h-5" />}
              </div>
              <div className={`p-4 md:p-6 rounded-[1.75rem] shadow-sm leading-relaxed text-sm md:text-base
                ${msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}
              >
                <div className="prose prose-slate prose-sm md:prose-base max-w-none whitespace-pre-wrap font-medium">
                  {msg.content}
                </div>
                <div className={`text-[9px] mt-3 font-black uppercase tracking-widest opacity-40 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center">
                <Bot className="text-indigo-400 w-5 h-5" />
              </div>
              <div className="bg-white border border-slate-100 p-4 md:px-6 md:py-4 rounded-3xl rounded-tl-none flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                <span className="text-slate-400 text-sm font-bold tracking-tight">PeerPath AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 md:p-8 bg-white border-t border-slate-100 relative z-20">
        <div className="max-w-4xl mx-auto flex items-end gap-3">
          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask me anything..."
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.75rem] px-6 py-4 pr-14 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none min-h-[56px] h-[56px] max-h-32 text-sm font-semibold text-slate-700 placeholder:text-slate-300 shadow-inner"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2.5 bottom-1.5 p-2.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:bg-slate-200 disabled:shadow-none transition-all shadow-lg shadow-indigo-100 active:scale-90"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <p className="text-center text-[9px] font-bold text-slate-300 mt-4 uppercase tracking-[0.2em]">
          Powered by Gemini • Department Optimized
        </p>
      </div>
    </div>
  );
};

export default AITutor;
