import React, { useState, useEffect } from 'react';
import { auth, db, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, setDoc, getDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { Layout, MessageSquare, Briefcase, FileText, LogOut, Loader2, Plus, Trash2, X } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'messages' | 'projects' | 'hero' | 'about' | 'services' | 'process' | 'social'>('messages');

  // Data states
  const [messages, setMessages] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [aboutText, setAboutText] = useState('');
  const [heroData, setHeroData] = useState({ headline: '', subheadline: '' });
  
  // Settings for services & process
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [processData, setProcessData] = useState<any[]>([]);
  const [socialLinks, setSocialLinks] = useState<{name: string, url: string}[]>([
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'GitHub', url: 'https://github.com' }
  ]);

  const [savingAbout, setSavingAbout] = useState(false);
  const [savingHero, setSavingHero] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  // Modal and Notification states
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', category: 'Business Website', shortDescription: '', link: '', imageUrl: '' });
  const [notification, setNotification] = useState<{message: string, type: 'success'|'error'} | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{isOpen: boolean, title: string, onConfirm: () => void} | null>(null);

  const showNotification = (message: string, type: 'success'|'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user || user.email !== 'fahim236455@gmail.com') return;

    // Load Messages
    const qMsg = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMsg = onSnapshot(qMsg, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    // Load Projects
    const qProj = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubProj = onSnapshot(qProj, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    // Load About
    const fetchAbout = async () => {
      const docSnap = await getDoc(doc(db, 'settings', 'about'));
      if (docSnap.exists()) {
        setAboutText(docSnap.data().content);
      }
    };
    fetchAbout();

    // Load Hero
    const fetchHero = async () => {
      const docSnap = await getDoc(doc(db, 'settings', 'hero'));
      if (docSnap.exists()) {
        setHeroData({
          headline: docSnap.data().headline || '',
          subheadline: docSnap.data().subheadline || ''
        });
      }
    };
    fetchHero();

    // Load Services & Process configs
    const fetchConfigs = async () => {
      const svcs = await getDoc(doc(db, 'settings', 'services'));
      if (svcs.exists() && svcs.data().items) setServicesData(svcs.data().items);

      const proc = await getDoc(doc(db, 'settings', 'process'));
      if (proc.exists() && proc.data().items) setProcessData(proc.data().items);

      const soc = await getDoc(doc(db, 'settings', 'social'));
      if (soc.exists() && soc.data().items) {
        setSocialLinks(soc.data().items);
      }
    };
    fetchConfigs();

    return () => {
      unsubMsg();
      unsubProj();
    };
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error', error);
      showNotification('Login failed', 'error');
    }
  };

  const handleLogout = () => signOut(auth);

  const saveAboutText = async () => {
    setSavingAbout(true);
    try {
      await setDoc(doc(db, 'settings', 'about'), { content: aboutText });
      showNotification('About text saved successfully!');
    } catch (e) {
      console.error(e);
      showNotification('Failed to save about text', 'error');
    }
    setSavingAbout(false);
  };

  const saveHeroText = async () => {
    setSavingHero(true);
    try {
      await setDoc(doc(db, 'settings', 'hero'), heroData);
      showNotification('Hero section saved successfully!');
    } catch (e) {
      console.error(e);
      showNotification('Failed to save hero text', 'error');
    }
    setSavingHero(false);
  };

  const saveSocialLinks = async () => {
    setSavingSettings(true);
    try {
      await setDoc(doc(db, 'settings', 'social'), { items: socialLinks });
      showNotification(`social saved successfully!`);
    } catch (e) {
      console.error(e);
      showNotification(`Failed to save social.`, 'error');
    }
    setSavingSettings(false);
  };

  const saveServices = async () => {
    setSavingSettings(true);
    try {
      await setDoc(doc(db, 'settings', 'services'), { items: servicesData });
      showNotification('Services saved successfully!');
    } catch (e) {
      console.error(e);
      showNotification('Failed to save services.', 'error');
    }
    setSavingSettings(false);
  };

  const saveProcess = async () => {
    setSavingSettings(true);
    try {
      await setDoc(doc(db, 'settings', 'process'), { items: processData });
      showNotification('Process steps saved successfully!');
    } catch (e) {
      console.error(e);
      showNotification('Failed to save process steps.', 'error');
    }
    setSavingSettings(false);
  };

  const deleteProject = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure you want to delete this project?',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'projects', id));
          setConfirmDialog(null);
          showNotification('Project deleted');
        } catch (e) {
          console.error(e);
          setConfirmDialog(null);
          showNotification('Failed to delete project', 'error');
        }
      }
    });
  };

  const deleteMessage = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure you want to delete this message?',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'messages', id));
          setConfirmDialog(null);
          showNotification('Message deleted');
        } catch (e) {
          console.error(e);
          setConfirmDialog(null);
          showNotification('Failed to delete message', 'error');
        }
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        const MAX_DIMENSION = 800;
        if (width > height && width > MAX_DIMENSION) {
          height *= MAX_DIMENSION / width;
          width = MAX_DIMENSION;
        } else if (height > MAX_DIMENSION) {
          width *= MAX_DIMENSION / height;
          height = MAX_DIMENSION;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setNewProject({ ...newProject, imageUrl: dataUrl });
        }
      };
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddProject = async () => {
    if (!newProject.title) {
      showNotification('Project title is required', 'error');
      return;
    }
    try {
      await addDoc(collection(db, 'projects'), {
        title: newProject.title,
        category: newProject.category || 'Business Website',
        shortDescription: newProject.shortDescription,
        tag: 'NEW PROJECT',
        accentColor: 'from-violet-600 to-fuchsia-600',
        link: newProject.link,
        imageUrl: newProject.imageUrl || '',
        createdAt: new Date(),
        mockupData: {
          heroHeading: newProject.title.toUpperCase(),
          heroSub: newProject.shortDescription || 'Modern Digital Experience',
          badge: 'NEW',
          features: ['Responsive', 'Modern UI', 'Fast', 'Optimized'],
          stats: [
            { label: 'Performance', value: '100%' }
          ],
          themeColor: '#8b5cf6'
        }
      });
      showNotification('Demo site added successfully!');
      setShowProjectModal(false);
      setNewProject({ title: '', category: 'Business Website', shortDescription: '', link: '', imageUrl: '' });
    } catch (error) {
      console.error(error);
      showNotification('Failed to add demo site', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-[#040406]">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (!user || user.email !== 'fahim236455@gmail.com') {
    return (
      <div className="min-h-screen pt-28 pb-24 bg-[#040406] flex items-center justify-center">
        <div className="bg-[#090912] p-8 rounded-3xl border border-white/10 max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mx-auto">
            <Layout className="w-8 h-8 text-violet-400" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-slate-400 text-sm">Sign in with your authorized Google account to manage the portfolio.</p>
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-full bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-slate-200 transition-colors"
          >
            Sign in with Google
          </button>
          {user && user.email !== 'fahim236455@gmail.com' && (
            <p className="text-red-400 text-xs pt-4">Unauthorized email: {user.email}. Please use fahim236455@gmail.com.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#040406]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-heading text-3xl font-extrabold text-white uppercase tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Logged in as {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-white transition-colors self-start md:self-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'messages' ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages ({messages.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'projects' ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Demo Sites</span>
            </button>
            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'hero' ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
            >
              <Layout className="w-4 h-4" />
              <span>Hero Section</span>
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'about' ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
            >
              <FileText className="w-4 h-4" />
              <span>About Section</span>
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'services' ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
            >
              <Layout className="w-4 h-4" />
              <span>Services</span>
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'process' ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
            >
              <FileText className="w-4 h-4" />
              <span>Process Steps</span>
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'social' ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
            >
              <Layout className="w-4 h-4" />
              <span>Social Links</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl font-bold text-white border-b border-white/10 pb-3">Client Inquiries</h2>
                {messages.length === 0 ? (
                  <div className="p-8 text-center border border-white/5 bg-white/[0.02] rounded-2xl text-slate-400 text-sm">
                    No messages yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className="p-5 rounded-2xl bg-[#090912] border border-white/10 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-white text-lg">{msg.name}</div>
                            <div className="text-sm text-slate-400">{msg.email}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <a
                              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${msg.email}&su=${encodeURIComponent(`Re: Your Inquiry for ${msg.projectType}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-colors flex items-center space-x-1"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Reply via Gmail</span>
                            </a>
                            <button onClick={() => deleteMessage(msg.id)} className="text-slate-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg p-2 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5 text-sm">
                          <div>
                            <div className="text-slate-500 text-xs uppercase mb-1">Project Type</div>
                            <div className="text-slate-300">{msg.projectType}</div>
                          </div>
                          <div>
                            <div className="text-slate-500 text-xs uppercase mb-1">Budget</div>
                            <div className="text-slate-300">{msg.budget}</div>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-white/5 text-sm">
                          <div className="text-slate-500 text-xs uppercase mb-1">Details</div>
                          <p className="text-slate-300 whitespace-pre-wrap">{msg.details}</p>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono-code pt-2">
                          Received: {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : 'Just now'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* HERO TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl font-bold text-white border-b border-white/10 pb-3">Edit Hero Section</h2>
                <div className="space-y-4">
                  <p className="text-sm text-slate-400">Update the main headline and supporting text that appears at the top of the home page.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono-code uppercase text-slate-400 mb-2">Headline</label>
                      <input
                        type="text"
                        value={heroData.headline}
                        onChange={(e) => setHeroData({ ...heroData, headline: e.target.value })}
                        className="w-full bg-[#090912] border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-violet-500"
                        placeholder="e.g. BUILDING DIGITAL EXPERIENCES"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono-code uppercase text-slate-400 mb-2">Subheadline / Supporting Text</label>
                      <textarea
                        value={heroData.subheadline}
                        onChange={(e) => setHeroData({ ...heroData, subheadline: e.target.value })}
                        rows={4}
                        className="w-full bg-[#090912] border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"
                        placeholder="e.g. Freelance Web Designer & Developer focused on..."
                      />
                    </div>
                  </div>

                  <button
                    onClick={saveHeroText}
                    disabled={savingHero}
                    className="px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    {savingHero ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl font-bold text-white border-b border-white/10 pb-3">Edit About Section</h2>
                <div className="space-y-4">
                  <p className="text-sm text-slate-400">Update the background story and philosophy that appears on the About page.</p>
                  <textarea
                    value={aboutText}
                    onChange={(e) => setAboutText(e.target.value)}
                    rows={8}
                    className="w-full bg-[#090912] border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"
                    placeholder="Write your about content here..."
                  />
                  <button
                    onClick={saveAboutText}
                    disabled={savingAbout}
                    className="px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    {savingAbout ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 gap-4">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-white">Manage Demo Sites</h2>
                    <p className="text-sm text-slate-400 mt-1">Add, edit, or remove your portfolio demo sites.</p>
                  </div>
                  <button 
                    onClick={() => setShowProjectModal(true)}
                    className="flex items-center justify-center space-x-1 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Demo Site</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map(proj => (
                    <div key={proj.id} className="p-5 rounded-2xl bg-[#090912] border border-white/10 flex flex-col justify-between space-y-4 shadow-lg hover:border-violet-500/30 transition-colors">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="px-2 py-1 rounded bg-violet-500/10 text-xs font-mono-code text-violet-400 font-bold uppercase tracking-wider">{proj.category}</span>
                          {proj.tag && (
                            <span className="text-[10px] font-mono-code text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/10">{proj.tag}</span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
                        <p className="text-sm text-slate-400 line-clamp-2">{proj.shortDescription}</p>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs font-mono-code text-blue-400 hover:text-blue-300 hover:underline">
                            View Live Demo ↗
                          </a>
                        )}
                      </div>
                      <div className="pt-4 border-t border-white/5 flex justify-end">
                        <button onClick={() => deleteProject(proj.id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-xs text-red-400 font-bold hover:bg-red-500/20 hover:text-red-300 flex items-center space-x-1 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <div className="col-span-1 md:col-span-2 p-12 text-center border border-dashed border-white/10 bg-white/[0.02] rounded-3xl flex flex-col items-center justify-center space-y-4">
                      <Briefcase className="w-12 h-12 text-slate-500" />
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white">No custom demo sites found</h3>
                        <p className="text-slate-400 text-sm max-w-sm mx-auto">
                          The site is currently showing default demo projects. Click the "Add New Demo Site" button above to add your own real work!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl font-bold text-white border-b border-white/10 pb-3">Edit Services</h2>
                <div className="space-y-6">
                  {servicesData.map((svc, index) => (
                    <div key={index} className="flex gap-4 items-start p-4 bg-white/[0.02] border border-white/5 rounded-xl relative">
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Number (e.g. 01)</label>
                            <input 
                              type="text"
                              value={svc.number || ''}
                              onChange={(e) => {
                                const newData = [...servicesData];
                                newData[index].number = e.target.value;
                                setServicesData(newData);
                              }}
                              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Title</label>
                            <input 
                              type="text"
                              value={svc.title || ''}
                              onChange={(e) => {
                                const newData = [...servicesData];
                                newData[index].title = e.target.value;
                                setServicesData(newData);
                              }}
                              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Description</label>
                          <textarea 
                            value={svc.description || ''}
                            onChange={(e) => {
                              const newData = [...servicesData];
                              newData[index].description = e.target.value;
                              setServicesData(newData);
                            }}
                            rows={2}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Features (comma separated)</label>
                          <input 
                            type="text"
                            value={(svc.features || []).join(', ')}
                            onChange={(e) => {
                              const newData = [...servicesData];
                              newData[index].features = e.target.value.split(',').map(f => f.trim()).filter(f => f);
                              setServicesData(newData);
                            }}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500"
                            placeholder="Feature 1, Feature 2, Feature 3"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Icon Name (Layout, Target, ShoppingBag, Cpu)</label>
                          <input 
                            type="text"
                            value={svc.iconName || ''}
                            onChange={(e) => {
                              const newData = [...servicesData];
                              newData[index].iconName = e.target.value;
                              setServicesData(newData);
                            }}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newData = servicesData.filter((_, i) => i !== index);
                          setServicesData(newData);
                        }}
                        className="p-2 text-slate-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors absolute top-4 right-4"
                        title="Remove Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => setServicesData([...servicesData, { number: '', title: '', description: '', features: [], iconName: 'Layout' }])}
                    className="flex items-center justify-center space-x-2 w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-bold text-sm">Add New Service</span>
                  </button>

                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={saveServices}
                      disabled={savingSettings}
                      className="px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      {savingSettings ? 'Saving...' : 'Save Services'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PROCESS TAB */}
            {activeTab === 'process' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl font-bold text-white border-b border-white/10 pb-3">Edit Process Steps</h2>
                <div className="space-y-6">
                  {processData.map((step, index) => (
                    <div key={index} className="flex gap-4 items-start p-4 bg-white/[0.02] border border-white/5 rounded-xl relative">
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Number (e.g. 01)</label>
                            <input 
                              type="text"
                              value={step.number || ''}
                              onChange={(e) => {
                                const newData = [...processData];
                                newData[index].number = e.target.value;
                                setProcessData(newData);
                              }}
                              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Title</label>
                            <input 
                              type="text"
                              value={step.title || ''}
                              onChange={(e) => {
                                const newData = [...processData];
                                newData[index].title = e.target.value;
                                setProcessData(newData);
                              }}
                              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Description</label>
                          <input 
                            type="text"
                            value={step.description || ''}
                            onChange={(e) => {
                              const newData = [...processData];
                              newData[index].description = e.target.value;
                              setProcessData(newData);
                            }}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Details</label>
                          <textarea 
                            value={step.details || ''}
                            onChange={(e) => {
                              const newData = [...processData];
                              newData[index].details = e.target.value;
                              setProcessData(newData);
                            }}
                            rows={3}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newData = processData.filter((_, i) => i !== index);
                          setProcessData(newData);
                        }}
                        className="p-2 text-slate-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors absolute top-4 right-4"
                        title="Remove Step"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => setProcessData([...processData, { number: '', title: '', description: '', details: '' }])}
                    className="flex items-center justify-center space-x-2 w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-bold text-sm">Add New Step</span>
                  </button>

                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={saveProcess}
                      disabled={savingSettings}
                      className="px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      {savingSettings ? 'Saving...' : 'Save Process'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SOCIAL TAB */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl font-bold text-white border-b border-white/10 pb-3">Edit Social Links</h2>
                <div className="space-y-6">
                  {socialLinks.map((link, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-1 space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Platform Name</label>
                          <input 
                            type="text"
                            value={link.name}
                            onChange={(e) => {
                              const newLinks = [...socialLinks];
                              newLinks[index].name = e.target.value;
                              setSocialLinks(newLinks);
                            }}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500"
                            placeholder="e.g. LinkedIn"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Profile URL</label>
                          <input 
                            type="url"
                            value={link.url}
                            onChange={(e) => {
                              const newLinks = [...socialLinks];
                              newLinks[index].url = e.target.value;
                              setSocialLinks(newLinks);
                            }}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newLinks = socialLinks.filter((_, i) => i !== index);
                          setSocialLinks(newLinks);
                        }}
                        className="mt-6 p-3 text-slate-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-xl transition-colors"
                        title="Remove Link"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => setSocialLinks([...socialLinks, { name: '', url: '' }])}
                    className="flex items-center justify-center space-x-2 w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-bold text-sm">Add New Social Link</span>
                  </button>

                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={saveSocialLinks}
                      disabled={savingSettings}
                      className="px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      {savingSettings ? 'Saving...' : 'Save Social Links'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`px-6 py-3 rounded-xl shadow-xl flex items-center space-x-2 text-sm font-bold text-white border ${
            notification.type === 'error' ? 'bg-red-500/20 border-red-500/50' : 'bg-emerald-500/20 border-emerald-500/50'
          }`}>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* CONFIRMATION DIALOG */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#090912] border border-white/10 p-6 rounded-2xl max-w-sm w-full space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white text-center">{confirmDialog.title}</h3>
            <div className="flex justify-center space-x-3">
              <button 
                onClick={() => setConfirmDialog(null)}
                className="px-5 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDialog.onConfirm}
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors font-bold shadow-lg shadow-red-900/20"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#090912] border border-white/10 p-6 rounded-3xl max-w-lg w-full space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-violet-400" />
                <span>Add New Demo Site</span>
              </h3>
              <button 
                onClick={() => setShowProjectModal(false)}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Demo Site Title *</label>
                <input 
                  type="text"
                  placeholder="e.g. Modern E-Commerce Platform"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Category</label>
                <input 
                  type="text"
                  placeholder="e.g. Web Application"
                  value={newProject.category}
                  onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Short Description</label>
                <textarea 
                  placeholder="A brief overview of the project..."
                  rows={3}
                  value={newProject.shortDescription}
                  onChange={(e) => setNewProject({...newProject, shortDescription: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Live Preview Link (Optional)</label>
                <input 
                  type="url"
                  placeholder="https://example.com"
                  value={newProject.link}
                  onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">If provided, the "Test Live Demo" button will open this link in a new tab.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Image (URL or Upload)</label>
                <div className="flex space-x-2">
                  <input 
                    type="url"
                    placeholder="https://example.com/screenshot.jpg"
                    value={newProject.imageUrl.startsWith('data:image') ? 'Uploaded Local Image' : newProject.imageUrl}
                    onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})}
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-violet-500"
                    disabled={newProject.imageUrl.startsWith('data:image')}
                  />
                  <label className="cursor-pointer bg-violet-600/20 text-violet-400 border border-violet-500/30 hover:bg-violet-600/40 px-4 py-3 rounded-xl flex items-center justify-center transition-colors shrink-0">
                    <span className="text-xs font-bold uppercase tracking-wider">Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                  {newProject.imageUrl && (
                    <button 
                      onClick={() => setNewProject({...newProject, imageUrl: ''})} 
                      className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/40 px-4 py-3 rounded-xl flex items-center justify-center transition-colors shrink-0"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider">Clear</span>
                    </button>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Provide a URL or upload a photo directly from your device.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end space-x-3">
              <button 
                onClick={() => setShowProjectModal(false)}
                className="px-5 py-2.5 rounded-xl text-slate-300 hover:text-white font-semibold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddProject}
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold shadow-lg shadow-violet-900/20 transition-all active:scale-95"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
