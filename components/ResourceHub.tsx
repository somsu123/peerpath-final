
import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, Download, BookOpen, Share2, Plus, ArrowUpRight, CheckCircle2, X, Upload, AlertCircle, File } from 'lucide-react';
import { Resource } from '../types';

const ResourceHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    department: 'CSE',
    year: '1st Year',
    type: 'PDF' as 'PDF' | 'Notes' | 'PYQ' | 'Lab',
    author: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Load resources from localStorage or use default data
  useEffect(() => {
    const savedResources = localStorage.getItem('peerpath_resources');
    if (savedResources) {
      setResources(JSON.parse(savedResources));
    } else {
      const defaultResources: Resource[] = [
        { id: '1', title: 'Data Structures & Algorithms - Semester 3 Notes', department: 'CSE', year: '2nd Year', type: 'Notes', size: '4.2 MB', downloads: 1240, author: 'S. Roy' },
        { id: '2', title: 'MAKAUT 2023 Mathematics-III PYQ Solutions', department: 'All', year: '2nd Year', type: 'PYQ', size: '1.8 MB', downloads: 3500, author: 'Dept. Rep' },
        { id: '3', title: 'Microprocessors Lab Manual - 8085 Assembly', department: 'ECE', year: '3rd Year', type: 'Lab', size: '5.5 MB', downloads: 890, author: 'P. Ghosh' },
        { id: '4', title: 'Business Strategy Frameworks - Marketing Hub', department: 'CSBS', year: '3rd Year', type: 'PDF', size: '2.1 MB', downloads: 1560, author: 'A. Das' },
        { id: '5', title: 'Thermodynamics Cycle Analysis Chart', department: 'ME', year: '2nd Year', type: 'Notes', size: '0.8 MB', downloads: 450, author: 'R. Sharma' },
        { id: '6', title: 'Compiler Design GATE Preparation Module', department: 'CSE', year: 'Final Year', type: 'Notes', size: '12.4 MB', downloads: 2100, author: 'Club Lead' },
        { id: '7', title: 'Control Systems - Advanced Feedback Logic', department: 'EEE', year: '3rd Year', type: 'PDF', size: '3.4 MB', downloads: 720, author: 'K. Mitra' },
        { id: '8', title: 'Finance Management for Engineers - CSBS Unit', department: 'CSBS', year: '3rd Year', type: 'Notes', size: '2.9 MB', downloads: 1120, author: 'S. Bose' },
      ];
      setResources(defaultResources);
      localStorage.setItem('peerpath_resources', JSON.stringify(defaultResources));
    }
  }, []);

  // Save resources to localStorage whenever they change
  useEffect(() => {
    if (resources.length > 0) {
      localStorage.setItem('peerpath_resources', JSON.stringify(resources));
    }
  }, [resources]);

  const filters = ['All', 'CSE', 'CSBS', 'ECE', 'EEE', 'ME', 'EE', 'Notes', 'PYQ'];

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' ||
      res.department === activeFilter ||
      res.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError('');

    if (!file) return;

    // Validate file type - only PDF
    if (file.type !== 'application/pdf') {
      setUploadError('Only PDF files are allowed');
      setSelectedFile(null);
      e.target.value = '';
      return;
    }

    // Validate file size - max 25MB
    const maxSize = 25 * 1024 * 1024; // 25MB in bytes
    if (file.size > maxSize) {
      setUploadError('File size must be less than 25MB');
      setSelectedFile(null);
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (!uploadForm.title || !uploadForm.author || !selectedFile) {
      setUploadError('Please fill in all fields and select a PDF file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError('');

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload delay
    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Create new resource
      const newResource: Resource = {
        id: Math.random().toString(36).substr(2, 9),
        title: uploadForm.title,
        department: uploadForm.department,
        year: uploadForm.year,
        type: uploadForm.type,
        size: formatFileSize(selectedFile.size),
        downloads: 0,
        author: uploadForm.author
      };

      // Add to resources list
      setResources(prev => [newResource, ...prev]);

      // Reset form
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        setIsUploadModalOpen(false);
        setUploadForm({
          title: '',
          department: 'CSE',
          year: '1st Year',
          type: 'PDF',
          author: ''
        });
        setSelectedFile(null);
      }, 500);
    }, 2000);
  };

  const closeModal = () => {
    if (!isUploading) {
      setIsUploadModalOpen(false);
      setUploadForm({
        title: '',
        department: 'CSE',
        year: '1st Year',
        type: 'PDF',
        author: ''
      });
      setSelectedFile(null);
      setUploadError('');
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Resource Hub</h2>
          <p className="text-slate-500 font-semibold text-sm md:text-base">Verified materials from AOT rankers and departments.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1 md:w-32 bg-indigo-50 p-4 rounded-3xl border border-indigo-100 flex flex-col items-center">
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Total Files</span>
            <span className="text-xl font-black text-indigo-600">{resources.length}</span>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-5 rounded-[1.75rem] font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 h-16"
          >
            <Plus className="w-5 h-5" />
            Contribute
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by subject, year or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] pl-14 pr-6 py-4 focus:border-indigo-500 outline-none shadow-sm transition-all font-semibold"
            />
          </div>
          <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 no-scrollbar">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-2
                  ${activeFilter === f
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(res => (
          <div key={res.id} className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-indigo-50/50 transition-all duration-500 relative flex flex-col h-full overflow-hidden">
            <div className="flex items-start justify-between mb-8">
              <div className="p-4 bg-slate-50 rounded-[1.25rem] group-hover:bg-indigo-50 transition-colors">
                <FileText className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100/50 uppercase tracking-widest">
                  {res.type}
                </span>
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">{res.size}</span>
              </div>
            </div>

            <div className="flex-1 mb-8">
              <h3 className="text-xl font-black text-slate-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">{res.title}</h3>
              <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5" />
                {res.department} • {res.year}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Uploaded By</span>
                <span className="text-xs font-black text-slate-900">{res.author}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-90">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-90 flex items-center gap-2 px-5">
                  <Download className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">PDF</span>
                </button>
              </div>
            </div>

            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-5 h-5 text-slate-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Featured Banner */}
      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-black uppercase tracking-widest text-indigo-300">
              <CheckCircle2 className="w-4 h-4" />
              AOT Community Verified
            </div>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Can't find what <br />you're looking for?</h3>
            <p className="text-slate-400 font-medium md:text-lg max-w-sm">Ask PeerPath AI to summarize existing notes or generate a practice test for any MAKAUT subject.</p>
            <button className="flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all shadow-2xl active:scale-95">
              Launch AI Tutor
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'PYQs', count: '150+' },
              { label: 'Lab Manuals', count: '80+' },
              { label: 'Ranker Notes', count: '200+' },
              { label: 'GATE Prep', count: '30+' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:bg-white/10 transition-colors">
                <p className="text-3xl font-black text-white mb-1">{stat.count}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Contribute Resource</h2>
                <p className="text-sm text-slate-500 font-semibold mt-1">Share your notes with the AOT community</p>
              </div>
              <button
                onClick={closeModal}
                disabled={isUploading}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors disabled:opacity-50"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="space-y-6">
              {/* File Upload Area */}
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
                  Upload PDF File *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all
                      ${selectedFile
                        ? 'border-green-300 bg-green-50'
                        : uploadError
                          ? 'border-red-300 bg-red-50'
                          : 'border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50'
                      }
                      ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {selectedFile ? (
                      <div className="text-center space-y-3">
                        <File className="w-12 h-12 text-green-600 mx-auto" />
                        <div>
                          <p className="text-sm font-black text-slate-900">{selectedFile.name}</p>
                          <p className="text-xs font-semibold text-slate-500 mt-1">
                            {formatFileSize(selectedFile.size)}
                          </p>
                        </div>
                        {!isUploading && (
                          <p className="text-xs font-bold text-green-600">✓ Ready to upload</p>
                        )}
                      </div>
                    ) : (
                      <div className="text-center space-y-3">
                        <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                        <div>
                          <p className="text-sm font-black text-slate-900">Click to upload PDF</p>
                          <p className="text-xs font-semibold text-slate-500 mt-1">
                            Max file size: 25MB
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
                {uploadError && (
                  <div className="mt-3 flex items-center gap-2 text-red-600 text-sm font-semibold">
                    <AlertCircle className="w-4 h-4" />
                    {uploadError}
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                    Resource Title *
                  </label>
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    disabled={isUploading}
                    placeholder="e.g., Data Structures Notes - Unit 3"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:outline-none font-semibold disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                    Department *
                  </label>
                  <select
                    value={uploadForm.department}
                    onChange={(e) => setUploadForm({ ...uploadForm, department: e.target.value })}
                    disabled={isUploading}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:outline-none font-semibold appearance-none disabled:opacity-50"
                  >
                    <option value="CSE">CSE</option>
                    <option value="CSBS">CSBS</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="ME">ME</option>
                    <option value="EE">EE</option>
                    <option value="All">All Departments</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                    Academic Year *
                  </label>
                  <select
                    value={uploadForm.year}
                    onChange={(e) => setUploadForm({ ...uploadForm, year: e.target.value })}
                    disabled={isUploading}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:outline-none font-semibold appearance-none disabled:opacity-50"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="Final Year">Final Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                    Resource Type *
                  </label>
                  <select
                    value={uploadForm.type}
                    onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value as any })}
                    disabled={isUploading}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:outline-none font-semibold appearance-none disabled:opacity-50"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Notes">Notes</option>
                    <option value="PYQ">PYQ (Previous Year Question)</option>
                    <option value="Lab">Lab Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={uploadForm.author}
                    onChange={(e) => setUploadForm({ ...uploadForm, author: e.target.value })}
                    disabled={isUploading}
                    placeholder="e.g., John Doe"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:outline-none font-semibold disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-slate-600">Uploading...</span>
                    <span className="text-indigo-600">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeModal}
                  disabled={isUploading}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={isUploading || !selectedFile || !uploadForm.title || !uploadForm.author}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload Resource
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceHub;
