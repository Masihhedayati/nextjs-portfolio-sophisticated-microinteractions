export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'desktop' | 'ai' | 'other';
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  date: string;
  highlights?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'language' | 'tool';
  proficiency: number; // 1-10
  yearsOfExperience?: number;
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string; // undefined means current
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ContactInfo {
  email: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  resumeUrl?: string;
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    avatar?: string;
  };
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  contact: ContactInfo;
}