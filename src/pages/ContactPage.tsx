import React from 'react';
import { ContactForm } from '../components/ContactForm';

interface ContactPageProps {
  preselectedProjectType?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ preselectedProjectType }) => {
  return (
    <div className="pt-28 pb-24 bg-[#040406] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Form Section */}
        <ContactForm preselectedProjectType={preselectedProjectType} />

      </div>
    </div>
  );
};
