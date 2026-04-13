import { useEffect, useRef } from "react";

import Container from "../common/Container";
import "../../styles/experience.css";

const heroCopy = {
  subtitle:
    "Architecting scalable logic and engineering high-impact delivery for global infrastructures.",
};

const timelineItems = [
  {
    node: "01",
    companyNumber: "01//",
    companyName: "GUANGZHOU DAOQI TECHNOLOGY",
    companyType: "SAAS / BILLING SYSTEMS",
    dateRange: "2025.03 — PRESENT",
    jobTitle: "SENIOR PRODUCT MANAGER",
    achievements: [
      {
        title: "SAAS INFRASTRUCTURE",
        description:
          "Directed the 0-to-1 development of Unibee Billing Cloud, implementing robust multi-tenant isolation protocols and scalable subscription architecture for enterprise-level deployment.",
      },
      {
        title: "SYSTEM OPTIMIZATION",
        description:
          "Led performance testing and optimization initiatives, achieving 20% improvement in system response time through targeted refactoring of core billing modules.",
      },
      {
        title: "STRATEGIC DELIVERY",
        description:
          "Engineered a 30% reduction in delivery cycles through implementation of agile architectural reviews and optimized cross-functional communication protocols.",
      },
    ],
  },
  {
    node: "02",
    companyNumber: "02//",
    companyName: "GUANGZHOU FEIMEI NETWORK",
    companyType: "E-COMMERCE / OPERATIONS",
    dateRange: "2024.09 — 2025.03",
    jobTitle: "PRODUCT MANAGER",
    achievements: [
      {
        title: "SYSTEM INTEGRATION",
        description:
          "Led complete iteration and optimization of KOL Operations, Advertising, and Logistics systems, significantly improving functionality and user experience.",
      },
      {
        title: "PROCESS OPTIMIZATION",
        description:
          "Streamlined business workflows through systematic process analysis, implementing data-driven solutions that enhanced operational efficiency.",
      },
    ],
  },
  {
    node: "03",
    companyNumber: "03//",
    companyName: "GUANGZHOU SIPIN EDUCATION",
    companyType: "EDTECH / PLATFORM",
    dateRange: "2023.08 — 2024.09",
    jobTitle: "PRODUCT MANAGER & DEPT. LEAD",
    achievements: [
      {
        title: "REVENUE GENERATION",
        description:
          "Launched CPU EdTech Platform, driving 250k CNY in revenue within 14 days by optimizing conversion funnels and streamlining digital asset distribution workflows.",
      },
      {
        title: "TEAM LEADERSHIP",
        description:
          "Independently completed product planning from scratch, market research, and competitive analysis while coordinating cross-functional teams for successful delivery.",
      },
    ],
  },
  {
    node: "04",
    companyNumber: "04//",
    companyName: "GUANGZHOU PENGJU INFORMATION",
    companyType: "FINTECH / RETAIL",
    dateRange: "2021.05 — 2023.07",
    jobTitle: "PRODUCT MANAGER",
    achievements: [
      {
        title: "INTELLECTUAL PROPERTY",
        description:
          "Pioneered the BaoLian jewelry distribution platform. Authored and successfully filed a National Patent for innovative B2B2C supply chain traceability algorithms.",
      },
      {
        title: "CROSS-BORDER SOLUTIONS",
        description:
          "Orchestrated Hong Kong Kuangshi Auction and UnionPay systems, integrating complex payment protocols while maintaining high-level security compliance for cross-border transactions.",
      },
    ],
  },
  {
    node: "05",
    companyNumber: "05//",
    companyName: "EARLY CAREER",
    companyType: "UI/UX DESIGN",
    dateRange: "2019.10 — 2021.04",
    jobTitle: "UI/UX DESIGNER & PRODUCT ASSISTANT",
    achievements: [
      {
        title: "DESIGN FOUNDATION",
        description:
          "Built technical expertise in UI/UX design and product planning, establishing the foundation for transition into product management role.",
      },
      {
        title: "CROSS-FUNCTIONAL COLLABORATION",
        description:
          "Collaborated with engineering teams on SaaS retail systems, gaining comprehensive understanding of full product development lifecycle.",
      },
    ],
  },
];

