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
      const tiles = gsap.utils.toArray<HTMLElement>(".project-tile");
      gsap.set(tiles, { opacity: 0, y: 24, filter: "blur(10px)" });

      // Batch entrance for consistent rhythm and fewer triggers.
      ScrollTrigger.batch(tiles, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
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

  const projectById = Object.fromEntries(
    projects.map((project) => [project.id, project]),
  ) as Record<number, Project>;

  const renderTags = (project: Project) => {
    if (!project.hoverTags.length) {
      return null;
    }

    return (
      <div className="project-tags">
        {project.hoverTags.map((tag, tagIndex) => (
          <span
            className="project-tag font-label"
            key={`${project.id}-${tag}`}
            style={{ "--tag-index": tagIndex } as React.CSSProperties}
          >
            {tag}
          </span>
        ))}
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

          <div className="projects-matrix">
            <article
              className="project-tile project-tile--p1"
              data-tone={projectById[1].tone}
              onMouseMove={onTileMouseMove}
              onMouseLeave={onTileMouseLeave}
            >
              {renderTags(projectById[1])}
              <div className="project-number font-label" aria-hidden="true">
                {projectById[1].number}
              </div>

              <div className="project-body">
                <div className="project-header-row">
                  <span className="project-code font-label">01_ALPHA</span>
                </div>

                <div className="project-title-row">
                  <span className="project-title-accent" aria-hidden="true" />
                  <h3 className="project-name font-headline">{projectById[1].title}</h3>
                </div>
                <p className="project-desc font-body">{projectById[1].description}</p>
              </div>

              <div className="project-footer">
                {projectById[1].imageSrc ? (
                  <div className="project-media" aria-hidden="true">
                    <img src={projectById[1].imageSrc} alt={projectById[1].imageAlt ?? ""} />
                  </div>
                ) : null}

                <div className="project-footer-row">
                  <div className="project-impact">
                    <div className="project-impact-value font-headline">30%</div>
                    <div className="project-impact-label font-label">Delivery Cycle Reduction</div>
                  </div>
                  <span className="material-symbols-outlined project-footer-icon">
                    arrow_outward
                  </span>
                </div>
              </div>
            </article>

            <article
              className="project-tile project-tile--p2"
              data-tone={projectById[2].tone}
              onMouseMove={onTileMouseMove}
              onMouseLeave={onTileMouseLeave}
            >
              {renderTags(projectById[2])}
              <div className="project-number font-label" aria-hidden="true">
                {projectById[2].number}
              </div>

              <div className="project-body">
                <div className="project-header-row">
                  <span className="project-code font-label">02_BETA</span>
                  <div className="project-micro-metric">
                    <div className="project-micro-metric-label font-label">Impact_Metric</div>
                    <div className="project-micro-metric-value font-headline">PHASE 2</div>
                    <div className="project-micro-metric-sub font-label">
                      Schedule Order Deployment
                    </div>
                  </div>
                </div>

                <div className="project-title-row">
                  <span className="project-title-accent" aria-hidden="true" />
                  <h3 className="project-name font-headline">{projectById[2].title}</h3>
                </div>

                <div className="project-footer-row project-footer-row--inline">
                  <p className="project-desc font-body">{projectById[2].description}</p>
                  <span className="material-symbols-outlined project-footer-icon">monitoring</span>
                </div>
              </div>
            </article>

            <article
              className="project-tile project-tile--p3"
              data-tone={projectById[3].tone}
              onMouseMove={onTileMouseMove}
              onMouseLeave={onTileMouseLeave}
            >
              {renderTags(projectById[3])}
              <div className="project-number font-label" aria-hidden="true">
                {projectById[3].number}
              </div>

              <div className="project-body">
                <span className="project-code project-code--small font-label">03_GAMMA</span>
                <h3 className="project-name project-name--small font-headline">
                  {projectById[3].title}
                </h3>
              </div>

              <div className="project-footer">
                <div className="project-impact-value font-headline">250K CNY</div>
                <div className="project-impact-label font-label">Revenue generated in 14 days</div>
              </div>
            </article>

            <article
              className="project-tile project-tile--p4"
              data-tone={projectById[4].tone}
              onMouseMove={onTileMouseMove}
              onMouseLeave={onTileMouseLeave}
            >
              {renderTags(projectById[4])}
              <div className="project-number font-label" aria-hidden="true">
                {projectById[4].number}
              </div>

              <div className="project-body">
                <span className="project-code project-code--small font-label">04_DELTA</span>
                <h3 className="project-name project-name--small font-headline">
                  {projectById[4].title}
                </h3>
              </div>

              <div className="project-footer">
                <div className="project-verified">
                  <span className="material-symbols-outlined project-verified-icon">verified</span>
                  <span className="project-verified-text font-headline">PATENT_SECURED</span>
                </div>
                <p className="project-desc project-desc--small font-body">
                  {projectById[4].description}
                </p>
              </div>
            </article>

            <article
              className="project-tile project-tile--p5"
              data-tone={projectById[5].tone}
              onMouseMove={onTileMouseMove}
              onMouseLeave={onTileMouseLeave}
            >
              {renderTags(projectById[5])}
              <div className="project-number font-label" aria-hidden="true">
                {projectById[5].number}
              </div>

              <div className="project-body">
                <div className="project-header-row">
                  <div>
                    <span className="project-code font-label">05_EPSILON</span>
                    <div className="project-title-row">
                      <span className="project-title-accent" aria-hidden="true" />
                      <h3 className="project-name font-headline">{projectById[5].title}</h3>
                    </div>
                  </div>
                  <div className="project-icon-stack" aria-hidden="true">
                    <span className="material-symbols-outlined project-icon-muted">
                      account_balance
                    </span>
                    <span className="material-symbols-outlined project-icon-muted">
                      medical_services
                    </span>
                  </div>
                </div>

                <div className="project-status-row">
                  <p className="project-desc font-body">{projectById[5].description}</p>
                  <div className="project-status">
                    <div className="project-status-label font-label">System_Status</div>
                    <div className="project-status-value">
                      <span className="project-status-dot" aria-hidden="true" />
                      <span className="font-headline">LIVE_DEPLOYED</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article
              className="project-tile project-tile--p6"
              data-tone={projectById[6].tone}
              onMouseMove={onTileMouseMove}
              onMouseLeave={onTileMouseLeave}
            >
              {renderTags(projectById[6])}
              <div className="project-number font-label" aria-hidden="true">
                {projectById[6].number}
              </div>

              <div className="project-body">
                <span className="project-code project-code--small font-label">06_ZETA</span>
                <h3 className="project-name project-name--small font-headline">
                  Global Auction Engine
                </h3>
              </div>

              <div className="project-footer">
                <p className="project-desc project-desc--small font-body">
                  Real-time state synchronization for high-frequency bidding worldwide.
                </p>
                <div className="project-footer-row project-footer-row--inline">
                  <span className="project-footnote font-label">High-Concurrency</span>
                  <span className="material-symbols-outlined project-footer-icon">gavel</span>
                </div>
              </div>
            </article>

            <div className="project-tile project-tile--deco" aria-hidden="true">
              <div className="project-deco-shapes">
                <div className="project-deco-shape project-deco-shape--a" />
                <div className="project-deco-shape project-deco-shape--b" />
                <div className="project-deco-shape project-deco-shape--c" />
              </div>
              <div className="project-deco-meta">
                <div className="project-deco-label font-label">System Integrity</div>
                <div className="project-deco-value font-label">99.99% UPTIME</div>
              </div>
            </div>
          </div>
        </main>
      </Container>
    </section>
  );
}

export default ProjectsSection;
