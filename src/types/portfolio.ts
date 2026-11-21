export type Project = {
  name: string;
  description: string;
  features: string[];
  technologies: string[];
  category: "Web" | "Mobile" | "Full Stack";
  liveUrl?: string;
  repoUrl?: string;
  accent: "cyan" | "violet" | "orange";
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export type Education = {
  institution: string;
  course: string;
  degree: string;
  period: string;
  status: "Concluído" | "Cursando";
  description: string;
};

export type Certificate = {
  name: string;
  issuer: string;
  date: string;
  hours?: string;
  description: string;
  validationUrl?: string;
};
