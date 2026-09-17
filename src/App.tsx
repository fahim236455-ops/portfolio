import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';
import { OrbitCursor } from './components/OrbitCursor';
import { Project } from './types';
import { motion, AnimatePresence } from 'motion/react';

type PageRoute = 'home' | 'work' | 'services' | 'about' | 'process' | 'contact' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [preselectedProjectType, setPreselectedProjectType] = useState<string>('Business Website');

  // Hash routing handler
  useEffect(() => {
    const syncHashRoute = () => {
      const hash = window.location.hash.replace('#', '').replace('/', '').toLowerCase();
      if (['home', 'work', 'services', 'about', 'process', 'contact', 'admin'].includes(hash)) {
        setCurrentPage(hash as PageRoute);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    syncHashRoute();
    window.addEventListener('hashchange', syncHashRoute);
    return () => window.removeEventListener('hashchange', syncHashRoute);
  }, []);

  // Page navigation switcher
  const handleNavigatePage = (target: string) => {
    let page: PageRoute = 'home';
    if (target === 'hero') page = 'home';
    else if (['home', 'work', 'services', 'about', 'process', 'contact', 'admin'].includes(target)) {
      page = target as PageRoute;
    }

    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProjectForContact = (projectCategory: string) => {
    setPreselectedProjectType(projectCategory);
    handleNavigatePage('contact');
  };

  return (
    <div className="min-h-screen bg-[#040406] text-slate-100 flex flex-col font-sans selection:bg-violet-500/30 selection:text-violet-200">
      <OrbitCursor />
      
      {/* Navigation Bar */}
      <Navbar activeSection={currentPage === 'home' ? 'hero' : currentPage} onNavigate={handleNavigatePage} />

      {/* Main Multi-Page Content Area with page transition */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {currentPage === 'home' && (
              <HomePage
                onNavigatePage={handleNavigatePage}
                onSelectProject={(project) => setSelectedProject(project)}
              />
            )}

            {currentPage === 'work' && (
              <WorkPage
                onSelectProject={(project) => setSelectedProject(project)}
                onNavigatePage={handleNavigatePage}
              />
            )}

            {currentPage === 'services' && (
              <ServicesPage onNavigatePage={handleNavigatePage} />
            )}

            {currentPage === 'about' && <AboutPage />}

            {currentPage === 'process' && <ProcessPage />}

            {currentPage === 'contact' && (
              <ContactPage preselectedProjectType={preselectedProjectType} />
            )}

            {currentPage === 'admin' && <AdminPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigatePage} />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProjectForContact={handleSelectProjectForContact}
      />
    </div>
  );
}
