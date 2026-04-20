import { useEffect, useRef, useState } from "react";

import Container from "../common/Container";
import "../../styles/about.css";

const progressLabels = ["Intro", "Journey", "Strengths", "Skills", "Education", "Beyond"];

const introText =
  "I specialize in requirement analysis, product planning, and cross-functional delivery — connecting business goals, user needs, and technical feasibility to build products that scale.";

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

const skillCategories = [
  {
    title: "PRODUCT",
    items: [
      { name: "Requirement Analysis", width: "95%" },
      { name: "Product Strategy", width: "90%" },
      { name: "Roadmapping", width: "88%" },
    ],
  },
  {
    title: "EXECUTION",
    items: [
      { name: "PRD Writing", width: "98%" },
      { name: "Prototyping", width: "95%" },
      { name: "Iteration Management", width: "85%" },
    ],
  },
  {
    title: "COLLABORATION",
    items: [
      { name: "Agile / Scrum", width: "90%" },
      { name: "Stakeholder Management", width: "92%" },
      { name: "Cross-functional Alignment", width: "93%" },
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
    alt: "minimalist architectural photography of a modern concrete building in Tokyo at night with neon signs reflection",
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
    degree: "B.S. COMPUTER SCIENCE",
    school: "University of Western Ontario（Canada）",
    description:
      "Specialization in Software Engineering, System Architecture, and Algorithm Design.",
    gpa: "3.7/4.0",
  },
  // {
  //   degree: "B.S. COMPUTER SCIENCE",
  //   school: "Stanford University",
  //   description: "Minor in Cognitive Science. Focus on HCI and algorithmic efficiency.",
  // },
];

const coreCoursework = [
  "C / Java / C++ / MATLAB",
  "Systems Architecture",
  "Computer Networks",
  "Software Engineering",
  "Data Structures & Algorithms",
];

const academicFocus = "Synthesizing computer science theory into scalable product architecture.";

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
  const totalPanels = progressLabels.length;
  const lastScrollYRef = useRef(0);
  const snapLockRef = useRef(false);
  const snapTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let ticking = false;
    lastScrollYRef.current = window.scrollY;

    const updatePanelBasedOnScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const wrapperTop = rect.top;
      const wrapperHeight = rect.height;
      const windowHeight = window.innerHeight;
      const hasEnteredStickyZone = wrapperTop <= 0 && wrapperTop + wrapperHeight >= windowHeight;

      setIsActiveZone(hasEnteredStickyZone);

      if (!hasEnteredStickyZone) {
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

          if (wrapper && isScrollingUp && !snapLockRef.current) {
            const wrapperTopAbs = wrapper.offsetTop;
            const wrapperBottomAbs = wrapperTopAbs + wrapper.offsetHeight;
            const wasBelow = lastScrollYRef.current > wrapperBottomAbs;
            const hasEnteredFromBelow =
              currentScrollY <= wrapperBottomAbs && currentScrollY >= wrapperTopAbs;

            if (wasBelow && hasEnteredFromBelow) {
              snapLockRef.current = true;
              window.scrollTo({ top: wrapperTopAbs, behavior: "smooth" });
              setCurrentPanel(0);

              if (snapTimeoutRef.current) {
                window.clearTimeout(snapTimeoutRef.current);
              }
              snapTimeoutRef.current = window.setTimeout(() => {
                snapLockRef.current = false;
                snapTimeoutRef.current = null;
              }, 700);
            }
          }

          updatePanelBasedOnScroll();
          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    updatePanelBasedOnScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (snapTimeoutRef.current) {
        window.clearTimeout(snapTimeoutRef.current);
        snapTimeoutRef.current = null;
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [totalPanels]);

  const scrollToPanel = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

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
                        Turning Complexity into Clear Product Direction.
                      </blockquote>
                    </div>

                    <div className="intro-text-col">
                      <p className="intro-text intro-text-display">{introText}</p>
                    </div>
                  </div>

                  <div className="about-hero-stats">
                    <div className="stat-box stat-box-vertical">
                      <div className="stat-number stat-number-light">5+</div>
                      <div className="stat-label stat-label-wide">YEARS EXPERIENCE</div>
                    </div>
                    <div className="stat-box stat-box-vertical">
                      <div className="stat-number stat-number-light">90%+</div>
                      <div className="stat-label stat-label-wide">ON-TIME DELIVERY</div>
                    </div>
                    <div className="stat-box stat-box-vertical">
                      <div className="stat-number stat-number-light">10+</div>
                      <div className="stat-label stat-label-wide">PRODUCTS DELIVERED</div>
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
                <div className="max-w-7xl mx-auto">
                  <h2 className="font-headline text-5xl font-bold mb-20 tracking-tight">
                    03 Skills &amp; Tools
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                    {skillCategories.map((category) => (
                      <div className="skill-category" key={category.title}>
                        <h4 className="font-headline">{category.title}</h4>
                        <div className="skill-list">
                          {category.items.map((item) => (
                            <div className="skill-item" key={`${category.title}-${item.name}`}>
                              <div className="skill-info">
                                <span className="skill-name font-headline">{item.name}</span>
                                <span className="skill-percentage font-headline">{item.width}</span>
                              </div>
                              <div className="skill-bar">
                                <div className="fill" style={{ width: item.width }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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
