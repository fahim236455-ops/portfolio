import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG } from '../data/portfolioData';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setIsAdmin(!!user && user.email === 'fahim236455@gmail.com');
    });
    return unsubscribe;
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin Portal' }] : []),
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#040406]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleLinkClick('home')}
          className="group flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-md p-1"
          aria-label="Fahim Home"
        >
          <span className="font-heading font-extrabold text-xl tracking-wider text-white group-hover:text-violet-400 transition-colors">
            {BRAND_CONFIG.name}
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-500 group-hover:scale-150 transition-transform"></span>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-white/[0.03] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.id); }}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-widest font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/10 shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => handleLinkClick('contact')}
            className="group relative inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] active:scale-95"
          >
            <span>{BRAND_CONFIG.navCTA}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-[#07070c]/98 backdrop-blur-xl border-b border-white/10 px-6 py-8 shadow-2xl transition-all duration-300 z-40">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.id); }}
                className={`text-left py-3 px-4 rounded-lg font-heading text-lg tracking-wider uppercase transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? 'text-violet-400 bg-white/[0.05] border-l-2 border-violet-500 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-violet-900/30"
              >
                <span>{BRAND_CONFIG.navCTA}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
