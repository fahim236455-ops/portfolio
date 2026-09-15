import React from 'react';
import { About } from '../components/About';
import { WhyWorkWithMe } from '../components/WhyWorkWithMe';
import { Skills } from '../components/Skills';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#040406] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-widest text-violet-400">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span>BACKGROUND &amp; PHILOSOPHY</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase">
            ABOUT FAHIM
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Focused on creating modern digital experiences that combine strong visual design, usability and performance.
          </p>
        </div>

        {/* Main About Component */}
        <About />

        {/* Why Work With Me Breakdown */}
        <WhyWorkWithMe />

        {/* Skills Breakdown */}
        <Skills />

      </div>
    </div>
  );
};
