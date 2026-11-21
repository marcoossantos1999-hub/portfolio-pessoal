import type {
  Certificate,
  Education,
  Project,
  SkillCategory,
} from "@/types/portfolio";

export const projects: Project[] = [
  {
    name: "Dashboard Analytics",
    description:
      "Painel administrativo responsivo para acompanhar indicadores, metas e resultados em tempo real.",
    features: ["Visão geral em tempo real", "Filtros avançados", "Exportação de relatórios"],
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    category: "Full Stack",
    liveUrl: "#",
    repoUrl: "#",
    accent: "cyan",
  },
  {
    name: "Commerce Experience",
    description:
      "Experiência de comércio eletrônico rápida, acessível e preparada para conversão.",
    features: ["Catálogo dinâmico", "Carrinho persistente", "Checkout otimizado"],
    technologies: ["React", "Next.js", "Stripe"],
    category: "Web",
    liveUrl: "#",
    repoUrl: "#",
    accent: "violet",
  },
  {
    name: "Task Flow",
    description:
      "Aplicação colaborativa para organizar demandas e acompanhar o progresso de equipes.",
    features: ["Quadros Kanban", "Notificações", "Colaboração em tempo real"],
    technologies: ["React", "Node.js", "PostgreSQL"],
    category: "Mobile",
    liveUrl: "#",
    repoUrl: "#",
    accent: "orange",
  },
];

export const skillCategories: SkillCategory[] = [
  { title: "Front-end", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { title: "Back-end", skills: ["Node.js", "REST APIs", "Prisma", "Autenticação"] },
  { title: "Dados", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { title: "Ferramentas", skills: ["Git", "Docker", "Figma", "Vercel"] },
];

export const education: Education[] = [
  {
    institution: "Instituição de Ensino",
    course: "Curso ou graduação",
    degree: "Tecnólogo / Bacharelado",
    period: "2022 — 2024",
    status: "Concluído",
    description:
      "Dados demonstrativos. Substitua por sua formação, disciplinas relevantes e conquistas.",
  },
];

export const certificates: Certificate[] = [
  {
    name: "Desenvolvimento Web",
    issuer: "Instituição emissora",
    date: "2025",
    hours: "40 horas",
    description: "Fundamentos de HTML, CSS, JavaScript e desenvolvimento de interfaces.",
  },
  {
    name: "Aplicações com React",
    issuer: "Instituição emissora",
    date: "2025",
    hours: "30 horas",
    description: "Componentes, estado, hooks, arquitetura e boas práticas no React.",
  },
];

export const hobbies = [
  { name: "Tecnologia", description: "Explorar novas ferramentas e tendências.", icon: "cpu" },
  { name: "Música", description: "Desconectar e encontrar novas inspirações.", icon: "music" },
  { name: "Viagens", description: "Conhecer lugares e culturas diferentes.", icon: "plane" },
];
