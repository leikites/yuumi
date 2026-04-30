import { useEffect, useRef } from "react";

import Container from "../common/Container";
import "../../styles/experience.css";

const heroCopy = {
  subtitle:
    "Shipping ride-hailing, SaaS billing, and cross-border products with AI-powered workflows and measurable results.",
};

const tagFadeClassByNode: Record<string, string> = {
  "01": "tag-fade-1",
  "02": "tag-fade-1",
  "03": "tag-fade-075",
  "04": "tag-fade-06",
  "05": "tag-fade-05",
  "06": "tag-fade-04",
};

const timelineItems = [
  {
    node: "01",
    companyNumber: "01//",
    companyName: "GOGOX (HKEX: 2246)",
    companyType: "RIDE-HAILING / FLEET",
    dateRange: "Jan 2026 — Present · Hong Kong",
    jobTitle: "PRODUCT MANAGER",
    achievements: [
      {
        title: "AMIGO TAXI · 3-APP ECOSYSTEM",
        description:
          "Own product planning and iteration across Client App, Driver App, and Admin Panel for Amigo Taxi — one of five Hong Kong Government-licensed fleets, operated by CMG Fleet (a GOGOX × City Motors JV) with 600+ vehicles including 400 EVs.",
      },
      {
        title: "COMPETITIVE STRATEGY",
        description:
          "Benchmarked HKTaxi, Uber HK, and Sing Kwan Taxi to define a differentiated rider and driver experience; designed Admin Panel for driver onboarding, fleet management, real-time order monitoring, and analytics.",
      },
      {
        title: "AI AGENT WORKFLOWS · +40%",
        description:
          "Standardized daily product work with Claude, Cursor, and custom MCP tools for competitive analysis, PRD drafting, and data processing — boosting team productivity by ~40%.",
      },
    ],
  },
  {
    node: "02",
    companyNumber: "02//",
    companyName: "DAOQI TECHNOLOGY",
    companyType: "SAAS / BILLING",
    dateRange: "Mar 2025 — Jan 2026 · Guangzhou",
    jobTitle: "PRODUCT MANAGER",
    achievements: [
      {
        title: "UNIBEE BILLING · OPEN SOURCE",
        description:
          "Led iteration for UniBee Billing System (AGPLv3) — positioned as an open-source alternative to Recurly, Chargebee, and Paddle. Improved system response speed by 20% and strengthened core subscription billing and payment integrations.",
      },
      {
        title: "CLOUD MVP IN 1 MONTH",
        description:
          "Architected UniBee Cloud Version from 0 to 1 with multi-tenant isolation and AWS / Alibaba Cloud deployment, shipping MVP within 1 month.",
      },
      {
        title: "COMMERCIAL IMPACT",
        description:
          "Drove 15% pricing page conversion uplift and delivered 100% on-time releases for critical milestones with a cross-functional team of 5.",
      },
    ],
  },
  {
    node: "03",
    companyNumber: "03//",
    companyName: "FEIMEI NETWORK",
    companyType: "E-COMMERCE / OPERATIONS",
    dateRange: "Sep 2024 — Mar 2025 · Guangzhou",
    jobTitle: "PRODUCT MANAGER",
    achievements: [
      {
        title: "3 INTERNAL SYSTEMS · OWNED",
        description:
          "Owned end-to-end iteration for KOL Operations, Ad Placement, and Logistics systems — covering KOL management, task workflows, finance, analytics, and content modules.",
      },
      {
        title: "BUSINESS-PRODUCT TRANSLATION",
        description:
          "Partnered with business stakeholders to diagnose pain points and translate them into shippable product specs, prototypes, and UI iterations.",
      },
      {
        title: "DELIVERY & FEEDBACK LOOPS",
        description:
          "Drove digital transformation of company operations through disciplined release cycles, risk management, and post-launch feedback loops.",
      },
    ],
  },
  {
    node: "04",
    companyNumber: "04//",
    companyName: "SIPINYOU EDUCATION",
    companyType: "EDTECH / PLATFORM",
    dateRange: "Aug 2023 — Sep 2024 · Guangzhou",
    jobTitle: "PRODUCT MANAGER & DEPT. HEAD",
    achievements: [
      {
        title: "CPU PLATFORM LAUNCH",
        description:
          "Led end-to-end delivery across Admin / Web / H5 clients for the CPU online education platform — generating ¥250K in course sales within 2 weeks of launch.",
      },
      {
        title: "FULL-CYCLE OWNERSHIP",
        description:
          "Owned market research, competitive analysis, prototyping, UI iteration, project management, and stakeholder training as PM and department head.",
      },
      {
        title: "CROSS-TEAM ORCHESTRATION",
        description:
          "Navigated ambiguous requirements and resource constraints through cross-team coordination; ran internal testing cycles to ensure pre-launch stability.",
      },
    ],
  },
  {
    node: "05",
    companyNumber: "05//",
    companyName: "PENGJU INFORMATION",
    companyType: "NEW RETAIL / CROSS-BORDER",
    dateRange: "May 2021 — Jul 2023 · Guangzhou",
    jobTitle: "PRODUCT MANAGER",
    achievements: [
      {
        title: "BAOLIAN · PATENTED 0-TO-1",
        description:
          "Delivered 0-to-1 jewelry distribution + new retail e-commerce platform spanning C-end (App / Mini Program / H5), B-end supplier and store portals — business model granted a patent.",
      },
      {
        title: "HK PRODUCTS · MULTI-CLIENT",
        description:
          "Shipped Hong Kong products including auction system (live streaming + custom bid-step rules), UnionPay HK pop-up zone (× 7-Eleven, FamilyMart, K11), and medical insurance distribution platform.",
      },
      {
        title: "MICROSERVICE ARCHITECTURE",
        description:
          "Partnered with engineering to design a microservice middle-platform structure enabling modular development and rapid iteration across business lines.",
      },
    ],
  },
  {
    node: "06",
    companyNumber: "06//",
    companyName: "EARLY CAREER",
    companyType: "UI/UX DESIGN",
    dateRange: "Oct 2019 — Apr 2021 · Guangzhou / Chengdu",
    jobTitle: "UI/UX DESIGNER & PRODUCT ASSISTANT",
    achievements: [
      {
        title: "UI/UX FOUNDATION",
        description:
          "Owned end-to-end UI/UX for web products and supported product planning with prototypes and requirement docs.",
      },
      {
        title: "BILINGUAL COLLABORATION",
        description:
          "Liaised directly with North American clients in fluent English — laying the foundation for cross-border product work today.",
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
  const focusLerpRef = useRef<number[]>([]);
  const progressLerpRef = useRef(0);

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

      let targetProgressHeight = 0;
      if (scrollTop > timelineTop) {
        const scrolledInTimeline = scrollTop - timelineTop + window.innerHeight / 2;
        targetProgressHeight = Math.min(scrolledInTimeline, timelineHeight);
        targetProgressHeight = Math.max(0, targetProgressHeight);
      }

      // Smooth progress height to reduce micro jitter.
      progressLerpRef.current =
        progressLerpRef.current + (targetProgressHeight - progressLerpRef.current) * 0.18;
      const progressHeight = progressLerpRef.current;
      progressEl.style.height = `${progressHeight.toFixed(2)}px`;

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
        const targetFocus = 1 - Math.min(1, Math.abs(delta) / Math.max(range, 1));

        const prevFocus = focusLerpRef.current[index] ?? 0;
        const focus = prevFocus + (targetFocus - prevFocus) * 0.22;
        focusLerpRef.current[index] = focus;

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
                  <p
                    className={`company-type font-label ${tagFadeClassByNode[item.node] ?? "tag-fade-1"}`}
                  >
                    {item.companyType}
                  </p>
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
