import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_CONFIG } from '../data/portfolioData';
import { FuturisticCanvas } from './FuturisticCanvas';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [heroData, setHeroData] = useState<{headline: string, subheadline: string} | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'hero'));
        if (docSnap.exists() && (docSnap.data().headline || docSnap.data().subheadline)) {
          setHeroData({
            headline: docSnap.data().headline,
            subheadline: docSnap.data().subheadline
          });
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };
    fetchHero();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 overflow-hidden bg-radial-gradient"
    >
      {/* Interactive Background Geometric Particles Canvas */}
      <FuturisticCanvas />

      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center space-y-8">
          
          {/* Main Typography Column */}
          <div className="space-y-8 flex flex-col items-center">
            
            {/* Small Label / Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono-code text-violet-300 tracking-wider uppercase backdrop-blur-sm shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span>WEB DESIGN • DEVELOPMENT • DIGITAL</span>
            </motion.div>

            {/* Large Bold Headline */}
            {heroData?.headline ? (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl xl:text-8xl tracking-tight text-white leading-[1.02] uppercase whitespace-pre-wrap text-center mx-auto"
              >
                {heroData.headline}
              </motion.h1>
            ) : (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl xl:text-8xl tracking-tight text-white leading-[1.02] uppercase text-center mx-auto"
              >
                BUILDING DIGITAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
                  EXPERIENCES
                </span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400">
                  THAT STAND OUT.
                </span>
              </motion.h1>
            )}

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed whitespace-pre-wrap text-center mx-auto"
            >
              {heroData?.subheadline ? heroData.subheadline : BRAND_CONFIG.heroSubheadline}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5 pt-2 w-full"
            >
              <button
                onClick={() => onNavigate('work')}
                className="group inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm uppercase tracking-wider hover:bg-slate-100 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] active:scale-95"
              >
                <span>{BRAND_CONFIG.primaryCTA}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="group inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm uppercase tracking-wider border border-white/15 hover:border-violet-500/50 transition-all duration-200 backdrop-blur-sm active:scale-95"
              >
                <span>{BRAND_CONFIG.secondaryCTA}</span>
                <span className="w-2 h-2 rounded-full bg-violet-400 group-hover:scale-125 transition-transform" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 flex justify-center">
        <button
          onClick={() => onNavigate('work')}
          className="group flex flex-col items-center space-y-2 text-slate-400 hover:text-white transition-colors focus:outline-none"
          aria-label="Scroll to explore selected work"
        >
          <span className="text-[10px] font-mono-code tracking-[0.25em] uppercase">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-violet-400 group-hover:text-violet-300" />
        </button>
      </div>
    </section>
  );
};