function WorkExperienceSection() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLElement[]>([]);
  const nodesRef = useRef<Array<HTMLElement | null>>([]);
  const activeIndexRef = useRef<number>(-1);
  const lastScrollYRef = useRef(0);
  const isScrollingDownRef = useRef(true);
  const glowTimeoutRef = useRef<number | null>(null);
  const lastGlowHeightRef = useRef(0);
  const activationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const timelineEl = timelineRef.current;
    const progressEl = progressRef.current;
    const hintEl = hintRef.current;
    const particlesEl = particlesRef.current;
    if (!timelineEl || !progressEl) {
      return;
    }

    let rafId = 0;

    const hintTextEl = hintEl?.querySelector<HTMLElement>(".hint-text") ?? null;
    const hintArrowEl = hintEl?.querySelector<SVGElement>("svg") ?? null;

    if (particlesEl && !particlesEl.childElementCount) {
      for (let i = 0; i < 5; i += 1) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.animationDelay = `${i * 0.4}s`;
        particlesEl.appendChild(particle);
      }
    }

    itemsRef.current = Array.from(timelineEl.querySelectorAll<HTMLElement>(".timeline-item"));
    nodesRef.current = itemsRef.current.map((item) =>
      item.querySelector<HTMLElement>(".timeline-node"),
    );

    const updateScrollHint = () => {
      if (!hintEl) {
        return;
      }

      if (!hintTextEl || !hintArrowEl) {
        return;
      }

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight <= 0 ? 0 : scrollTop / docHeight;

      if (scrollPercent > 0.9) {
        hintTextEl.textContent = "Scroll up to revisit";
        hintArrowEl.classList.remove("arrow-down");
        hintArrowEl.classList.add("arrow-up");
      } else if (scrollPercent < 0.1) {
        hintTextEl.textContent = "Scroll to explore my journey";
        hintArrowEl.classList.remove("arrow-up");
        hintArrowEl.classList.add("arrow-down");
      }

      hintEl.classList.toggle("hidden", scrollPercent > 0.15 && scrollPercent < 0.85);
    };

    const applyActiveIndex = (nextIndex: number) => {
      if (activeIndexRef.current === nextIndex) {
        return;
      }

      activeIndexRef.current = nextIndex;

      const items = itemsRef.current;
      items.forEach((item, index) => {
        item.classList.toggle("active", index === nextIndex);
        item.classList.toggle("completed", nextIndex >= 0 && index < nextIndex);
        item.classList.remove("activating");
      });

      if (activationTimeoutRef.current) {
        window.clearTimeout(activationTimeoutRef.current);
        activationTimeoutRef.current = null;
      }

      if (nextIndex >= 0) {
        const activeItem = items[nextIndex];
        activeItem.classList.add("activating");
        activationTimeoutRef.current = window.setTimeout(() => {
          activeItem.classList.remove("activating");
          activationTimeoutRef.current = null;
        }, 800);
      }
    };

    const updateProgress = () => {
      rafId = 0;

      const scrollTop = window.scrollY;
      const timelineTop = timelineEl.offsetTop;
      const timelineHeight = timelineEl.offsetHeight;

      let progressHeight = 0;
      if (scrollTop > timelineTop) {
        const scrolledInTimeline = scrollTop - timelineTop + window.innerHeight / 2;
        progressHeight = Math.min(scrolledInTimeline, timelineHeight);
        progressHeight = Math.max(0, progressHeight);
      }

      progressEl.style.height = `${progressHeight}px`;

      const items = itemsRef.current;
      const nodes = nodesRef.current;
      const viewportH = window.innerHeight;
      const centerY = viewportH / 2;
      const range = viewportH * 0.35;

      let nextActiveIndex = -1;
      let maxFocus = 0;

      items.forEach((item, index) => {
        const node = nodes[index] ?? item;
        const rect = node.getBoundingClientRect();
        const nodeCenter = rect.top + rect.height / 2;
        const delta = nodeCenter - centerY;
        const focus = 1 - Math.min(1, Math.abs(delta) / Math.max(range, 1));

        item.style.setProperty("--focus", focus.toFixed(3));

        if (focus >= maxFocus) {
          maxFocus = focus;
          nextActiveIndex = index;
        }
      });

      applyActiveIndex(maxFocus >= 0.12 ? nextActiveIndex : -1);

      const shouldGlow =
        isScrollingDownRef.current && progressHeight - lastGlowHeightRef.current >= 24;

      if (shouldGlow) {
        lastGlowHeightRef.current = progressHeight;
        progressEl.classList.add("glow");
        if (glowTimeoutRef.current) {
          window.clearTimeout(glowTimeoutRef.current);
        }
        glowTimeoutRef.current = window.setTimeout(() => {
          progressEl.classList.remove("glow");
          glowTimeoutRef.current = null;
        }, 600);
      }

      updateScrollHint();
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      isScrollingDownRef.current = currentScrollY > lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;
      if (rafId) {
        return;
      }
      rafId = window.requestAnimationFrame(updateProgress);
    };

    lastScrollYRef.current = window.scrollY;
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      if (activationTimeoutRef.current) {
        window.clearTimeout(activationTimeoutRef.current);
        activationTimeoutRef.current = null;
      }
      if (glowTimeoutRef.current) {
        window.clearTimeout(glowTimeoutRef.current);
        glowTimeoutRef.current = null;
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="experience" className="experience-section">
      <Container>
        <div className="section-header">
          <h2 className="mega-title font-headline">
            <span>Work</span>
            <span className="title-accent">Experience</span>
          </h2>
          <p className="intro-text intro-text-display">{heroCopy.subtitle}</p>
        </div>

        <div className="scroll-hint" id="scrollHint" ref={hintRef} aria-hidden="true">
          <svg className="arrow-down" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M12 4L12 20M12 20L6 14M12 20L18 14"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <span className="hint-text font-label">Scroll to explore my journey</span>
        </div>

        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-track" />
          <div className="timeline-progress" id="timelineProgress" ref={progressRef}>
            <div className="particles-container" id="particlesContainer" ref={particlesRef} />
          </div>

          <div className="timeline-content">
            {timelineItems.map((item, index) => (
              <div className="timeline-item" data-index={index} key={item.node}>
                <div className="timeline-node" data-node={item.node}>
                  <div className="node-dot" />
                  <div className="node-ripple" />
                </div>

                <div className="company-info">
                  <div className="company-number font-headline">{item.companyNumber}</div>
                  <h3 className="company-name font-headline">{item.companyName}</h3>
                  <p className="company-type font-label">{item.companyType}</p>
                  <div className="date-range font-headline">{item.dateRange}</div>
                  <div className="job-title font-label">{item.jobTitle}</div>
                </div>

                <div className="achievements-list">
                  {item.achievements.map((achievement) => (
                    <div className="achievement-item" key={`${item.node}-${achievement.title}`}>
                      <div className="achievement-marker" aria-hidden="true">
                        ●
                      </div>
                      <div className="achievement-content">
                        <h4 className="font-headline">{achievement.title}</h4>
                        <p className="font-body">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WorkExperienceSection;
