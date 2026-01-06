
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Project {
  title: string;
  company: string;
  github?: string;
  description: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
  level: number; // 1-5
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  education: {
    school: string;
    degree: string;
    pointer: string;
    year: string;
  }[];
}
