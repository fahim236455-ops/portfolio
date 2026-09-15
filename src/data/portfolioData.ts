import { Project, ServiceItem, WhyMePoint, ProcessStep, SkillItem, SocialLinks } from '../types';

export const BRAND_CONFIG = {
  name: "FAHIM",
  role: "Web Designer & AI-Assisted Developer",
  heroHeadline: "BUILDING DIGITAL EXPERIENCES THAT STAND OUT.",
  heroHeadlineLines: ["BUILDING DIGITAL", "EXPERIENCES", "THAT STAND OUT."],
  heroSubheadline: "I design and build modern websites that help businesses, brands and startups look credible, communicate clearly and grow online.",
  altSupportingLine: "Modern, fast and conversion-focused websites for businesses, brands and startups.",
  primaryCTA: "View My Work",
  secondaryCTA: "Let's Work Together",
  navCTA: "Let's Talk",
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "restaurant-concept",
    title: "Restaurant Concept",
    category: "Business Website",
    shortDescription: "A premium restaurant website concept focused on elegant presentation, menu discovery and reservations.",
    tag: "CONCEPT PROJECT",
    accentColor: "from-amber-500/20 to-violet-600/20",
    overview: "A sophisticated dining brand concept engineered to evoke warmth, culinary mastery, and seamless guest engagement. Built with interactive menu filtering, table reservation flow, and ambient dark aesthetic.",
    challenge: "Traditional restaurant websites often fail to present high-end culinary craft while remaining fast, accessible, and conversion-ready on mobile devices.",
    approach: "Designed a dark editorial visual layout with micro-animations, clear typography hierarchy, and a streamlined reservation workflow that eliminates friction.",
    designDirection: "Rich dark canvas paired with warm gold accents, high-contrast typography, and smooth page transitions.",
    keyFeatures: [
      "Interactive Digital Menu with category filtering & dietary tags",
      "Seamless Table Reservation Booking Flow",
      "Private Dining & Events Inquiry Module",
      "Chef's Tasting Specials Spotlight Carousel",
      "Mobile-Optimized Quick Order & Location Bar"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    mockupData: {
      heroHeading: "L'ÉTOILE GOURMET",
      heroSub: "Modern Culinary Artistry & Fine Dining",
      badge: "MICHELIN CONCEPT",
      stats: [
        { label: "Guest Satisfaction", value: "99%" },
        { label: "Menu Items", value: "48" },
        { label: "Reservation Speed", value: "< 1 min" }
      ],
      features: ["Seasonal Menu", "Private Vault", "Wine Pairing", "Online Booking"],
      themeColor: "#f59e0b"
    }
  },
  {
    id: "real-estate-concept",
    title: "Real Estate Concept",
    category: "Real Estate Website",
    shortDescription: "A modern property discovery experience designed for a premium real estate brand.",
    tag: "CONCEPT PROJECT",
    accentColor: "from-blue-500/20 to-indigo-600/20",
    overview: "An architectural real estate showcase application emphasizing high-resolution property presentation, interactive floor plans, neighborhood metrics, and instant agent scheduling.",
    challenge: "Complex real estate portals often clutter property listings with intrusive popups and fragmented information hierarchy.",
    approach: "Stripped away visual clutter in favor of spatial layout grid, smooth image slider, dynamic pricing metrics, and intuitive filtered property discovery.",
    designDirection: "Minimalist architecture aesthetic, structural grid layout, cool gray & electric blue accents with ultra-clean property metrics.",
    keyFeatures: [
      "Filtered Property Search (Location, Price Range, Property Type)",
      "Interactive Property Detail Modal & Gallery View",
      "Virtual Tour Request & Agent Calendar Booking",
      "Neighborhood Insights & Key Amenities Grid",
      "Mortgage & Financial Calculator Preview"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    mockupData: {
      heroHeading: "AURA RESIDENCES",
      heroSub: "Architectural Marvels & Luxury Estates",
      badge: "LUXURY PORTFOLIO",
      stats: [
        { label: "Prime Listings", value: "$45M+" },
        { label: "Average Tour Time", value: "15 min" },
        { label: "Client Rating", value: "4.95 / 5" }
      ],
      features: ["Penthouses", "Waterfront Villas", "Sky Residences", "Private Parks"],
      themeColor: "#3b82f6"
    }
  },
  {
    id: "saas-concept",
    title: "SaaS Concept",
    category: "SaaS Landing Page",
    shortDescription: "A futuristic SaaS landing page focused on product clarity, conversion and strong visual hierarchy.",
    tag: "CONCEPT PROJECT",
    accentColor: "from-violet-500/20 to-cyan-500/20",
    overview: "A high-conversion SaaS digital product landing page built to explain complex software features simply through interactive UI mockups, clear feature cards, and interactive pricing tiers.",
    challenge: "SaaS websites frequently lose potential customers due to generic tech jargon and confusing pricing tier structures.",
    approach: "Crafted a futuristic dark UI layout with glowing wireframe dashboards, live feature toggles, customer trust metrics, and an effortless sign-up funnel.",
    designDirection: "Electric purple & cyan neon gradients, glass-like UI preview cards, crisp typography, and high-impact hero CTA placement.",
    keyFeatures: [
      "Interactive Interactive Dashboard UI Preview Grid",
      "Feature Breakdown Cards with Code Snippet Tabs",
      "Interactive Monthly vs Annual Pricing Calculator",
      "Interactive FAQ Accordion & Instant Search Filter",
      "Conversion-Optimized CTA Hero & Floating Sticky Bar"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    mockupData: {
      heroHeading: "SYNAPSE AI ENGINE",
      heroSub: "Automated Data Workflows for Modern Teams",
      badge: "SAAS PLATFORM",
      stats: [
        { label: "Uptime SLA", value: "99.99%" },
        { label: "Processing Speed", value: "12ms" },
        { label: "Active Nodes", value: "10,000+" }
      ],
      features: ["Smart Analytics", "API Mesh", "Auto-scaling", "Zero Trust Security"],
      themeColor: "#8b5cf6"
    }
  }
];

export const MARQUEE_ITEMS = [
  "MODERN WEBSITES",
  "RESPONSIVE DESIGN",
  "LANDING PAGES",
  "BUSINESS WEBSITES",
  "SAAS PORTALS",
  "E-COMMERCE",
  "UI/UX CRAFT",
  "CLEAN CODE"
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    number: "01",
    title: "Business Websites",
    description: "Professional websites designed around your business goals.",
    iconName: "Layout",
    features: ["Brand Credibility", "Structured Content", "Mobile Optimized", "Fast Load Times"]
  },
  {
    number: "02",
    title: "Landing Pages",
    description: "High-impact landing pages designed to communicate value and drive action.",
    iconName: "Target",
    features: ["Conversion Focused", "Clear Messaging", "A/B Ready Architecture", "CTA Optimization"]
  },
  {
    number: "03",
    title: "E-commerce",
    description: "Modern online stores designed for a smooth shopping experience.",
    iconName: "ShoppingBag",
    features: ["Catalog Showcase", "Frictionless Checkout", "Product Highlights", "Mobile Shopping"]
  },
  {
    number: "04",
    title: "Web Apps & Dashboards",
    description: "Clean interfaces and functional web experiences for digital products.",
    iconName: "Cpu",
    features: ["Interactive UI", "State Management", "Component Architecture", "Scalable Setup"]
  }
];

export const ABOUT_TEXT = "I'm focused on creating modern digital experiences that combine strong visual design, usability and performance.\n\nMy approach is simple: understand the goal, design with purpose, build carefully and deliver an experience that feels professional on every screen.";

export const WHY_WORK_WITH_ME: WhyMePoint[] = [
  {
    number: "01",
    title: "Modern Design",
    description: "Clean, premium interfaces built around your brand."
  },
  {
    number: "02",
    title: "Responsive",
    description: "Designed to work beautifully across desktop, tablet and mobile."
  },
  {
    number: "03",
    title: "Performance",
    description: "Fast and optimized experiences."
  },
  {
    number: "04",
    title: "Clear Communication",
    description: "Simple process, clear updates and focused execution."
  },
  {
    number: "05",
    title: "AI-Assisted Workflow",
    description: "Modern AI-assisted development helps accelerate ideation and production while maintaining quality and human oversight."
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    description: "Understand your business, audience and goals.",
    details: "We start by analyzing your brand vision, core message, target customers, and key website requirements."
  },
  {
    number: "02",
    title: "DESIGN",
    description: "Create the structure, visual direction and user experience.",
    details: "I draft clear layout wireframes, select visual assets, typography, and establish a high-end UI design style."
  },
  {
    number: "03",
    title: "BUILD",
    description: "Develop the responsive website and interactive experience.",
    details: "Clean TypeScript and Tailwind code bringing the design to life with fluid animations and responsive precision."
  },
  {
    number: "04",
    title: "REFINE",
    description: "Test, improve and polish every important detail.",
    details: "Cross-device testing, speed audits, micro-interaction polishing, and content hierarchy verification."
  },
  {
    number: "05",
    title: "LAUNCH",
    description: "Prepare the final website for deployment.",
    details: "Final code optimization, SEO setup, domain routing, and smooth project handoff."
  }
];

export const SKILLS_DATA: SkillItem[] = [
  { name: "HTML5", badge: "Semantic Markup", category: "Frontend" },
  { name: "CSS3", badge: "Modern Layouts", category: "Design & Styling" },
  { name: "JavaScript", badge: "ES6+ Logic", category: "Frontend" },
  { name: "TypeScript", badge: "Type Safety", category: "Frontend" },
  { name: "React", badge: "UI Framework", category: "Frontend" },
  { name: "Next.js", badge: "Full-Stack React", category: "Frontend" },
  { name: "Tailwind CSS", badge: "Utility Styling", category: "Design & Styling" },
  { name: "Firebase", badge: "Auth & Firestore", category: "Backend & Tools" },
  { name: "Git", badge: "Version Control", category: "Backend & Tools" },
  { name: "AI-Assisted Dev", badge: "Rapid Execution", category: "Workflow" }
];

export const PROJECT_TYPES = [
  "Business Website",
  "Landing Page",
  "E-commerce",
  "Web App",
  "Other"
];

export const BUDGET_OPTIONS = [
  "Under $100",
  "$100–$250",
  "$250–$500",
  "$500+",
  "Not sure yet"
];

export const SOCIAL_LINKS: SocialLinks = {
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  fiverr: "https://fiverr.com",
  upwork: "https://upwork.com"
};
