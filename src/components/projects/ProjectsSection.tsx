import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../common/Container";
import "../../styles/projects.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ProjectStat = {
  value: string;
  label: string;
};

type Project = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  year: string;
  emoji: string;
  stats?: ProjectStat[];
  tags: string[];
  link?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "UniBee Billing System",
    subtitle: "Open Source Subscription Billing Platform",
    description:
      "Led dual product lines across open source and cloud billing experiences. Shaped a multi-tenant architecture for AWS and Aliyun deployment and helped the MVP land in one month.",
    category: "B2B SaaS",
    year: "2025",
    emoji: "💳",
    stats: [
      { value: "1 Month", label: "MVP Launch" },
      { value: "90%+", label: "On-time" },
    ],
    tags: ["Billing", "SaaS", "Cloud", "API"],
    link: "https://unibee.dev",
  },
  {
    id: 2,
    title: "KOL Operations Platform",
    subtitle: "Content Marketing & Ad Management",
    description:
      "Led planning for a KOL management and advertising platform, streamlining workflows across content marketing and commercial ad operations.",
    category: "Marketing SaaS",
    year: "2024-2025",
    emoji: "📢",
    tags: ["Marketing", "CRM", "Analytics"],
  },
  {
    id: 3,
    title: "CPU EdTech Platform",
    subtitle: "Online Education System (0-1)",
    description:
      "Built an enterprise education product from zero to launch and helped it generate over 500K RMB revenue within two months of release.",
    category: "EdTech",
    year: "2023-2024",
    emoji: "🎓",
    stats: [
      { value: "500K+", label: "Revenue" },
      { value: "2 Months", label: "Timeframe" },
    ],
    tags: ["EdTech", "0-1", "SaaS"],
    link: "https://www.educup.com",
  },
  {
    id: 4,
    title: "Baolian Retail Platform",
    subtitle: "O2O New Retail System",
    description:
      "Designed an omnichannel retail platform connecting suppliers, own-brand commerce, and multi-agent collaboration inside one operating model.",
    category: "E-commerce",
    year: "2022-2023",
    emoji: "🛒",
    tags: ["Retail", "O2O", "Marketplace"],
  },
  {
    id: 5,
    title: "Hong Kong Auction System",
    subtitle: "International Live Auction",
    description:
      "Built a live auction platform with streaming, real-time bidding, and proxy bidding flows designed for international participants.",
    category: "Auction",
    year: "2021-2023",
    emoji: "🔨",
    tags: ["Auction", "Live", "International"],
  },
  {
    id: 6,
    title: "Xunke Medical Platform",
    subtitle: "Healthcare Service Matching",
    description:
      "Created Hong Kong's first medical insurance and clinic matching platform to simplify appointment booking, claim matching, and settlement.",
    category: "Healthcare",
    year: "2021-2022",
    emoji: "🏥",
    tags: ["Healthcare", "Insurance", "HK"],
  },
];

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="projects" ref={sectionRef}>
      <Container>
        <div className="projects-header">
          <h2 className="section-title">
            Featured Projects
            <span className="dot-accent" />
          </h2>
          <p className="section-subtitle">
            10+ products launched across B2B SaaS, e-commerce, and edtech.
          </p>
        </div>

        <div className="projects-list" id="projectsList">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-image">
                <div className="project-placeholder" aria-hidden="true">
                  {project.emoji}
                </div>
              </div>

              <div className="project-content">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <span className="meta-dot" />
                  <span className="project-year">{project.year}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>

                {project.stats ? (
                  <div className="project-stats">
                    {project.stats.map((stat) => (
                      <div className="stat-item" key={`${project.id}-${stat.label}`}>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span className="project-tag" key={`${project.id}-${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link ? (
                  <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                    View Project
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Container>

      <div className="square-decoration projects-decoration" aria-hidden="true" />
    </section>
  );
}

export default ProjectsSection;
