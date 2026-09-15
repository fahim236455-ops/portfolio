import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  return (
    <section id="work" className="py-24 sm:py-32 relative z-10 bg-[#040406]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-widest text-violet-400">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase">
            SELECTED WORK
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            A selection of digital experiences designed to be clean, modern and effective.
          </p>
        </div>

        {/* Major Showcase Projects Stack (Large Editorial Cards) */}
        <div className="space-y-12">
          {PROJECTS_DATA.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-3xl bg-[#090912] border border-white/10 hover:border-violet-500/40 p-6 sm:p-10 lg:p-12 transition-all duration-300 hover:shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden"
              >
                {/* Subtle Glow Overlay */}
                <div className={`absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br ${project.accentColor} rounded-full blur-[100px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity`} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                  
                  {/* Left Info Column */}
                  <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Concept Project Tag */}
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 rounded-full text-[11px] font-mono-code font-bold uppercase tracking-wider bg-violet-500/10 text-violet-300 border border-violet-500/20">
                          {project.tag}
                        </span>
                        <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">
                          0{index + 1} / 0{PROJECTS_DATA.length}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase group-hover:text-violet-200 transition-colors">
                        {project.title}
                      </h3>

                      {/* Category */}
                      <div className="text-xs font-mono-code uppercase tracking-wider text-slate-400">
                        {project.category}
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                        "{project.shortDescription}"
                      </p>
                    </div>

                    {/* View Project Button */}
                    <div className="pt-4">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider border border-white/10 hover:border-violet-400 transition-all duration-200 group-hover:shadow-lg active:scale-95"
                      >
                        <span>View Project Case Study</span>
                        <ArrowUpRight className="w-4 h-4 text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Right Editorial Visual Preview Container */}
                  <div className="lg:col-span-7">
                    <div
                      onClick={() => onSelectProject(project)}
                      className="cursor-pointer group/preview relative rounded-2xl bg-[#050509] border border-white/10 p-6 sm:p-8 hover:border-violet-500/30 transition-all duration-300 space-y-6 shadow-2xl overflow-hidden"
                    >
                      {/* Fake Browser Toolbar */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex space-x-2">
                          <span className="w-3 h-3 rounded-full bg-white/15" />
                          <span className="w-3 h-3 rounded-full bg-white/15" />
                          <span className="w-3 h-3 rounded-full bg-white/15" />
                        </div>
                        <div className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[11px] font-mono-code text-slate-400">
                          {project.id}.fahim.design
                        </div>
                        <div className="text-[10px] font-mono-code text-violet-400 uppercase tracking-wider">
                          Preview
                        </div>
                      </div>

                      {/* Mockup Showcase Panel */}
                      <div className={`p-6 sm:p-10 rounded-xl bg-gradient-to-br ${project.accentColor} border border-white/10 group-hover/preview:scale-[1.01] transition-transform duration-300 space-y-4`}>
                        <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-mono-code uppercase font-bold tracking-wider">
                          {project.mockupData.badge}
                        </div>
                        <h4 className="font-heading text-xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                          {project.mockupData.heroHeading}
                        </h4>
                        <p className="text-slate-300 text-xs sm:text-sm max-w-md">
                          {project.mockupData.heroSub}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-white/10 text-center">
                          {project.mockupData.features.map((feat, fIdx) => (
                            <div key={fIdx} className="p-2 rounded bg-black/40 text-[11px] text-slate-200 font-medium">
                              {feat}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
