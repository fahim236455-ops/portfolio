import React from 'react';
import { motion } from 'motion/react';
import { SKILLS_DATA } from '../data/portfolioData';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 sm:py-32 relative z-10 bg-[#06060a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-widest text-violet-400">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span>TECHNOLOGY STACK</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            SKILLS &amp; TOOLS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Modern tools and standard web technologies used to build clean, performant applications.
          </p>
        </div>

        {/* Minimal Typography Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {SKILLS_DATA.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-5 rounded-2xl bg-[#080812] border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.04] transition-all duration-200 group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono-code uppercase text-slate-400">
                  {skill.category}
                </span>
                <h3 className="font-heading text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                  {skill.name}
                </h3>
              </div>

              <div className="inline-block self-start px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-[10px] font-mono-code text-violet-300">
                {skill.badge}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
