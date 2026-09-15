import React from 'react';
import { motion } from 'motion/react';
import { WHY_WORK_WITH_ME } from '../data/portfolioData';

export const WhyWorkWithMe: React.FC = () => {
  return (
    <section id="why-me" className="py-24 sm:py-32 relative z-10 bg-[#06060a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-widest text-violet-400">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span>VALUE PROPOSITION</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            WHY WORK WITH ME
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Dedicated to creating websites that look exceptional, load fast, and achieve your business objectives.
          </p>
        </div>

        {/* 5 Points Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_WORK_WITH_ME.map((point, index) => (
            <motion.div
              key={point.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-2xl bg-[#090912] border border-white/10 hover:border-violet-500/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.12)] space-y-4 flex flex-col justify-between ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="font-mono-code text-sm font-bold text-violet-400">
                    {point.number}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-violet-500/50" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-tight">
                  {point.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  "{point.description}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
