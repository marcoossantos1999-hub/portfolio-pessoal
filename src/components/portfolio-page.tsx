"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Award,
  BriefcaseBusiness,
  Check,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Moon,
  Music2,
  Plane,
  Send,
  Sun,
  X,
} from "lucide-react";
import { profile } from "@/data/profile";
import { certificates, education, hobbies, projects, skillCategories } from "@/data/portfolio";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  email: z.email("Informe um e-mail válido."),
  subject: z.string().trim().min(3, "Informe o assunto."),
  message: z.string().trim().min(10, "Escreva ao menos 10 caracteres."),
});

type ContactValues = z.infer<typeof contactSchema>;

const navItems = [
  ["Sobre", "sobre"],
  ["Projetos", "projetos"],
  ["Skills", "skills"],
  ["Formação", "formacao"],
  ["Contato", "contato"],
] as const;

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function PortfolioPage() {
  const [dark, setDark] = useState(() =>
    typeof window === "undefined"
      ? true
      : (localStorage.getItem("portfolio-theme") ?? "dark") === "dark",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("sobre");
  const [projectFilter, setProjectFilter] = useState("Todos");
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55%", threshold: 0 },
    );
    navItems.forEach(([, id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (values: ContactValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const subject = encodeURIComponent(values.subject);
    const body = encodeURIComponent(
      `Nome: ${values.name}\nE-mail: ${values.email}\n\n${values.message}`,
    );
    const mailLink = document.createElement("a");
    mailLink.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    mailLink.click();
    setSent(true);
    reset();
  };

  const filteredProjects =
    projectFilter === "Todos"
      ? projects
      : projects.filter((project) => project.category === projectFilter);

  return (
    <main>
      <nav className="navbar" aria-label="Navegação principal">
        <a className="brand" href="#sobre" aria-label="Ir para o início">
          <span>MS</span>
          <strong>MARCO</strong>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="theme-button"
          aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
          onClick={() => setDark((value) => !value)}
        >
          {dark ? <Sun /> : <Moon />}
        </button>
      </nav>

      <section id="sobre" className="hero section-shell">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="availability"><span /> Disponível para oportunidades</p>
          <p className="hero-greeting">{profile.greeting}</p>
          <h1>{profile.name}</h1>
          <h2>{profile.role}</h2>
          <p className="hero-summary">{profile.summary}</p>
          <blockquote>{profile.headline}</blockquote>
          <div className="hero-actions">
            <a className="button button-primary" href="#projetos">
              Ver projetos <ArrowRight />
            </a>
            <a className="button button-secondary" href="#contato">
              Entrar em contato
            </a>
          </div>
          <div className="hero-links">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Code2 /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <BriefcaseBusiness /> LinkedIn
            </a>
            <a href="/resume.pdf" download>
              <Download /> Currículo
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <div className="portrait-glow" />
          <div className="portrait">
            <div className="code-grid" />
            <div className="portrait-mark">
              <Code2 />
              <span>DEV</span>
            </div>
          </div>
          <div className="floating-card card-code">
            <Code2 />
            <div><span>Código limpo</span><strong>Qualidade</strong></div>
          </div>
          <div className="floating-card card-product">
            <BriefcaseBusiness />
            <div><span>Foco em</span><strong>Produto</strong></div>
          </div>
        </motion.div>
        <a className="scroll-cue" href="#projetos" aria-label="Ir para projetos">
          <span>Explore</span><ArrowDown />
        </a>
      </section>

      <section id="projetos" className="section section-shell">
        <SectionTitle eyebrow="01 / Portfólio" title="Projetos selecionados" />
        <div className="project-toolbar">
          {["Todos", "Web", "Mobile", "Full Stack"].map((filter) => (
            <button
              type="button"
              key={filter}
              className={projectFilter === filter ? "active" : ""}
              onClick={() => setProjectFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <motion.div layout className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.article
              layout
              key={project.name}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className={`project-preview ${project.accent}`}>
                <div className="preview-browser">
                  <div className="browser-dots"><i /><i /><i /></div>
                  <div className="preview-content">
                    <span />
                    <div className="preview-chart">
                      {[40, 58, 46, 72, 64, 88, 76].map((height, i) => (
                        <i key={i} style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>0{index + 1}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <ul>
                  {project.features.map((feature) => (
                    <li key={feature}><Check /> {feature}</li>
                  ))}
                </ul>
                <div className="tech-list">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} aria-label={`Abrir ${project.name}`}>
                      Ver projeto <ExternalLink />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} aria-label={`Código de ${project.name}`}>
                      <Code2 /> Código
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section id="skills" className="section section-shell">
        <SectionTitle eyebrow="02 / Capacidades" title="Skills técnicas" />
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.article
              key={category.title}
              className="skill-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
            >
              <div className="skill-icon"><Cpu /></div>
              <h3>{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="formacao" className="section section-shell">
        <SectionTitle eyebrow="03 / Trajetória" title="Formação e certificados" />
        <div className="education-layout">
          <div className="education-column">
            <h3><GraduationCap /> Formação acadêmica</h3>
            {education.map((item) => (
              <article className="timeline-card" key={item.course}>
                <span className="timeline-dot" />
                <p>{item.period}</p>
                <h4>{item.course}</h4>
                <strong>{item.institution} · {item.degree}</strong>
                <span className="status">{item.status}</span>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="certificate-column">
            <h3><Award /> Certificados</h3>
            {certificates.map((certificate) => (
              <article className="certificate-card" key={certificate.name}>
                <button
                  type="button"
                  className="certificate-preview"
                  onClick={() => setSelectedCertificate(certificate.name)}
                  aria-label={`Ampliar certificado ${certificate.name}`}
                >
                  <div className="certificate-seal"><Award /></div>
                  <span>Certificado</span>
                </button>
                <div>
                  <p>{certificate.date}{certificate.hours ? ` · ${certificate.hours}` : ""}</p>
                  <h4>{certificate.name}</h4>
                  <strong>{certificate.issuer}</strong>
                  <p>{certificate.description}</p>
                  {certificate.validationUrl && (
                    <a href={certificate.validationUrl} target="_blank" rel="noreferrer">
                      Validar <ExternalLink />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="hobbies">
          <div className="hobbies-heading">
            <span>Além do código</span>
            <h3>Interesses pessoais</h3>
          </div>
          <div className="hobbies-grid">
            {hobbies.map((hobby) => (
              <article key={hobby.name}>
                <div>
                  {hobby.icon === "music" ? <Music2 /> : hobby.icon === "plane" ? <Plane /> : <Cpu />}
                </div>
                <h4>{hobby.name}</h4>
                <p>{hobby.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="section contact-section">
        <div className="section-shell">
          <SectionTitle eyebrow="04 / Conversamos?" title="Vamos criar algo juntos" />
          <div className="contact-layout">
            <div className="contact-copy">
              <p>
                Tem uma oportunidade, projeto ou ideia? Será um prazer conversar.
              </p>
              <div className="contact-details">
                <a href={`mailto:${profile.email}`}><Mail /><span><small>E-mail</small>{profile.email}</span></a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness /><span><small>LinkedIn</small>Conectar profissionalmente</span></a>
                <a href={profile.github} target="_blank" rel="noreferrer"><Code2 /><span><small>GitHub</small>Ver repositórios</span></a>
                <div><MapPin /><span><small>Localização</small>{profile.location}</span></div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form-row">
                <label>
                  <span>Nome</span>
                  <input {...register("name")} placeholder="Seu nome" />
                  {errors.name && <small>{errors.name.message}</small>}
                </label>
                <label>
                  <span>E-mail</span>
                  <input {...register("email")} type="email" placeholder="voce@email.com" />
                  {errors.email && <small>{errors.email.message}</small>}
                </label>
              </div>
              <label>
                <span>Assunto</span>
                <input {...register("subject")} placeholder="Como posso ajudar?" />
                {errors.subject && <small>{errors.subject.message}</small>}
              </label>
              <label>
                <span>Mensagem</span>
                <textarea {...register("message")} rows={5} placeholder="Conte um pouco sobre sua ideia..." />
                {errors.message && <small>{errors.message.message}</small>}
              </label>
              <button className="button button-primary submit-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Preparando..." : "Enviar mensagem"} <Send />
              </button>
              {sent && (
                <p className="form-success" role="status">
                  Sua mensagem foi preparada no aplicativo de e-mail.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="section-shell">
          <div className="brand"><span>MS</span><strong>MARCO</strong></div>
          <p>© 2026 {profile.name}. Todos os direitos reservados.</p>
          <a className="back-top" href="#sobre" aria-label="Voltar ao topo"><ArrowUp /></a>
        </div>
      </footer>

      {selectedCertificate && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="Certificado ampliado">
          <button type="button" className="modal-backdrop" onClick={() => setSelectedCertificate(null)} aria-label="Fechar" />
          <div className="modal-card">
            <button type="button" className="modal-close" onClick={() => setSelectedCertificate(null)} aria-label="Fechar certificado"><X /></button>
            <Award />
            <p>Certificado</p>
            <h3>{selectedCertificate}</h3>
            <span>{certificates.find((item) => item.name === selectedCertificate)?.issuer}</span>
          </div>
        </div>
      )}
    </main>
  );
}
