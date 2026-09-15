import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface CTASectionProps {
  onNavigate: (sectionId: string) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 sm:py-32 relative z-10 overflow-hidden bg-[#040406] border-t border-white/10">
      {/* Background Animated Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-violet-600/20 via-indigo-600/15 to-blue-600/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-8 p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#0a0a14] to-[#06060c] border border-white/15 shadow-2xl bg-tech-grid"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono-code text-violet-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>READY TO BUILD</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight">
            HAVE A PROJECT IN MIND?
          </h2>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Let's turn your idea into a modern digital experience.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm uppercase tracking-wider hover:bg-slate-100 transition-all duration-200 shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] active:scale-95"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
