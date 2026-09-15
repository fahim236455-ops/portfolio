import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ProcessStep } from '../types';

export const Process: React.FC = () => {
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(PROCESS_STEPS);

  useEffect(() => {
    const fetchProcess = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'process'));
        if (docSnap.exists() && docSnap.data().items) {
          setProcessSteps(docSnap.data().items);
        }
      } catch (error) {
        console.error("Error fetching process steps:", error);
      }
    };
    fetchProcess();
  }, []);

  return (
    <section id="process" className="py-24 sm:py-32 relative z-10 bg-[#040406]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-widest text-violet-400">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span>WORKFLOW &amp; TIMELINE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            HOW IT WORKS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            A structured {processSteps.length}-phase process that ensures transparency, speed, and exceptional final quality.
          </p>
        </div>

        {/* Process Steps Timeline */}
        <div className={`relative border-l border-white/10 ml-4 md:ml-0 md:border-l-0 md:grid md:grid-cols-${Math.min(processSteps.length, 5)} md:gap-4 space-y-8 md:space-y-0`}>
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-0 md:pt-6 space-y-4 group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute left-[-9px] top-0 md:top-[-9px] md:left-0 w-4 h-4 rounded-full bg-[#040406] border-2 border-violet-500 group-hover:scale-125 group-hover:bg-violet-500 transition-all duration-300" />

              {/* Step Number & Title */}
              <div className="p-6 rounded-2xl bg-[#080810] border border-white/10 group-hover:border-violet-500/40 transition-all duration-300 h-full flex flex-col justify-between space-y-4 shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-xs font-bold text-violet-400">
                      STEP {step.number}
                    </span>
                    <span className="text-[10px] font-mono-code text-slate-400 uppercase">PHASE 0{index + 1}</span>
                  </div>

                  <h3 className="font-heading text-lg font-extrabold text-white uppercase tracking-wider group-hover:text-violet-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    "{step.description}"
                  </p>
                </div>

                <p className="text-slate-400 text-[11px] pt-3 border-t border-white/5 leading-normal">
                  {step.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
