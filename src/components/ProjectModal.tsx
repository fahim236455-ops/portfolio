import React, { useState } from 'react';
import { X, ArrowUpRight, CheckCircle2, Laptop, Smartphone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProjectForContact: (projectType: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProjectForContact,
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!project) return null;

  const handleStartSimilar = () => {
    onSelectProjectForContact(project.category);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-40"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-5xl bg-[#0a0a12] border border-white/15 rounded-2xl shadow-2xl z-50 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#07070e] shrink-0">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-violet-500/10 text-violet-300 border border-violet-500/20">
                {project.tag}
              </span>
              <span className="text-xs text-slate-400 font-mono-code hidden sm:inline-block">
                Category: {project.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            {/* Title & Short Description */}
            <div>
              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                {project.title}
              </h2>
              <p className="mt-2 text-slate-300 text-base sm:text-lg leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

              {/* Interactive Mockup Preview Box */}
              <div className="rounded-xl border border-white/10 bg-[#050509] p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="w-3 h-3 rounded-full bg-red-500/70 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500/70 shrink-0" />
                    <span className="text-xs font-mono-code text-slate-400 ml-2 truncate block max-w-[200px] sm:max-w-xs">
                      {/* @ts-ignore */}
                      {project.link ? new URL(project.link).hostname : `https://${project.id}.concept.fahim.design`}
                    </span>
                  </div>
                  {/* View Switcher */}
                  <div className="flex items-center space-x-1 bg-white/[0.05] p-1 rounded-lg shrink-0">
                    <button
                      onClick={() => setViewMode('desktop')}
                      className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                        viewMode === 'desktop' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Laptop className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline-block">Desktop</span>
                    </button>
                    <button
                      onClick={() => setViewMode('mobile')}
                      className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                        viewMode === 'mobile' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline-block">Mobile</span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Interactive Frame */}
                {/* @ts-ignore */}
                {project.link ? (
                  <div className={`mx-auto transition-all duration-300 rounded-lg p-6 bg-[#090912] border border-white/10 shadow-xl flex flex-col items-center justify-center space-y-4 py-16 ${
                    viewMode === 'mobile' ? 'max-w-xs text-center' : 'w-full'
                  }`}>
                    <Sparkles className="w-8 h-8 text-violet-400" />
                    <div className="text-center space-y-2">
                      <h3 className="font-heading text-xl font-bold text-white">Live Website Available</h3>
                      <p className="text-sm text-slate-400 max-w-sm">This is a custom project with an external live website.</p>
                    </div>
                    <a
                      /* @ts-ignore */
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center space-x-2"
                    >
                      <span>Visit Live Website</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : (
                  <div
                    className={`mx-auto transition-all duration-300 rounded-lg p-6 bg-gradient-to-br ${project.accentColor} border border-white/10 shadow-xl ${
                      viewMode === 'mobile' ? 'max-w-xs text-center' : 'w-full'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono-code font-bold uppercase tracking-wider">
                        {project.mockupData?.badge || 'Preview'}
                      </div>
                      <h3 className="font-heading text-xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                        {project.mockupData?.heroHeading || project.title}
                      </h3>
                      <p className="text-slate-300 text-sm max-w-lg mx-auto">
                        {project.mockupData?.heroSub || project.shortDescription}
                      </p>

                      {/* Stats Row */}
                      {project.mockupData?.stats && (
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                          {project.mockupData.stats.map((stat, idx) => (
                            <div key={idx} className="p-2 rounded bg-white/[0.04] text-center">
                              <div className="font-heading text-sm sm:text-base font-bold text-white">{stat.value}</div>
                              <div className="text-[10px] text-slate-400">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

            {/* Overview & Approach Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-violet-400">
                  Overview &amp; Purpose
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{project.overview || project.shortDescription || 'No overview provided.'}</p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-blue-400">
                  Challenge &amp; Solution
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{project.challenge || 'Custom tailored solution to meet business objectives.'}</p>
              </div>
            </div>

            {/* Design Direction & Approach */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-emerald-400">
                Design &amp; UX Direction
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">{project.designDirection || 'Modern, clean, and conversion-focused design language.'}</p>
            </div>

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-200">
                  Key Deliverable Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Badges */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/10 text-xs font-mono-code text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#07070e] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="text-xs text-slate-400">
              Need a similar website for your business?
            </div>
            <button
              onClick={handleStartSimilar}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-violet-900/40"
            >
              <span>Start a Similar Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
