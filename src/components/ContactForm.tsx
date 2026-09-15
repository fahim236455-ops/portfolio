import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { PROJECT_TYPES, BUDGET_OPTIONS } from '../data/portfolioData';
import { ContactFormData } from '../types';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ContactFormProps {
  preselectedProjectType?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ preselectedProjectType }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: preselectedProjectType || 'Business Website',
    budget: '$250–$500',
    message: '',
  });

  useEffect(() => {
    if (preselectedProjectType) {
      setFormData((prev) => ({ ...prev, projectType: preselectedProjectType }));
    }
  }, [preselectedProjectType]);

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) newErrors.message = 'Please provide brief details about your project.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await addDoc(collection(db, 'messages'), {
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        budget: formData.budget,
        details: formData.message,
        createdAt: serverTimestamp(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      projectType: 'Business Website',
      budget: '$250–$500',
      message: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative z-10 bg-[#040406]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-widest text-violet-400">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              <span>PROJECT INQUIRY</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              LET'S WORK TOGETHER
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
              Fill out the inquiry form below with your project goals and requirements.
            </p>
          </div>

          {/* Form Container */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#080812] border border-white/10 shadow-2xl relative overflow-hidden">
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-2xl font-bold text-white uppercase">
                    Inquiry Received
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Thank you for reaching out, <span className="text-white font-semibold">{formData.name}</span>! Your inquiry details have been registered. I will review your project requirements and respond promptly.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono-code uppercase tracking-wider text-slate-300 border border-white/10 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-mono-code uppercase text-slate-300 font-semibold">
                      Your Name <span className="text-violet-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-violet-500'
                      }`}
                    />
                    {errors.name && (
                      <div className="flex items-center space-x-1 text-xs text-red-400 pt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-mono-code uppercase text-slate-300 font-semibold">
                      Email Address <span className="text-violet-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-violet-500'
                      }`}
                    />
                    {errors.email && (
                      <div className="flex items-center space-x-1 text-xs text-red-400 pt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Type Select */}
                <div className="space-y-2">
                  <label htmlFor="projectType" className="block text-xs font-mono-code uppercase text-slate-300 font-semibold">
                    Project Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PROJECT_TYPES.map((type) => {
                      const isSelected = formData.projectType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-mono-code transition-all ${
                            isSelected
                              ? 'bg-violet-600/20 border-violet-500 text-white font-bold'
                              : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Select */}
                <div className="space-y-2">
                  <label htmlFor="budget" className="block text-xs font-mono-code uppercase text-slate-300 font-semibold">
                    Estimated Budget
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {BUDGET_OPTIONS.map((opt) => {
                      const isSelected = formData.budget === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: opt })}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-mono-code transition-all ${
                            isSelected
                              ? 'bg-violet-600/20 border-violet-500 text-white font-bold'
                              : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-mono-code uppercase text-slate-300 font-semibold">
                    Project Details <span className="text-violet-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell me about your business, website goals, target timeline, or special requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-violet-500'
                    }`}
                  />
                  {errors.message && (
                    <div className="flex items-center space-x-1 text-xs text-red-400 pt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  {submitError && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-900 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-violet-900/30 active:scale-98"
                  >
                    {isSubmitting ? (
                      <span>Processing Inquiry...</span>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
