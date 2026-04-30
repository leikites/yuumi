import { useEffect, useRef, useState } from "react";

import Container from "../common/Container";
import "../../styles/about.css";

const progressLabels = ["Intro", "Journey", "Strengths", "Skills", "Education", "Beyond"];

const introText =
  "AI-native Product Manager with 5+ years of experience across ride-hailing platforms, SaaS billing systems, new retail e-commerce, and cross-border businesses. Strong at turning ambiguous problems into clear PRDs, prototypes, and shippable iterations — powered by AI workflows (Claude, ChatGPT, Cursor, v0) and custom MCP Servers.";

const journeyItems = [
  {
    year: "2019",
    label: "TECHNICAL GENESIS",
    description:
      "Leveraged a Computer Science background to bridge technical constraints and product vision. Focused on establishing rigorous analytical frameworks for scalable digital solutions.",
  },
  {
    year: "2021",
    label: "PROCESS ARCHITECT",
    description:
      "Transitioned from features to integrated SaaS ecosystems. Focused on defining complex business logic and multi-role interaction models to optimize operational efficiency.",
  },
  {
    year: "2023",
    label: "STRATEGIC DELIVERY",
    description:
      "Led cross-functional teams from research to deployment. Established execution discipline and risk management to ensure high-impact commercial delivery.",
  },
  {
    year: "2025",
    label: "SYSTEMIC SCALABILITY",
    description:
      "Leading cloud-native infrastructures and multi-tenant frameworks from 0 to 1. Specializing in high-concurrency logic and automated billing engines.",
  },
];

const strengths = [
  {
    icon: "strategy",
    title: "Strategic Thinking",
    description:
      "Aligning technical roadmaps with long-term business objectives and market positioning.",
    span: 2,
    tone: "base",
  },
  {
    icon: "schema",
    title: "System Architecture",
    description:
      "Defining scalable multi-tenant frameworks and complex backend logic for global SaaS.",
    span: 1,
    tone: "high",
  },
  {
    icon: "terminal",
    title: "Technical Depth",
    description:
      "CS-backed understanding of system constraints, API integration, and cloud deployment.",
    span: 1,
    tone: "high",
  },
  {
    icon: "dynamic_form",
    title: "Agile Leadership",
    description:
      "Orchestrating cross-functional teams to deliver mission-critical iterations with 90%+ on-time rates.",
    span: 2,
    tone: "base",
  },
  {
    icon: "bar_chart",
    title: "Data-Driven",
    description:
      "Decisions backed by rigorous metric analysis, conversion tracking, and performance auditing.",
    span: 1,
    tone: "base",
  },
  {
    icon: "trending_up",
    title: "Growth Mindset",
    description:
      "Continuous evolution of craft, mastering emerging tech to solve complex industrial challenges.",
    span: 2,
    tone: "high",
  },
];

type SkillMetricItem = {
  name: string;
  width: string;
};

type SkillMetricCard = {
  kind: "metric";
  key: string;
  title: string;
  icon: string;
  tone: "wide" | "tall" | "base" | "accent";
  items: SkillMetricItem[];
};

type SkillLanguageCard = {
  kind: "language";
  key: string;
  title: string;
  icon: string;
  tone: "wide" | "tall" | "base" | "accent";
  languages: Array<{ name: string; level: string }>;
};

type SkillCard = SkillMetricCard | SkillLanguageCard;

const skillCards: SkillCard[] = [
  {
    kind: "metric",
    key: "product",
    title: "PRODUCT & DESIGN STRATEGY",
    icon: "hub",
    tone: "wide",
    items: [
      { name: "Requirement Analysis", width: "95%" },
      { name: "Product Roadmap", width: "92%" },
      { name: "PRD Writing", width: "95%" },
      { name: "Prototyping", width: "92%" },
    ],
  },
  {
    kind: "metric",
    key: "ai",
    title: "AI WORKFLOW",
    icon: "smart_toy",
    tone: "tall",
    items: [
      { name: "Prompt Engineering", width: "92%" },
      { name: "AI Agent Workflows", width: "92%" },
      { name: "MCP Server Development", width: "86%" },
    ],
  },
  {
    kind: "metric",
    key: "tech",
    title: "TECHNICAL STACK",
    icon: "terminal",
    tone: "base",
    items: [
      { name: "Swagger / API Docs", width: "88%" },
      { name: "JavaScript", width: "78%" },
      { name: "Python", width: "75%" },
    ],
  },
  {
    kind: "metric",
    key: "collab",
    title: "COLLABORATION",
    icon: "groups",
    tone: "base",
    items: [
      { name: "Agile / Scrum", width: "90%" },
      { name: "Stakeholder Mgmt", width: "86%" },
      { name: "Git / Version Control", width: "94%" },
    ],
  },
  {
    kind: "language",
    key: "lang",
    title: "LANGUAGES",
    icon: "language",
    tone: "accent",
    languages: [
      { name: "Cantonese", level: "Native" },
      { name: "Mandarin", level: "Advanced" },
      { name: "English", level: "Fluent" },
    ],
  },
];

