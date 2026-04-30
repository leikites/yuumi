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
  icon: string;
  meter?: number;
  imageSrc?: string;
  imageAlt?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Amigo Taxi Platform",
    description:
      "Three-app ecosystem (Client, Driver, Admin) for a Hong Kong Government-licensed taxi fleet, covering fleet operations, real-time monitoring, and continuous rider/driver experience optimization. AI agent workflows lifted team productivity by ~40%.",
    label: "Mobility Solution",
    number: "01",
    metricLabel: "Fleet Scope",
    metricValue: "600+",
    metricSuffix: "Vehicles",
    secondaryMetricLabel: "EV Fleet",
    secondaryMetricValue: "400",
    secondaryMetricSuffix: "EVs",
    hoverTags: ["#RIDE-HAILING", "#FLEET-MGMT", "#AI-WORKFLOWS"],
    tone: "lowest",
    icon: "local_taxi",
    meter: 98.4,
  },
  {
    id: 2,
    title: "UniBee Billing System",
    description:
      "Open-source subscription billing system and cloud version. Improved response speed by 20%, shipped Cloud MVP in 1 month, lifted pricing conversion by 15%, and achieved 100% on-time delivery for critical releases.",
    label: "Fintech SaaS",
    number: "02",
    metricLabel: "Response Speed",
    metricValue: "+20%",
    secondaryMetricLabel: "Cloud MVP",
    secondaryMetricValue: "1 Month",
    hoverTags: ["#SAAS", "#BILLING", "#SUBSCRIPTIONS"],
    tone: "low",
    icon: "credit_card",
    meter: 84,
  },
  {
    id: 3,
    title: "KOL Operations Management System",
    description:
      "Internal operations platform spanning KOL management, task workflows, finance, analytics, and content — driving operational digital transformation and standardizing execution.",
    label: "Influence Engine",
    number: "03",
    metricLabel: "Outcome",
    metricValue: "Ops",
    metricSuffix: "Transformation",
    hoverTags: ["#KOL", "#OPS", "#WORKFLOWS"],
    tone: "high",
    icon: "monitoring",
    meter: 78,
  },
  {
    id: 4,
    title: "CPU Online Education System",
    description:
      "Online education platform across Admin, Web, and H5 clients — owned full-cycle delivery from requirements to launch and iteration.",
    label: "EdTech",
    number: "04",
    metricLabel: "Sales",
    metricValue: "¥250K",
    metricSuffix: "in 2 Weeks",
    hoverTags: ["#EDTECH", "#LAUNCH", "#DELIVERY"],
    tone: "base",
    icon: "school",
    meter: 92,
  },
  {
    id: 5,
    title: "Baolian Jewelry Distribution Platform",
    description:
      "Jewelry distribution + new retail e-commerce platform spanning multi-client experiences and operations, built around a unique distribution model.",
    label: "Luxury E-Commerce",
    number: "05",
    metricLabel: "Key Result",
    metricValue: "Patented",
    metricSuffix: "Model",
    hoverTags: ["#E-COMMERCE", "#DISTRIBUTION", "#PATENTED"],
    tone: "low",
    icon: "diamond",
    meter: 68,
  },
  {
    id: 6,
    title: "HK Auction / UnionPay / Medical Insurance Platforms",
    description:
      "Cross-border platforms spanning international auctions, coupon redemption, and medical insurance distribution — delivered end-to-end product workflows for Hong Kong users and partners.",
    label: "Digital Marketplace",
    number: "06",
    metricLabel: "Auctions",
    metricValue: "Multiple",
    metricSuffix: "Successful Runs",
    hoverTags: ["#CROSS-BORDER", "#PAYMENTS", "#HONG-KONG"],
    tone: "lowest",
    icon: "gavel",
    meter: 88,
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
      const cards = gsap.utils.toArray<HTMLElement>(".project-showcase-card");
      gsap.set(cards, { opacity: 0, y: 18, filter: "blur(10px)" });

      // Batch entrance for consistent rhythm and fewer triggers.
      ScrollTrigger.batch(cards, {
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

  const renderMetricValue = (project: Project) => {
    const parts = [project.metricValue, project.metricSuffix].filter(Boolean).join(" ");
    return parts || "—";
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

          <div className="projects-showcase-grid" role="list">
            {projects.map((project) => (
              <article
                key={project.id}
                className="project-showcase-card"
                data-tone={project.tone}
                onMouseMove={onTileMouseMove}
                onMouseLeave={onTileMouseLeave}
                role="listitem"
              >
                <header className="project-showcase-top">
                  <div className="project-showcase-eyebrow font-label">
                    {(project.label || "Independent").toUpperCase()}
                  </div>
                  <div className="project-showcase-icon" aria-hidden="true">
                    <span className="material-symbols-outlined">{project.icon}</span>
                  </div>
                </header>

                <div className="project-showcase-body">
                  <h3 className="project-showcase-title font-headline">{project.title}</h3>
                  <p className="project-showcase-desc font-body">{project.description}</p>
                </div>

                <footer className="project-showcase-footer" aria-label="Project metric">
                  <div className="project-showcase-metric">
                    <div className="project-showcase-metric-label font-label">
                      {(project.metricLabel || "Impact").toUpperCase()}
                    </div>
                    <div className="project-showcase-metric-value font-headline">
                      {renderMetricValue(project)}
                    </div>
                  </div>
                  <div className="project-showcase-meter" aria-hidden="true">
                    <span
                      className="project-showcase-meter-fill"
                      style={{ width: `${Math.max(0, Math.min(100, project.meter ?? 72))}%` }}
                    />
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </main>
      </Container>
    </section>
  );
}

export default ProjectsSection;
