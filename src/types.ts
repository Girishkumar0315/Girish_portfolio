export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  metrics: string[];
  githubUrl?: string;
  liveUrl?: string;
  images: {
    col1Top: string;
    col1Bottom: string;
    col2Tall: string;
  };
}

export interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  score: string;
  details?: string;
}

export interface TrainingItem {
  provider: string;
  title: string;
  period: string;
  highlights: string[];
  badge: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}
