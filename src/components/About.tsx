import React, { useState, useEffect } from 'react';
import { Sparkles, Code, Cpu, Compass, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_CONFIG } from '../data/portfolioData';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const About: React.FC = () => {
  const [aboutText, setAboutText] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'about'));
        if (docSnap.exists() && docSnap.data().content) {
          setAboutText(docSnap.data().content);
        }
      } catch (error) {
        console.error("Error fetching about text:", error);
      }
    };
    fetchAbout();
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32 relative z-10 bg-[#040406]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-widest text-violet-400">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                <span>ABOUT FAHIM</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
                ABOUT
              </h2>
            </div>

            <div className="space-y-6 text-slate-300 text-lg sm:text-xl leading-relaxed whitespace-pre-wrap">
              {aboutText ? (
                <p className="text-slate-300 text-base sm:text-lg">
                  {aboutText}
                </p>
              ) : (
                <>
                  <p className="font-medium text-white border-l-2 border-violet-500 pl-4 py-1">
                    "I'm focused on creating modern digital experiences that combine strong visual design, usability and performance."
                  </p>
                  <p className="text-slate-300 text-base sm:text-lg">
                    "My approach is simple: understand the goal, design with purpose, build carefully and deliver an experience that feels professional on every screen."
                  </p>
                </>
              )}
            </div>

            {/* Core Values Badge Array */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-[#090912] border border-white/5 space-y-1">
                <div className="text-xs font-mono-code text-violet-400 font-bold">01. DESIGN</div>
                <div className="text-sm font-bold text-white">Visual Impact</div>
                <div className="text-[11px] text-slate-400">Clean, purposeful layouts</div>
              </div>
              <div className="p-4 rounded-xl bg-[#090912] border border-white/5 space-y-1">
                <div className="text-xs font-mono-code text-blue-400 font-bold">02. CODE</div>
                <div className="text-sm font-bold text-white">Precision &amp; Speed</div>
                <div className="text-[11px] text-slate-400">Lightweight TypeScript</div>
              </div>
              <div className="p-4 rounded-xl bg-[#090912] border border-white/5 space-y-1 col-span-2 sm:col-span-1">
                <div className="text-xs font-mono-code text-emerald-400 font-bold">03. FOCUS</div>
                <div className="text-sm font-bold text-white">Conversion</div>
                <div className="text-[11px] text-slate-400">Built for user action</div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Abstract Design Element (NO Personal Photo!) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl bg-gradient-to-b from-[#0e0e1a] to-[#07070e] border border-white/15 p-8 shadow-2xl space-y-6 overflow-hidden">
              
              {/* Glowing Background Sphere */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/15 rounded-full blur-[80px] pointer-events-none" />

              {/* Graphic Title */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-2 text-xs font-mono-code text-slate-300">
                  <Compass className="w-4 h-4 text-violet-400" />
                  <span>ARCHITECTURE &amp; VISION</span>
                </div>
                <span className="text-[10px] font-mono-code text-slate-400 uppercase">FAHIM STUDIO</span>
              </div>

              {/* Abstract Blueprint Grid Visual */}
              <div className="relative h-64 rounded-2xl bg-[#040408] border border-white/10 p-6 flex flex-col justify-between overflow-hidden bg-tech-grid">
                <div className="flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 text-[10px] font-mono-code font-bold uppercase border border-violet-500/30">
                    DIGITAL ARTISTRY
                  </span>
                  <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
                </div>

                {/* Overlapping Wireframe Cards */}
                <div className="relative z-10 space-y-2">
                  <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono-code text-slate-200">
                    &lt;Structure goal="Conversion" precision="High" /&gt;
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.06] border border-white/10 backdrop-blur-md text-xs font-mono-code text-violet-300 transform translate-x-3">
                    &lt;Design system="Minimalist" palette="Futuristic" /&gt;
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400 z-10 pt-2 border-t border-white/5">
                  <span>Standard: Production Ready</span>
                  <span className="text-emerald-400">100% Quality Focus</span>
                </div>
              </div>

              {/* Tagline */}
              <div className="text-xs text-slate-400 text-center font-mono-code">
                Crafting modern web experiences with attention to detail.
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
