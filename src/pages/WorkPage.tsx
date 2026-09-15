import React, { useState, useEffect } from 'react';
import { Play, Eye, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface WorkPageProps {
  onSelectProject: (project: Project) => void;
  onNavigatePage: (page: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onSelectProject, onNavigatePage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as unknown as Project[];
        setProjects(fetched);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', 'Business Website', 'Real Estate Website', 'SaaS Landing Page', 'E-commerce Website', 'Agency Portfolio'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-28 pb-24 bg-[#040406] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-widest text-violet-400">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span>PORTFOLIO SHOWCASE &amp; DEMO SITES</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase">
            SELECTED WORK
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Explore live interactive demo applications engineered for high performance, conversion-focused layout, and modern user experiences.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-6">
          <div className="text-xs font-mono-code text-slate-400 mr-2 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5 text-violet-400" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono-code transition-all ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white font-bold shadow-lg shadow-violet-900/40'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Stack */}
        <div className="space-y-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl bg-[#090912] border border-white/10 hover:border-violet-500/40 p-6 sm:p-10 lg:p-12 transition-all duration-300 hover:shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden"
            >
              <div className={`absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br ${project.accentColor} rounded-full blur-[100px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity`} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                
                {/* Info */}
                <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono-code font-bold uppercase tracking-wider bg-violet-500/10 text-violet-300 border border-violet-500/20">
                        {project.tag}
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase group-hover:text-violet-200 transition-colors">
                      {project.title}
                    </h2>

                    <div className="text-xs font-mono-code uppercase tracking-wider text-slate-400">
                      {project.category}
                    </div>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      "{project.shortDescription}"
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="pt-4 flex flex-wrap gap-3">
                    {/* @ts-ignore */}
                    {project.link ? (
                      <a
                        /* @ts-ignore */
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-violet-900/40 active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Visit Live Website</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-violet-900/40 active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Test Live Demo App</span>
                      </button>
                    )}

                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs uppercase tracking-wider border border-white/10 transition-all duration-200 active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full Case Study</span>
                    </button>
                  </div>
                </div>

                {/* Live Preview Container */}
                <div className="lg:col-span-7">
                  <div
                    onClick={() => {
                      /* @ts-ignore */
                      if (project.link) window.open(project.link, '_blank');
                      else onSelectProject(project);
                    }}
                    className="cursor-pointer group/preview relative rounded-2xl bg-[#050509] border border-white/10 p-4 sm:p-6 hover:border-violet-500/40 transition-all duration-300 space-y-4 shadow-2xl overflow-hidden"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex space-x-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/70" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                        <span className="w-3 h-3 rounded-full bg-green-500/70" />
                      </div>
                      <div className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[11px] font-mono-code text-slate-400 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>
                          {project.link 
                            ? (() => { try { return new URL(project.link.includes('http') ? project.link : `https://${project.link}`).hostname; } catch(e) { return project.link; } })()
                            : `${project.id}.demo.fahim.design`}
                        </span>
                      </div>
                      <div className="px-2 py-0.5 rounded bg-violet-500/20 text-[10px] font-mono-code text-violet-300 font-bold uppercase tracking-wider">
                        {/* @ts-ignore */}
                        {project.link ? 'Live Website' : 'Interactive Demo'}
                      </div>
                    </div>

                    <div className="pointer-events-none p-12 text-center text-xs font-mono-code text-slate-500 bg-black/40 rounded-xl border border-white/5">
                      {/* @ts-ignore */}
                      {project.link ? 'Live Website Preview Available Externally' : 'Demo Application Preview'}
                    </div>

                    <div className="absolute inset-0 bg-violet-950/20 backdrop-blur-[2px] opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider shadow-xl flex items-center space-x-2">
                        <Play className="w-3.5 h-3.5 fill-current text-violet-600" />
                        {/* @ts-ignore */}
                        <span>{project.link ? 'Open Live Website' : 'Open Interactive Demo Modal'}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
