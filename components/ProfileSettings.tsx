
import React, { useState } from 'react';
import { X, User as UserIcon, Camera, Mail, Shield, GraduationCap, Bell, Trash2, Save, LogOut } from 'lucide-react';
import { User } from '../types';

interface ProfileSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdate: (updatedUser: User) => void;
  onLogout: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ isOpen, onClose, user, onUpdate, onLogout }) => {
  const [formData, setFormData] = useState<User>({ ...user });
  const [activeSection, setActiveSection] = useState<'profile' | 'academic' | 'security' | 'preferences'>('profile');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdate(formData);
      setIsSaving(false);
      onClose();
    }, 800);
  };

  const sections = [
    { id: 'profile', label: 'Basic Info', icon: <UserIcon className="w-4 h-4" /> },
    { id: 'academic', label: 'Academic', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'preferences', label: 'Alerts', icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-white md:rounded-[3rem] shadow-2xl flex flex-col md:flex-row h-full md:h-[700px] overflow-hidden animate-in fade-in zoom-in duration-300 border border-slate-100">

        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-50 border-b md:border-r border-slate-100 p-4 md:p-8 flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-start shrink-0">
          <div className="hidden md:flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <UserIcon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-slate-900">Settings</h2>
          </div>

          <nav className="flex-1 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar w-full md:w-auto">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id as any)}
                className={`whitespace-nowrap flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-black transition-all
                  ${activeSection === s.id
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'}`}
              >
                {s.icon}
                <span className="md:inline">{s.label}</span>
              </button>
            ))}
          </nav>

          <button
            onClick={onLogout}
            className="md:mt-auto hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>

          {/* Mobile Logout (Icon only) */}
          <button
            onClick={onLogout}
            className="md:hidden p-2 text-red-500 hover:bg-red-50 rounded-xl"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          <header className="p-4 md:p-8 border-b border-slate-50 flex items-center justify-between shrink-0">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight capitalize">{activeSection}</h3>
              <p className="hidden md:block text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Manage your account preferences</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 no-scrollbar pb-20 md:pb-8">
            {activeSection === 'profile' && (
              <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="relative group shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] md:rounded-[2.5rem] bg-indigo-50 overflow-hidden ring-4 ring-slate-50 shadow-inner">
                      <img
                        src={formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`}
                        className="w-full h-full object-cover"
                        alt="Avatar"
                      />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 md:p-3 bg-white border border-slate-200 text-indigo-600 rounded-xl md:rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all">
                      <Camera className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Display Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-3 focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Phone Number</label>
                        <input
                          type="text"
                          value={formData.phone || ''}
                          placeholder="+91 XXXXX XXXXX"
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-3 focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Short Bio</label>
                  <textarea
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell your peers a bit about yourself..."
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-4 focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold h-32 resize-none"
                  />
                </div>
              </div>
            )}

            {activeSection === 'academic' && (
              <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">College / Institution</label>
                    <input
                      type="text"
                      disabled
                      value={formData.college}
                      className="w-full bg-slate-100 border-2 border-slate-100 rounded-2xl px-5 py-3 text-slate-400 font-bold cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Department</label>
                    <select
                      value={formData.department || 'CSE'}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-3 focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold appearance-none"
                    >
                      <option value="CSE">Computer Science (CSE)</option>
                      <option value="CSBS">CS & Business Systems (CSBS)</option>
                      <option value="ECE">Electronics (ECE)</option>
                      <option value="EEE">Electrical & Electronics (EEE)</option>
                      <option value="ME">Mechanical (ME)</option>
                      <option value="EE">Electrical (EE)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Current Year</label>
                    <select
                      value={formData.year || '3rd Year'}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-3 focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold appearance-none"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="Final Year">Final Year</option>
                    </select>
                  </div>
                </div>

                {/* Representative Status Toggle */}
                <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-[2rem]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-slate-900 mb-1">Representative Status</p>
                      <p className="text-xs text-slate-500 font-bold">
                        Enables you to create and manage events on the AOT Calendar
                      </p>
                    </div>
                    <button
                      onClick={() => setFormData({ ...formData, isRepresentative: !formData.isRepresentative })}
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-all
                        ${formData.isRepresentative ? 'bg-indigo-600' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all
                        ${formData.isRepresentative ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="p-4 md:p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                      <Mail className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">Registered Email</p>
                      <p className="text-xs text-slate-400 font-bold break-all">{formData.email}</p>
                    </div>
                  </div>
                  <button className="w-full md:w-auto text-[10px] font-black uppercase text-indigo-600 bg-white border border-slate-200 px-4 py-2 rounded-xl">Change</button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Danger Zone</h4>
                  <div className="p-4 md:p-6 bg-red-50 border border-red-100 rounded-[2rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-red-600">Delete Account</p>
                      <p className="text-xs text-red-400 font-bold">This action is irreversible. All your data will be wiped.</p>
                    </div>
                    <button className="w-full md:w-auto p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all flex justify-center">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'preferences' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {[
                  { title: 'Peer Requests', desc: 'Notify me when someone wants to collaborate' },
                  { title: 'Room Alerts', desc: 'Notify me when a room session begins' },
                  { title: 'Resource Updates', desc: 'Notify me when new PYQs are uploaded' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-2">
                    <div className="pr-4">
                      <p className="text-sm font-black text-slate-900">{p.title}</p>
                      <p className="text-xs text-slate-400 font-bold">{p.desc}</p>
                    </div>
                    <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer shrink-0">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <footer className="p-4 md:p-8 border-t border-slate-50 bg-slate-50/50 flex flex-col-reverse md:flex-row justify-end gap-3 shrink-0">
            <button
              onClick={onClose}
              className="w-full md:w-auto px-8 py-3 rounded-2xl text-sm font-black text-slate-500 hover:bg-slate-100 transition-all text-center"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full md:w-auto px-10 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-100 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default ProfileSettings;
