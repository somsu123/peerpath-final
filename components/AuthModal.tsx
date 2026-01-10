
import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User as UserIcon, ShieldCheck, ArrowRight, Loader2, CheckCircle2, Bell, AlertCircle, HelpCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

type AuthStep = 'initial' | 'signup' | 'login' | 'otp' | 'success';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<AuthStep>('initial');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

  const DEMO_OTP = '123456';

  useEffect(() => {
    if (!isOpen) {
      setStep('initial');
      setEmail('');
      setName('');
      setPassword('');
      setOtp(['', '', '', '', '', '']);
      setError('');
      setShowToast(false);
    }
  }, [isOpen]);

  const validateEmail = (email: string) => {
    return email.toLowerCase().endsWith('.edu.in');
  };

  const checkUserExists = (email: string) => {
    const allUsers = JSON.parse(localStorage.getItem('peerpath_registry') || '[]');
    return allUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      setError('Only .edu.in emails from AOT are permitted.');
      return;
    }
    const existingUser = checkUserExists(email);
    if (existingUser) {
      setIsNewUser(false);
      setName(existingUser.name);
      setStep('login');
    } else {
      setIsNewUser(true);
      setStep('signup');
    }
  };

  const triggerOtpSimulation = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 8000);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    triggerOtpSimulation();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const existingUser = checkUserExists(email);
    if (existingUser && existingUser.password === password) {
      triggerOtpSimulation();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) document.getElementById(`otp-${index - 1}`)?.focus();
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      if (otp.join('') === DEMO_OTP) {
        if (isNewUser) {
          const allUsers = JSON.parse(localStorage.getItem('peerpath_registry') || '[]');
          allUsers.push({ email, name, password });
          localStorage.setItem('peerpath_registry', JSON.stringify(allUsers));
        }
        setStep('success');
        setTimeout(() => {
          onSuccess({ name, email });
          onClose();
        }, 2000);
      } else {
        setError(`Invalid code. Try ${DEMO_OTP}.`);
        setOtp(['', '', '', '', '', '']);
        document.getElementById('otp-0')?.focus();
      }
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 pb-safe">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={onClose}></div>
      
      {showToast && (
        <div className="fixed top-6 right-6 z-[110] animate-in slide-in-from-right duration-500 max-w-sm w-[calc(100%-48px)]">
          <div className="bg-white border-l-4 border-indigo-600 shadow-2xl rounded-2xl p-5 flex items-start gap-4 ring-1 ring-slate-200">
            <div className="bg-indigo-100 p-3 rounded-2xl shrink-0"><Bell className="w-6 h-6 text-indigo-600" /></div>
            <div className="flex-1">
              <p className="text-sm font-black text-slate-900">PeerPath Secure</p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed font-semibold">Verification Code: <span className="font-black text-indigo-600 text-lg ml-1">{DEMO_OTP}</span></p>
            </div>
            <button onClick={() => setShowToast(false)} className="p-1"><X className="w-4 h-4 text-slate-400" /></button>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-slate-100 flex flex-col max-h-[90dvh]">
        <button onClick={onClose} className="absolute top-6 right-6 p-3 text-slate-400 hover:text-slate-600 rounded-2xl bg-slate-50 active:scale-90 transition-all z-10">
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12 overflow-y-auto no-scrollbar">
          {step === 'initial' && (
            <div className="space-y-10">
              <div className="text-center">
                <div className="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-100 rotate-3">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Student Portal</h2>
                <p className="text-slate-500 text-sm mt-3 font-semibold px-4">Authorized access for Academy of Technology</p>
              </div>

              <form onSubmit={handleInitialSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">College Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600" />
                    <input 
                      type="email" required autoFocus value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="roll@aot.edu.in"
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] pl-14 pr-6 py-5 focus:bg-white focus:border-indigo-600 focus:ring-8 focus:ring-indigo-50 outline-none transition-all font-black text-slate-700 h-16 md:h-20"
                    />
                  </div>
                  {error && <div className="text-red-500 text-[11px] font-black uppercase tracking-tight bg-red-50 p-4 rounded-2xl flex items-center gap-2 mt-2"><AlertCircle className="w-4 h-4" />{error}</div>}
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-xl hover:bg-indigo-700 active:scale-[0.96] transition-all shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 h-16 md:h-20">
                  Continue <ArrowRight className="w-6 h-6" />
                </button>
              </form>
            </div>
          )}

          {step === 'signup' && (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create Profile</h2>
                <p className="text-slate-500 text-sm mt-3 font-semibold">Join the AOT peer network</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600" />
                    <input 
                      type="text" required value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] pl-14 pr-6 py-5 focus:bg-white focus:border-indigo-600 focus:ring-8 focus:ring-indigo-50 outline-none transition-all font-black text-slate-700 h-16 md:h-20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600" />
                    <input 
                      type="password" required value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] pl-14 pr-6 py-5 focus:bg-white focus:border-indigo-600 focus:ring-8 focus:ring-indigo-50 outline-none transition-all font-black text-slate-700 h-16 md:h-20"
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-xl hover:bg-indigo-700 active:scale-[0.96] transition-all shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 h-16 md:h-20">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Create Account'}
                </button>
                <div className="text-center pt-2">
                  <button type="button" onClick={() => setStep('initial')} className="text-slate-400 text-xs font-black uppercase tracking-widest hover:text-slate-600 transition-colors">Go Back</button>
                </div>
              </form>
            </div>
          )}

          {step === 'login' && (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Identity Check</h2>
                <p className="text-slate-500 text-sm mt-3 font-semibold">Welcome back, {name.split(' ')[0]}</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600" />
                    <input 
                      type="password" required autoFocus value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] pl-14 pr-6 py-5 focus:bg-white focus:border-indigo-600 focus:ring-8 focus:ring-indigo-50 outline-none transition-all font-black text-slate-700 h-16 md:h-20"
                    />
                  </div>
                  {error && <div className="text-red-500 text-[11px] font-black uppercase tracking-tight bg-red-50 p-4 rounded-2xl flex items-center gap-2 mt-2"><AlertCircle className="w-4 h-4" />{error}</div>}
                </div>
                <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-xl hover:bg-indigo-700 active:scale-[0.96] transition-all shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 h-16 md:h-20">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign In'}
                </button>
                <div className="flex flex-col gap-4 text-center pt-2">
                   <button type="button" onClick={() => setStep('signup')} className="text-indigo-600 text-xs font-black uppercase tracking-widest hover:underline">Register new account instead?</button>
                   <button type="button" onClick={() => setStep('initial')} className="text-slate-400 text-xs font-black uppercase tracking-widest hover:text-slate-600 transition-colors">Use different email</button>
                </div>
              </form>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Verification</h2>
                <p className="text-slate-500 text-sm mt-3 font-semibold">Enter the 6-digit code for {email}</p>
              </div>

              <div className="flex justify-between gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={digit}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-full h-16 md:h-20 text-center text-3xl font-black bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-sm"
                  />
                ))}
              </div>

              <div className="space-y-6">
                <button onClick={handleVerifyOtp} disabled={loading || otp.some(d => !d)} className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-xl h-16 md:h-20 active:scale-[0.96] transition-all disabled:opacity-50">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Confirm Identity'}
                </button>
                <div className="bg-amber-50 rounded-[1.75rem] p-6 border border-amber-100/50">
                   <div className="flex items-center gap-2 text-amber-700 font-black text-[10px] uppercase tracking-widest mb-3"><HelpCircle className="w-4 h-4" />Demo Code</div>
                   <div className="flex items-center justify-between">
                     <span className="font-mono text-2xl font-black text-amber-600 tracking-widest">{DEMO_OTP}</span>
                     <button onClick={() => setOtp(DEMO_OTP.split(''))} className="text-[10px] font-black uppercase text-amber-700 bg-amber-200/50 px-4 py-2.5 rounded-xl active:scale-90 transition-all">Auto-Fill</button>
                   </div>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-12 text-center space-y-8">
              <div className="w-24 h-24 bg-green-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto relative animate-bounce shadow-2xl shadow-green-100">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Verified</h2>
                <p className="text-slate-500 text-sm mt-3 font-semibold px-8">Welcome to the AOT Chapter. Loading your workspace...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
