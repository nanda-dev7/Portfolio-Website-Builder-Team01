export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  title: string;
  slug: string;
  theme: PortfolioTheme;
  sections: PortfolioSection[];
  seo: SEOConfig;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioTheme {
  primaryColor: string;
  fontFamily: string;
  mode: 'light' | 'dark';
}

export interface PortfolioSection {
  id: string;
  type: SectionType;
  title: string;
  content: any;
  isVisible: boolean;
  order: number;
}

export type SectionType = 
  | 'hero' 
  | 'about' 
  | 'skills' 
  | 'experience' 
  | 'projects' 
  | 'testimonials' 
  | 'contact' 
  | 'footer';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}
