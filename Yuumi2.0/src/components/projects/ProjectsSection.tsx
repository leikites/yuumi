import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../common/Container";
import "../../styles/projects.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Project = {
  id: number;
  title: string;
  description: string;
  label: string;
  number: string;
  metricLabel?: string;
  metricValue?: string;
  metricSuffix?: string;
  secondaryMetricLabel?: string;
  secondaryMetricValue?: string;
  secondaryMetricSuffix?: string;
  hoverTags: string[];
  tone: "lowest" | "low" | "high" | "base";
  imageSrc?: string;
  imageAlt?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Unibee Billing System",
    description:
      "SaaS infrastructure with a focus on multi-tenant architecture and seamless cloud migration strategies.",
    label: "SaaS Infrastructure",
    number: "01",
    metricLabel: "Key Metric",
    metricValue: "-30%",
    metricSuffix: "Delivery Cycles",
    secondaryMetricLabel: "Execution",
    secondaryMetricValue: "30 Days",
    secondaryMetricSuffix: "MVP Launch",
    hoverTags: ["#SAAS", "#MULTI-TENANT", "#CLOUD-NATIVE"],
    tone: "lowest",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhw3Gq_yO-jAKuP3pCKFQWHBJ0-VeryyMAQFF5-nCMXHxKJtIHuUjVeTt4QfYXHRC8zJSSIARKM4_T3RMn_9N8mBWQSLpnZ5flz9b40uf79vUFtO8KJ4vQc1w3FMaAaFKeIIZ1xeqBjpY6xMX1JPMw4qAx-DCoZcv_yC-uLY-knq4j0e1U8n5XOSFl3MTw5TdNeVmkz6b4YqyKooa7_qJf20u7v4bLNj42tq-adqyGq_jrAavbKWgv1VxqJDdKvGM7iYoMtyoLU10",
    imageAlt:
      "Abstract macro shot of server rack blinking lights and complex fiber optic wiring in a dark data center",
  },
  {
    id: 2,
    title: "HK Amigo Taxi",
    description:
      "Mobility & fleet management through advanced algorithmic routing and regulatory logic.",
    label: "Mobility",
    number: "02",
    metricLabel: "Success",
    metricValue: '"Launched Schedule Order Phase 2"',
    hoverTags: ["#MOBILITY", "#FLEET-OPS", "#REAL-TIME"],
    tone: "low",
  },
  {
    id: 3,
    title: "CPU EdTech Platform",
    description: "High-concurrency O2O marketplace system handling rapid transactional bursts.",
    label: "",
    number: "03",
    metricLabel: "Revenue / 14 Days",
    metricValue: "250K CNY",
    hoverTags: ["#EDTECH", "#O2O", "#HIGH-CONCURRENCY"],
    tone: "high",
  },
  {
    id: 4,
    title: "JewelLink Supply Chain",
    description: "Microservices-based distribution logic securing technological IP.",
    label: "",
    number: "04",
    metricLabel: "National Patent Secured",
    metricValue: "",
    hoverTags: ["#SUPPLY-CHAIN", "#MICROSERVICES", "#PATENTED"],
    tone: "base",
  },
  {
    id: 5,
    title: "UnionPay HK & Healthcare",
    description:
      "Fintech/MedTech crossover: digital coupon clearing and insurance distribution systems.",
    label: "",
    number: "05",
    hoverTags: ["#FINTECH", "#MEDTECH", "#INSURANCE"],
    tone: "low",
  },
  {
    id: 6,
    title: "International Auction System",
    description:
      "Real-time bidding logic and proxy automation supporting high-concurrency international auctions across multiple timezones.",
    label: "Global E-Commerce",
    number: "06",
    hoverTags: ["#GLOBAL-SYNC", "#REAL-TIME", "#LOGIC-HEAVY"],
    tone: "lowest",
  },
];

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{
    el: HTMLElement;
    x: number;
    y: number;
  } | null>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".project-ledger-row");
      gsap.set(rows, { opacity: 0, y: 20, filter: "blur(8px)" });

      // Batch entrance for consistent rhythm and fewer triggers.
      ScrollTrigger.batch(rows, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.1,
            overwrite: "auto",
          });
        },
        once: true,
      });
    },
    { scope: sectionRef },
  );

  const onTileMouseMove: React.MouseEventHandler<HTMLElement> = (event) => {
    const tile = event.currentTarget;
    const rect = tile.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    pendingRef.current = { el: tile, x, y };

    if (rafRef.current) {
      return;
    }

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const pending = pendingRef.current;
      if (!pending) {
        return;
      }
      pending.el.style.setProperty("--mouse-x", `${pending.x}px`);
      pending.el.style.setProperty("--mouse-y", `${pending.y}px`);
    });
  };

  const onTileMouseLeave: React.MouseEventHandler<HTMLElement> = (event) => {
    const tile = event.currentTarget;
    tile.style.removeProperty("--mouse-x");
    tile.style.removeProperty("--mouse-y");
  };

  const renderTags = (project: Project) => (
    <div className="project-ledger-tags" aria-label="Project tags">
      {project.hoverTags.slice(0, 3).map((tag) => (
        <span className="project-ledger-tag font-label" key={`${project.id}-${tag}`}>
          {tag.replace(/^#/, "")}
        </span>
      ))}
    </div>
  );

  const renderMetric = (value?: string, label?: string, suffix?: string) => {
    if (!value && !label && !suffix) return null;
    return (
      <div className="project-ledger-metric">
        {value ? <div className="project-ledger-metric-value font-headline">{value}</div> : null}
        {label ? <div className="project-ledger-metric-label font-label">{label}</div> : null}
        {suffix ? <div className="project-ledger-metric-suffix font-label">{suffix}</div> : null}
      </div>
    );
  };

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <Container>
        <main className="projects-main">
          <header className="projects-hero">
            <div className="projects-kicker">
              <span className="projects-kicker-line" aria-hidden="true" />
              <span className="projects-kicker-text font-label">Selected Work</span>
            </div>
            <h2 className="projects-title font-headline">
              <span className="projects-title-muted">MY</span>
              <span className="projects-title-primary">Projects</span>
            </h2>
            <p className="projects-subtitle font-body">
              A fusion of high-frequency technical logic and architectural product management.
              Scaling systems from MVP to multi-tenant giants.
            </p>
          </header>

          <div className="projects-ledger" role="list">
            {projects.map((project) => (
              <article
                key={project.id}
                className="project-ledger-row"
                data-tone={project.tone}
                onMouseMove={onTileMouseMove}
                onMouseLeave={onTileMouseLeave}
                role="listitem"
              >
                <div className="project-ledger-grid">
                  <div className="project-ledger-meta">
                    <div className="project-ledger-meta-kicker font-label">PROJECT</div>
                    <div className="project-ledger-meta-number font-label">{project.number}</div>
                    <div className="project-ledger-meta-label font-label">
                      {project.label || "INDEPENDENT"}
                    </div>
                  </div>

                  <div className="project-ledger-main">
                    <h3 className="project-ledger-title font-headline">{project.title}</h3>
                    <p className="project-ledger-desc font-body">{project.description}</p>
                  </div>

                  <aside className="project-ledger-card" aria-label="Project metrics">
                    <div className="project-ledger-card-header">{renderTags(project)}</div>
                    <div className="project-ledger-card-body">
                      {renderMetric(project.metricValue, project.metricLabel, project.metricSuffix)}
                      {renderMetric(
                        project.secondaryMetricValue,
                        project.secondaryMetricLabel,
                        project.secondaryMetricSuffix,
                      )}
                      <div className="project-ledger-card-icon" aria-hidden="true">
                        <span className="material-symbols-outlined">arrow_outward</span>
                      </div>
                    </div>
                  </aside>
                </div>
              </article>
            ))}
          </div>
        </main>
      </Container>
    </section>
  );
}

export default ProjectsSection;