const beyondTiles = [
  {
    title: "Photography",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnCGlrTuGe6C-4aN0-ud9RzTr7xYg0QEvodJgxyyvtSH_HgZBqcMjogVIQjB2IgFXNC-N3D_rmX2gKcdm99YYwmJAJwvUeUBYzvyeYmKv1_Iklw2-oD1l0P70aZ2Cod5ZbHWm4kXX2SMAmJby1THP82odDa5GENXxfD6jAYp8CjTxQY2xfmK2rpKAnl2RVbibDv-Ns92xPIijoeynHPYaiqD4Dx6QfAKHwP4oEaYE-KOkm3qCjDgsFf_5CuPfFpOuImSR_NAPOUX4",
    alt: "professional cinematic black and white close-up of a vintage film camera lens with sharp focus and dark background",
  },
  {
    title: "Travel",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMFVv5j8UGDnOZmYYlxQ2bUdD-6OLN_vhyLAjMEDdHlkIYR1uaEdDjIjOM4y6hZVWvcUCYhvz50i8i_6PMsxYpPukic1amS0q8rzsffh8ov-xSb3MNKu6F01_yT-RKd8-2GNmYbmxgnGUlETg8qidT0hxorwAx_Uv2QtOCxJGcFJNXd5560jp4h0m1AKrOmG3WsEhb8WkJU0Xr8e1mobrUVDQOXjpiv1T3MACGEErq5fMUqeFQ21PESoAXpnRQP5_1rnwP1E8Jtv4",
    alt: "minimalist architectural photography of a modern concrete building at night with neon signs reflection",
  },
  {
    title: "Gaming",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA0ak6WgtJsmLvMCEOUsC0hz7EUDlSA5ZEhYF3MFoZq1B36LBMiGG-4Lab5vLpgBwkCWYhZTi0XgtqClM1KG0_63aOATZUWhBiNJtiIn2IOwrenmAkakLbJ4wLYzgzrvmIq36c6R7VaWGJ6_eXEgAtnAkRqrOfKWFo8ithAWsBjedny07zah6oBEkNg-ye_csQ6qdshFbvSqrfN75dqcUjWk2D-dszBpNzWqEB_bDrwP3HWaqaKNnKuaJq32bsiapCBQNJKJWdnQHw",
    alt: "abstract view of a futuristic mechanical keyboard with vibrant pink and purple rgb lighting in a dark room",
  },
  {
    title: "Coffee",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-rqm1sx35yCHGDajp3HE1iVAteQKMdD0_pvbNf_u093fkI_4A8JY9OzRGhFNTZVOD-nqZjhlgZspmt2JcK0S6t5PXSAzJ29Jvy1EEjgry5CSAK3H1hShL5Yd7LlvgLfENc6eb_Vr3d7smx_ChLkFLRfqsfHH7cHqvkoUtH66OCT4mkLssGeLH_QceVaPuy0iaXrpqMs5LEZHe5QBNVMl2DuwLqyVxsvniFHfmS2gulAHFX1UM9yfHo5R4Jt9Xfo9ThgFDWhf94EU",
    alt: "top view of specialized coffee pour over setup with dark roasted beans on a black slate surface",
  },
];

const educationItems = [
  {
    degree: "B.SC. IN COMPUTER SCIENCE",
    school: "Western University (UWO) · Ontario, Canada",
    description: "Sep 2014 — May 2019",
    gpa: "87/100",
  },
  // {
  //   degree: "B.S. COMPUTER SCIENCE",
  //   school: "Stanford University",
  //   description: "Minor in Cognitive Science. Focus on HCI and algorithmic efficiency.",
  // },
];

