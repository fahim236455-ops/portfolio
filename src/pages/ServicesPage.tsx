import React, { useState, useEffect } from 'react';
import { Layout, Target, ShoppingBag, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data/portfolioData';
import { ServiceItem } from '../types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ServicesPageProps {
  onNavigatePage: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigatePage }) => {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'services'));
        if (docSnap.exists() && docSnap.data().items) {
          setServices(docSnap.data().items);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-7 h-7 text-violet-400" />;
      case 'Target':
        return <Target className="w-7 h-7 text-blue-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-7 h-7 text-emerald-400" />;
      case 'Cpu':
        return <Cpu className="w-7 h-7 text-amber-400" />;
      default:
        return <Layout className="w-7 h-7 text-violet-400" />;
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#040406] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-widest text-violet-400">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span>SERVICES &amp; CAPABILITIES</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase">
            WHAT I DO
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Professional web design and development services built around your specific business goals, brand identity, and target audience.
          </p>
        </div>

        {/* Extended 4 Service Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#090912] border border-white/10 hover:border-violet-500/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] flex flex-col justify-between space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <span className="font-mono-code text-base font-bold text-violet-400">
                    SERVICE 0{index + 1}
                  </span>
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    {getIcon(service.iconName)}
                  </div>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                  {service.title}
                </h2>

                <p className="text-slate-300 text-base leading-relaxed">
                  "{service.description}"
                </p>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <span className="text-xs font-mono-code uppercase text-slate-400 font-semibold">
                    Core Service Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => onNavigatePage('contact')}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-violet-900/40"
                >
                  <span>Inquire About {service.title}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
