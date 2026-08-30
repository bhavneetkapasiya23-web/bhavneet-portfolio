export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: 'Full-Stack' | 'AI & ML' | 'Real-Time' | 'All';
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  image: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  status?: 'Completed' | 'In Progress';
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Advanced", "Proficient", "Intermediate"
    tags?: string[];
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  status?: string;
  details?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date?: string;
  url?: string;
  description?: string;
}

export interface CoreStrength {
  title: string;
  description: string;
  iconName: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
