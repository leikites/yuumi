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
  tags: string[];
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
    tags: ["#SaaS", "#Multi-tenant"],
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
    tags: ["#AlgorithmicRouting"],
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
    tags: [],
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
    tags: [],
    tone: "base",
  },
  {
    id: 5,
    title: "UnionPay HK & Healthcare",
    description:
      "Fintech/MedTech crossover: digital coupon clearing and insurance distribution systems.",
    label: "",
    number: "05",
    tags: ["Payments", "Scalability"],
    tone: "low",
  },
  {
    id: 6,
    title: "International Auction System",
    description:
      "Real-time bidding logic and proxy automation supporting high-concurrency international auctions across multiple timezones.",
    label: "Global E-Commerce",
    number: "06",
    tags: ["Global Sync", "Real-Time", "Logic-Heavy"],
    tone: "lowest",
  },
];

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const tiles = gsap.utils.toArray<HTMLElement>(".project-tile");
      gsap.set(tiles, { opacity: 0, y: 30 });
      tiles.forEach((tile, index) => {
        gsap.to(tile, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: index * 0.06,
          scrollTrigger: {
            trigger: tile,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <Container>
        <main className="projects-main architectural-grid">
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

          <div className="projects-bento">
            {projects.map((project) => {
              const tileClass =
                project.id === 1
                  ? "project-tile project-tile--hero"
                  : project.id === 2
                    ? "project-tile project-tile--side"
                    : project.id === 6
                      ? "project-tile project-tile--wide"
                      : "project-tile project-tile--small";

              return (
                <article className={tileClass} key={project.id} data-tone={project.tone}>
                  {project.imageSrc ? (
                    <div className="project-bg" aria-hidden="true">
                      <img src={project.imageSrc} alt={project.imageAlt ?? ""} />
                    </div>
                  ) : null}

                  <div className="project-number font-label" aria-hidden="true">
                    {project.number}
                  </div>

                  {project.tags.length ? (
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span className="project-tag font-label" key={`${project.id}-${tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="project-body">
                    {project.label ? (
                      <div className="project-label font-label">{project.label}</div>
                    ) : null}

                    <h3 className="project-name font-headline">{project.title}</h3>
                    <p className="project-desc font-body">{project.description}</p>

                    {project.metricLabel ? (
                      <div className="project-metrics">
                        <div className="project-metric">
                          <span className="project-metric-label font-label">
                            {project.metricLabel}
                          </span>
                          {project.metricValue ? (
                            <div className="project-metric-value font-headline">
                              {project.metricValue}
                            </div>
                          ) : null}
                          {project.metricSuffix ? (
                            <div className="project-metric-suffix font-label">
                              {project.metricSuffix}
                            </div>
                          ) : null}
                        </div>

                        {project.secondaryMetricLabel ? (
                          <div className="project-metric">
                            <span className="project-metric-label font-label">
                              {project.secondaryMetricLabel}
                            </span>
                            {project.secondaryMetricValue ? (
                              <div className="project-metric-value font-headline">
                                {project.secondaryMetricValue}
                              </div>
                            ) : null}
                            {project.secondaryMetricSuffix ? (
                              <div className="project-metric-suffix font-label">
                                {project.secondaryMetricSuffix}
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </main>
      </Container>
    </section>
  );
}

export default ProjectsSection;
