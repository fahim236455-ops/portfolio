import React from 'react';
import { MARQUEE_ITEMS } from '../data/portfolioData';

export const Marquee: React.FC = () => {
  // Duplicate array for seamless infinite loop marquee
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="w-full bg-[#07070d] border-y border-white/10 py-5 overflow-hidden relative z-20">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#040406] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#040406] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee items-center space-x-8">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-8 shrink-0">
            <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-slate-300 hover:text-white transition-colors cursor-default">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500/60 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
