import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG, SOCIAL_LINKS } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = 2026;

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const socialItems = [
    { name: 'LinkedIn', url: SOCIAL_LINKS.linkedin },
    { name: 'GitHub', url: SOCIAL_LINKS.github },
    { name: 'Fiverr', url: SOCIAL_LINKS.fiverr },
    { name: 'Upwork', url: SOCIAL_LINKS.upwork },
  ];

  return (
    <footer className="bg-[#030305] border-t border-white/10 py-16 relative z-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          
          {/* Left Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className="group flex items-center space-x-2 focus:outline-none text-left cursor-pointer"
            >
              <span className="font-heading font-extrabold text-2xl tracking-wider text-white group-hover:text-violet-400 transition-colors">
                {BRAND_CONFIG.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            </a>
            <p className="text-xs font-mono-code text-slate-400">
              {BRAND_CONFIG.role}
            </p>
            <p className="text-xs text-slate-300 max-w-sm pt-1">
              {BRAND_CONFIG.altSupportingLine}
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono-code uppercase font-bold text-white tracking-widest">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); onNavigate(link.id); }}
                    className="hover:text-white transition-colors focus:outline-none cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono-code uppercase font-bold text-white tracking-widest">
              Social &amp; Platforms
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {socialItems.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 hover:text-white transition-colors p-1.5 rounded bg-white/[0.02] border border-white/5"
                >
                  <span>{social.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-300" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 space-y-4 sm:space-y-0">
          <div>
            &copy; {currentYear} {BRAND_CONFIG.name}. All rights reserved.
          </div>
          <div className="text-[11px] font-mono-code text-slate-300">
            Designed &amp; Developed with Modern Web Standards
          </div>
        </div>

      </div>
    </footer>
  );
};