const coreCoursework = ["C", "Java", "MATLAB", "C++", "Computer Architecture", "Computer Networks"];

const academicFocus =
  "Computer science foundation for API-first collaboration, analytical problem solving, and fast product delivery.";

const honorsHighlight = {
  title: "President, UWO Mandarin Debate Society",
  timeline: "2017.09 - 2018.09",
  bullets: [
    "Led the team to achieve Runner-up in the Eastern Canada Debate Competition.",
    "Organized high-frequency training sessions and inter-university exhibitions.",
    "Multiple-time representative for UWO in prestigious debate circuits.",
    "Honed critical thinking and public speaking skills for complex stakeholder management.",
  ],
  quote:
    "The debate arena honed the critical thinking and rhetorical precision that now drives my product strategy and architectural decisions.",
};

function AboutSection() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const [currentPanel, setCurrentPanel] = useState(0);
  const [isActiveZone, setIsActiveZone] = useState(false);
  const [suspendTransitions, setSuspendTransitions] = useState(false);
  const totalPanels = progressLabels.length;
  const lastScrollYRef = useRef(0);
  const snapLockRef = useRef(false);
  const snapTimeoutRef = useRef<number | null>(null);
  const snapTargetRef = useRef<number | null>(null);
  const skipSnapUntilRef = useRef(0);
  const isNavigatingRef = useRef(false);
  const navigationIdleTimeoutRef = useRef<number | null>(null);
  const navigationHashRef = useRef<string | null>(null);

  useEffect(() => {
    let ticking = false;
    lastScrollYRef.current = window.scrollY;

    const beginNavigationLock = (hash: string | null) => {
      isNavigatingRef.current = true;
      navigationHashRef.current = hash;
      skipSnapUntilRef.current = Date.now() + 8000;
      setSuspendTransitions(true);

      if (hash === "#about") {
        setCurrentPanel((prev) => (prev === 0 ? prev : 0));
      }
    };

    const scheduleNavigationUnlock = () => {
      if (navigationIdleTimeoutRef.current) {
        window.clearTimeout(navigationIdleTimeoutRef.current);
        navigationIdleTimeoutRef.current = null;
      }

      navigationIdleTimeoutRef.current = window.setTimeout(() => {
        isNavigatingRef.current = false;
        navigationHashRef.current = null;
        navigationIdleTimeoutRef.current = null;
        setSuspendTransitions(false);
        updatePanelBasedOnScroll();
      }, 180);
    };

    const onHashChange = () => {
      if (window.location.hash.startsWith("#")) {
        beginNavigationLock(window.location.hash);
      }
    };

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute("href");
        beginNavigationLock(href);
      }
    };

    const updatePanelBasedOnScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }

      if (isNavigatingRef.current && navigationHashRef.current === "#about") {
        setIsActiveZone(true);
        setCurrentPanel((prev) => (prev === 0 ? prev : 0));
        return;
      }

      // When we snap into About from below, briefly lock to panel 0 and
      // ignore progress-based panel computation.
      if (snapLockRef.current) {
        setCurrentPanel((prev) => (prev === 0 ? prev : 0));
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const wrapperTop = rect.top;
      const wrapperHeight = rect.height;
      const windowHeight = window.innerHeight;

      const isAbove = wrapperTop > 0;
      const isBelow = wrapperTop + wrapperHeight < windowHeight;
      const hasEnteredStickyZone = !isAbove && !isBelow;

      setIsActiveZone(hasEnteredStickyZone);

      if (isAbove) {
        setCurrentPanel(0);
        return;
      }

      if (isBelow) {
        setCurrentPanel(totalPanels - 1);
        return;
      }

      const scrollableHeight = Math.max(wrapperHeight - windowHeight, 1);
      const scrollProgress = Math.max(0, Math.min(1, -wrapperTop / scrollableHeight));
      const panelIndex = Math.min(Math.floor(scrollProgress * totalPanels), totalPanels - 1);

      setCurrentPanel((prev) => (prev === panelIndex ? prev : panelIndex));
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const wrapper = wrapperRef.current;
          const currentScrollY = window.scrollY;
          const isScrollingUp = currentScrollY < lastScrollYRef.current;

          if (isNavigatingRef.current) {
            scheduleNavigationUnlock();
            lastScrollYRef.current = currentScrollY;
            ticking = false;
            return;
          }

          // If we're currently snapping, keep forcing the scroll position to About's top
          // for a short moment to defeat trackpad inertia.
          if (snapLockRef.current && snapTargetRef.current != null) {
            window.scrollTo({ top: snapTargetRef.current, behavior: "auto" });
            setCurrentPanel(0);
            lastScrollYRef.current = snapTargetRef.current;
            ticking = false;
            return;
          }

          const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);
          const fastScrollThreshold = Math.max(90, window.innerHeight * 0.12);

          if (wrapper && scrollDelta > fastScrollThreshold) {
            const rect = wrapper.getBoundingClientRect();
            const wrapperTopAbs = rect.top + window.scrollY;
            const wrapperBottomAbs = wrapperTopAbs + rect.height;

            if (currentScrollY < wrapperTopAbs - window.innerHeight) {
              setIsActiveZone(false);
              setCurrentPanel(0);
            } else if (currentScrollY > wrapperBottomAbs) {
              setIsActiveZone(false);
              setCurrentPanel(totalPanels - 1);
            } else {
              setIsActiveZone(true);
              setCurrentPanel((prev) => {
                const next = isScrollingUp ? 0 : totalPanels - 1;
                return prev === next ? prev : next;
              });
            }

            lastScrollYRef.current = currentScrollY;
            ticking = false;
            return;
          }

          // Entering About from below (Experience -> About):
          // when scrolling up and the previous scrollY was below About's bottom, snap to About top.
          if (wrapper && isScrollingUp && !snapLockRef.current) {
            const rect = wrapper.getBoundingClientRect();
            const wrapperTopAbs = rect.top + window.scrollY;
            const wrapperBottomAbs = wrapperTopAbs + rect.height;
            const prevScrollY = lastScrollYRef.current;

            // Crossing into About's scroll range from below
            const enteredFromBelow =
              prevScrollY > wrapperBottomAbs && currentScrollY <= wrapperBottomAbs;

            if (
              enteredFromBelow &&
              Date.now() >= skipSnapUntilRef.current &&
              !isNavigatingRef.current
            ) {
              snapLockRef.current = true;
              snapTargetRef.current = wrapperTopAbs;
              setCurrentPanel(0);
              window.scrollTo({ top: wrapperTopAbs, behavior: "auto" });
              lastScrollYRef.current = wrapperTopAbs;

              if (snapTimeoutRef.current) {
                window.clearTimeout(snapTimeoutRef.current);
                snapTimeoutRef.current = null;
              }

              // Release quickly; after this, scrolling down progresses panels in order.
              snapTimeoutRef.current = window.setTimeout(() => {
                snapLockRef.current = false;
                snapTargetRef.current = null;
                snapTimeoutRef.current = null;
                updatePanelBasedOnScroll();
              }, 180);

              ticking = false;
              return;
            }
          }

          // Note: we do not unlock early on scroll-down here, because the user's input inertia may
          // momentarily reverse direction; we rely on the short enforcement window instead.

          updatePanelBasedOnScroll();
          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    updatePanelBasedOnScroll();
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (snapTimeoutRef.current) {
        window.clearTimeout(snapTimeoutRef.current);
        snapTimeoutRef.current = null;
      }
      if (navigationIdleTimeoutRef.current) {
        window.clearTimeout(navigationIdleTimeoutRef.current);
        navigationIdleTimeoutRef.current = null;
      }
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [totalPanels]);

  const scrollToPanel = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    setCurrentPanel((prev) => (prev === index ? prev : index));
    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    const wrapperHeight = wrapper.offsetHeight;
    const windowHeight = window.innerHeight;
    const targetScroll = wrapperTop + (index / totalPanels) * (wrapperHeight - windowHeight);

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="about"
      className="about-section-wrapper"
      ref={wrapperRef}
      data-suspend-transitions={suspendTransitions ? "true" : "false"}
      style={{ "--about-panel-count": totalPanels } as React.CSSProperties}
    >
      <div className={`about-progress-indicator${isActiveZone ? " is-visible" : ""}`}>
        {progressLabels.map((label, index) => (
          <button
            className={`progress-dot${currentPanel === index ? " active" : ""}`}
            data-section={index}
            key={label}
            onClick={() => scrollToPanel(index)}
            type="button"
            aria-label={`Go to ${label}`}
          >
            <span className="progress-label">{label}</span>
          </button>
        ))}
      </div>

      <div className="about-sticky-container">
        <Container>
          <div className="about-content-switcher">
            <div className={`about-panel${currentPanel === 0 ? " active" : ""}`} data-panel="0">
              <div className="panel-content">
                <div className="about-hero-display">
                  <div className="about-hero-main">
                    <div className="about-hero-heading">
                      <h2 className="mega-title font-headline">
                        <span>About</span>
                        <span className="title-accent">Me</span>
                      </h2>

                      <blockquote className="about-hero-quote">
                        AI-native product workflows. Results-driven delivery.
                      </blockquote>
                    </div>

                    <div className="intro-text-col">
                      <p className="intro-text intro-text-display">{introText}</p>
                    </div>
                  </div>

                  <div className="about-hero-stats">
                    <div className="stat-box stat-box-vertical">
                      <div className="stat-number stat-number-light">5+</div>
                      <div className="stat-label stat-label-wide">YEARS PRODUCT EXPERIENCE</div>
                    </div>
                    <div className="stat-box stat-box-vertical">
                      <div className="stat-number stat-number-light">600+</div>
                      <div className="stat-label stat-label-wide">VEHICLES PLATFORM SCOPE</div>
                    </div>
                    <div className="stat-box stat-box-vertical">
                      <div className="stat-number stat-number-light">40%</div>
                      <div className="stat-label stat-label-wide">
                        AI WORKFLOWS PRODUCTIVITY LIFT
                      </div>
                    </div>
                    <div className="stat-box stat-box-vertical">
                      <div className="stat-number stat-number-light">1</div>
                      <div className="stat-label stat-label-wide">MONTH SAAS CLOUD MVP</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`about-panel${currentPanel === 1 ? " active" : ""}`} data-panel="1">
              <div className="panel-content py-32 px-8 bg-surface-container-lowest">
                <div className="max-w-7xl mx-auto">
                  <h2 className="font-headline text-5xl font-bold mb-20 tracking-tight">
                    01 Professional Journey
                  </h2>

                  <div className="journey-grid">
                    {journeyItems.map((item) => (
                      <div className="journey-card" key={`${item.year}-${item.label}`}>
                        <span className="journey-year font-headline">{item.year}</span>
                        <h3 className="journey-label font-headline">{item.label}</h3>
                        <p className="journey-desc">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={`about-panel${currentPanel === 2 ? " active" : ""}`} data-panel="2">
              <div className="panel-content py-32 px-8 bg-surface-container-lowest">
                <div className="max-w-7xl mx-auto">
                  <h2 className="font-headline text-5xl font-bold mb-20 tracking-tight">
                    02 What Makes Me Different
                  </h2>

                  <div className="strengths-mosaic">
                    {strengths.map((item) => (
                      <div
                        className={`strength-tile strength-tile-tone-${item.tone}${
                          item.span === 2 ? " strength-tile-span-2" : ""
                        }`}
                        key={item.title}
                      >
                        <span
                          className="material-symbols-outlined strength-tile-icon"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                        <div className="strength-tile-content">
                          <h3 className="strength-tile-title font-headline">{item.title}</h3>
                          <p className="strength-tile-desc">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={`about-panel${currentPanel === 3 ? " active" : ""}`} data-panel="3">
              <div className="panel-content py-32 px-8 bg-surface-container-lowest">
                <div className="max-w-7xl mx-auto skills-panel-shell">
                  <h2 className="font-headline text-5xl font-bold mb-20 tracking-tight">
                    03 Skills &amp; Tools
                  </h2>
                  <div className="skills-grid">
                    {skillCards.map((card) => {
                      if (card.kind === "language") {
                        return (
                          <section
                            className={`skills-card skills-card-tone-${card.tone}`}
                            data-tone={card.tone}
                            data-layout={card.tone}
                            key={card.key}
                          >
                            <header className="skills-card-header">
                              <h3 className="skills-card-title font-headline">{card.title}</h3>
                              <span className="material-symbols-outlined skills-card-icon">
                                {card.icon}
                              </span>
                            </header>
                            <div className="skills-language-list" role="list">
                              {card.languages.map((lang) => (
                                <div
                                  className="skills-language-item"
                                  key={`${card.key}-${lang.name}`}
                                  role="listitem"
                                >
                                  <div className="skills-language-name font-headline">
                                    {lang.name}
                                  </div>
                                  <div className="skills-language-level font-label">
                                    {lang.level}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>
                        );
                      }

                      const isWide = card.tone === "wide";

                      return (
                        <section
                          className={`skills-card skills-card-tone-${card.tone}`}
                          data-tone={card.tone}
                          data-layout={card.tone}
                          key={card.key}
                        >
                          <header className="skills-card-header">
                            <h3 className="skills-card-title font-headline">{card.title}</h3>
                            <span className="material-symbols-outlined skills-card-icon">
                              {card.icon}
                            </span>
                          </header>
                          <div className={`skills-metric-grid${isWide ? " is-two-col" : ""}`}>
                            {card.items.map((item) => (
                              <div className="skills-metric" key={`${card.key}-${item.name}`}>
                                <div className="skills-metric-row">
                                  <span className="skills-metric-name font-label">{item.name}</span>
                                  <span className="skills-metric-value font-label">
                                    {item.width}
                                  </span>
                                </div>
                                <div className="skills-meter" aria-hidden="true">
                                  <div
                                    className="skills-meter-fill"
                                    style={{ width: item.width }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className={`about-panel${currentPanel === 4 ? " active" : ""}`} data-panel="4">
              <div className="panel-content py-32 px-8 bg-surface-container-lowest">
                <div className="max-w-7xl mx-auto">
                  <h2 className="font-headline text-5xl font-bold mb-20 tracking-tight">
                    04 Education &amp; Honors
                  </h2>

                  <div className="education-honors-layout">
                    <div className="edu-left">
                      <div className="edu-list">
                        {educationItems.map((item, index) => (
                          <div key={index} className="edu-item">
                            <h3 className="edu-degree font-headline">{item.degree}</h3>
                            <div className="edu-school font-headline">{item.school}</div>
                            <p className="edu-desc">{item.description}</p>
                            {item.gpa && (
                              <div className="edu-gpa-block">
                                <span className="edu-gpa-label font-label">GPA METRIC:</span>
                                <span className="edu-gpa-value font-headline">{item.gpa}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="edu-extras">
                        <div className="edu-coursework">
                          <div className="edu-extras-title font-headline">CORE COURSEWORK</div>
                          <ul className="edu-coursework-list">
                            {coreCoursework.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="edu-focus">
                          <div className="edu-extras-title font-headline">ACADEMIC FOCUS</div>
                          <p className="edu-focus-quote">“{academicFocus}”</p>
                        </div>
                      </div>
                    </div>

                    <div className="honors-right">
                      <div className="honors-highlight">
                        <h3 className="honors-highlight-title font-headline">
                          {honorsHighlight.title}
                        </h3>
                        <div className="honors-highlight-timeline font-headline">
                          {honorsHighlight.timeline}
                        </div>
                        <ul className="honors-highlight-list">
                          {honorsHighlight.bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <div className="honors-highlight-quote">
                          <p className="honors-highlight-quote-text font-headline">
                            “{honorsHighlight.quote}”
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`about-panel${currentPanel === 5 ? " active" : ""}`} data-panel="5">
              <div className="panel-content py-32 px-8 bg-surface-container-lowest">
                <div className="max-w-7xl mx-auto">
                  <h2 className="font-headline text-5xl font-bold mb-20 tracking-tight">
                    05 Beyond Work
                  </h2>

                  <div className="beyond-grid" role="list">
                    {beyondTiles.map((tile) => (
                      <div className="beyond-tile" key={tile.title} role="listitem">
                        <img alt={tile.alt} className="beyond-image" src={tile.imageSrc} />
                        <div className="beyond-caption">
                          <span className="beyond-title font-headline">{tile.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* 页码装饰 */}
        <div className="about-number-wrapper">
          <span className="about-number">02</span>
          <div className="about-number-line"></div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
