import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Sparkles, Layout, Target, Cpu, Compass } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { Skills } from '../components/Skills';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface HomePageProps {
  onNavigatePage: (page: string) => void;
  onSelectProject: (project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigatePage, onSelectProject }) => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(2));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as unknown as Project[];
        setFeaturedProjects(fetched);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-0 pb-20">
      {/* Standalone Hero Section */}
      <Hero onNavigate={(target) => onNavigatePage(target === 'hero' ? 'home' : target)} />

      {/* Moving Text Marquee */}
      <Marquee />

      {/* Featured Showcase Teaser (Highlights 2 projects) */}
      {featuredProjects.length > 0 && (
        <section className="py-20 sm:py-28 relative z-10 bg-[#040406] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-widest text-violet-400">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                <span>PORTFOLIO PREVIEWS</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
                FEATURED LIVE DEMOS
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Click to explore interactive demo sites crafted for real-world business scenarios.
              </p>
            </div>

            <button
              onClick={() => onNavigatePage('work')}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-lg active:scale-95 self-start md:self-auto"
            >
              <span>Explore All Demos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 2 Quick Highlight Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                data-cursor="project"
                className="group p-2 sm:p-4 rounded-[2rem] bg-[#090912] border border-white/10 hover:border-violet-500/40 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-[0_0_50px_rgba(139,92,246,0.15)] relative"
              >
                <div className={`absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br ${project.accentColor || 'from-violet-500 to-fuchsia-500'} rounded-full blur-[100px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity`} />
                
                {/* Visual Preview */}
                <div 
                  data-cursor="image"
                  className="relative w-full h-[250px] sm:h-[320px] rounded-2xl overflow-hidden bg-[#050509] border border-white/5 cursor-none" 
                  onClick={() => { if (project.link) window.open(project.link, '_blank'); else onSelectProject(project); }}
                >
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : project.link ? (
                    <iframe
                      src={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                      title={project.title}
                      className="w-full h-full border-0 pointer-events-none transition-transform duration-700 group-hover:scale-105"
                      sandbox="allow-scripts allow-same-origin"
                      loading="lazy"
                    />
                  ) : (
                    <div className={`w-full h-full p-6 sm:p-10 bg-gradient-to-br ${project.accentColor || 'from-violet-500/20 to-fuchsia-500/20'} flex flex-col items-center justify-center text-center space-y-3 transition-transform duration-700 group-hover:scale-105`}>
                      <h4 className="font-heading text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
                        {project.mockupData?.heroHeading || project.title.toUpperCase()}
                      </h4>
                      <p className="text-slate-300 text-xs max-w-sm">
                        {project.mockupData?.heroSub || project.shortDescription}
                      </p>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-violet-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <span className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider shadow-xl flex items-center space-x-2">
                      <Target className="w-3.5 h-3.5 text-violet-600" />
                      <span>{project.link ? 'Open Live Website' : 'Open Interactive Demo'}</span>
                    </span>
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-4 sm:p-6 space-y-4 relative z-10 flex flex-col flex-1 justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-violet-500/10 text-violet-300 border border-violet-500/20">
                        {project.tag}
                      </span>
                      <span className="text-xs font-mono-code text-slate-400 uppercase">{project.category}</span>
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-violet-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300 hover:text-white inline-flex items-center space-x-2 transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    {project.link && (
                       <a
                         href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-[10px] text-violet-400 font-mono-code hover:text-violet-300 flex items-center space-x-1"
                       >
                         <span>{(() => { try { return new URL(project.link.startsWith('http') ? project.link : `https://${project.link}`).hostname; } catch(e) { return project.link; } })()}</span>
                         <ArrowUpRight className="w-3 h-3" />
                       </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>
      )}

      {/* Navigation Quick Cards */}
      <section className="py-20 relative z-10 bg-[#06060a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-widest text-violet-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXPLORE PAGES</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              DISCOVER FAHIM'S CAPABILITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => onNavigatePage('work')}
              className="p-6 rounded-2xl bg-[#090912] border border-white/10 hover:border-violet-500/50 transition-all cursor-pointer space-y-4 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] group"
            >
              <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 w-fit group-hover:scale-110 transition-transform">
                <Layout className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white uppercase group-hover:text-violet-300">
                Portfolio Work
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Explore live interactive concept sites.
              </p>
              <div className="text-xs font-mono-code text-violet-400 inline-flex items-center space-x-1 pt-2">
                <span>View Work Page</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigatePage('services')}
              className="p-6 rounded-2xl bg-[#090912] border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer space-y-4 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] group"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 w-fit group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white uppercase group-hover:text-blue-300">
                Services
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Websites, landing pages, and e-commerce stores.
              </p>
              <div className="text-xs font-mono-code text-blue-400 inline-flex items-center space-x-1 pt-2">
                <span>View Services Page</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigatePage('process')}
              className="p-6 rounded-2xl bg-[#090912] border border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer space-y-4 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group"
            >
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white uppercase group-hover:text-emerald-300">
                How It Works
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                A streamlined 5-stage delivery process.
              </p>
              <div className="text-xs font-mono-code text-emerald-400 inline-flex items-center space-x-1 pt-2">
                <span>View Process Page</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              onClick={() => onNavigatePage('contact')}
              className="p-6 rounded-2xl bg-[#090912] border border-white/10 hover:border-amber-500/50 transition-all cursor-pointer space-y-4 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] group"
            >
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 w-fit group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white uppercase group-hover:text-amber-300">
                Contact
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Direct project inquiry form and budgets.
              </p>
              <div className="text-xs font-mono-code text-amber-400 inline-flex items-center space-x-1 pt-2">
                <span>Start an Inquiry</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Badges */}
      <Skills />
    </div>
  );
};
