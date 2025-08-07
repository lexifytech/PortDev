export interface Asset {
  id?: string;
  type: 'image' | 'video';
  url: string;
}

export interface Social {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  assets?: Asset[];
  projectUrl?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  social?: Social;
  projects: Project[];
}

export interface Portfolio {
  data: PortfolioData;
}

// Type alias for skill (string)
export type Skill = string;