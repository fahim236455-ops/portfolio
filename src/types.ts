export interface ProjectMockupData {
  heroHeading: string;
  heroSub: string;
  badge: string;
  stats: { label: string; value: string }[];
  features: string[];
  themeColor: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  tag: string; // e.g., "CONCEPT PROJECT"
  overview: string;
  challenge: string;
  approach: string;
  designDirection: string;
  keyFeatures: string[];
  technologies: string[];
  accentColor: string;
  mockupData?: ProjectMockupData;
  link?: string;
  imageUrl?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  iconName: 'Layout' | 'Target' | 'ShoppingBag' | 'Cpu';
  features: string[];
}

export interface WhyMePoint {
  number: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string;
}

export interface SkillItem {
  name: string;
  badge: string;
  category: 'Frontend' | 'Design & Styling' | 'Backend & Tools' | 'Workflow';
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  fiverr: string;
  upwork: string;
}
