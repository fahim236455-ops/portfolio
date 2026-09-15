import React from 'react';
import { Layout, Target, ShoppingBag, Cpu, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data/portfolioData';

interface ServicesProps {
  onNavigate: (sectionId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-6 h-6 text-violet-400" />;
      case 'Target':
        return <Target className="w-6 h-6 text-blue-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-emerald-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-amber-400" />;
      default:
        return <Layout className="w-6 h-6 text-violet-400" />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 relative z-10 bg-[#06060a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-widest text-violet-400">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              <span>SERVICES &amp; CAPABILITIES</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              WHAT I DO
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Custom web design and development services built to elevate your brand presence and drive real business results.
          </p>
        </div>

        {/* 4 Premium Service Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl bg-[#090912] border border-white/10 p-8 hover:border-violet-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Top Bar: Number & Icon */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="font-mono-code text-sm font-bold text-violet-400">
                    {service.number}
                  </span>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-110 group-hover:bg-violet-500/10 transition-all duration-300">
                    {getIcon(service.iconName)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl font-extrabold text-white tracking-tight uppercase group-hover:text-violet-300 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-base leading-relaxed">
                  "{service.description}"
                </p>

                {/* Highlights */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {service.features.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 text-xs text-slate-400 font-mono-code"
                    >
                      • {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center space-x-2 text-xs font-mono-code font-bold uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors"
                >
                  <span>Inquire About {service.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-violet-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
