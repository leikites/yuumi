import { useEffect, useRef, useState } from "react";

import Container from "../common/Container";
import "../../styles/about.css";

const progressLabels = ["Intro", "Journey", "Strengths", "Skills", "Beyond"];

const journeyItems = [
  {
    year: "2019",
    title: "UI/UX Designer",
    description:
      "Graduated from UWO. Began career designing interfaces for international clients.",
    tags: ["UI/UX", "Design"],
  },
  {
    year: "2021",
    title: "Product Manager",
    description: "Evolved from design to product strategy, leading e-commerce platforms.",
    tags: ["Product", "Strategy"],
  },
  {
    year: "2023",
    title: "Team Leadership",
    description: "Led team, built CPU EdTech generating 500K+ RMB revenue.",
    tags: ["0-1", "Leadership"],
  },
  {
    year: "2025",
    title: "B2B SaaS Lead",
    description: "Leading UniBee Billing System with international teams.",
    tags: ["B2B SaaS", "Cloud"],
    active: true,
  },
];

const strengths = [
  {
    icon: "💡",
    title: "0-1 Product Builder",
    description: "From CPU EdTech to UniBee Cloud, I turn product ideas into shipped systems.",
  },
  {
    icon: "🌏",
    title: "International Leader",
    description: "Fluent English and cross-cultural team experience keep collaboration clear.",
  },
  {
    icon: "🔧",
    title: "Tech-Savvy PM",
    description: "Computer Science background plus UI/UX practice helps me align engineering and design.",
  },
  {
    icon: "📊",
    title: "Data-Driven",
    description: "20% performance improvement through analytics, testing, and optimization thinking.",
  },
  {
    icon: "⚡",
    title: "Agile Practitioner",
    description: "90%+ on-time delivery through strong Scrum rhythm and planning discipline.",
  },
  {
    icon: "🎯",
    title: "Domain Versatility",
    description: "SaaS, EdTech, e-commerce, healthcare, and auction products all shaped my range.",
  },
];

const skillCategories = [
  {
    title: "Product Management",
    items: [
      { name: "Product Strategy", width: "95%" },
      { name: "User Research", width: "90%" },
      { name: "Agile/Scrum", width: "92%" },
    ],
  },
  {
    title: "Design Tools",
    items: [
      { name: "Figma", width: "95%" },
      { name: "Axure", width: "90%" },
      { name: "Sketch", width: "85%" },
    ],
  },
  {
    title: "Project Management",
    items: [
      { name: "Jira", width: "92%" },
      { name: "Confluence", width: "88%" },
    ],
  },
  {
    title: "Languages",
    items: [
      { name: "English (Fluent)", width: "95%" },
      { name: "Mandarin (Native)", width: "100%" },
    ],
  },
];

const interests = [
  {
    icon: "🎭",
    title: "Debate Champion",
    description: "Led UWO Chinese Debate Club to 2nd place at Eastern Canada Championships",
  },
  {
    icon: "✈️",
    title: "Travel Enthusiast",
    description: "Exploring cultures to broaden perspectives",
  },
  {
    icon: "🎨",
    title: "Creative Outlets",
    description: "Drawing, singing, immersive theater",
  },
  {
    icon: "💪",
    title: "Fitness & Balance",
    description: "Maintaining focus through exercise",
  },
];

function AboutSection() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const [currentPanel, setCurrentPanel] = useState(0);
  const [isActiveZone, setIsActiveZone] = useState(false);
  const totalPanels = progressLabels.length;

  useEffect(() => {
    let ticking = false;

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
          updatePanelBasedOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    updatePanelBasedOnScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
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
                  <div className="about-hero-heading">
                    <h2 className="mega-title">
                      <span>About</span>
                      <span className="title-accent">Me</span>
                    </h2>

                    <blockquote className="about-hero-quote">
                      Architecting the Intuitive. Defining the Experience.
                    </blockquote>
                  </div>

                  <div className="about-hero-body">
                    <div className="intro-text-col">
                      <p className="intro-text intro-text-display">
                        {/* Bridging complex system architectures, business strategy, and UI/UX
                        design to scale multi-tenant SaaS and platform products from 0 to 1. */}
                        An experience-first Product Manager specializing in SaaS. I blend design 
                        thinking with my robust Computer Science foundation to architect products 
                        that solve real problems. Specializing in scaling multi-tenant platforms 
                        from 0 to 1, I drive business growth by transforming complex functional 
                        requirements into delightful, data-informed user experiences.
                      </p>
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
                        <div className="stat-number stat-number-light">0 to 1</div>
                        <div className="stat-label stat-label-wide">PRODUCT EXPERT</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`about-panel${currentPanel === 1 ? " active" : ""}`} data-panel="1">
              <div className="panel-content">
                <h3 className="panel-title">
                  <span className="title-number">01</span>
                  Professional Journey
                </h3>

                <div className="journey-grid">
                  {journeyItems.map((item) => (
                    <div
                      className={`journey-card${item.active ? " active" : ""}`}
                      key={`${item.year}-${item.title}`}
                    >
                      <div className="journey-year">{item.year}</div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <div className="journey-tags">
                        {item.tags.map((tag) => (
                          <span className="tag-pill" key={`${item.year}-${tag}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`about-panel${currentPanel === 2 ? " active" : ""}`} data-panel="2">
              <div className="panel-content">
                <h3 className="panel-title">
                  <span className="title-number">02</span>
                  What Makes Me Different
                </h3>

                <div className="strengths-grid">
                  {strengths.map((item) => (
                    <div className="strength-card" key={item.title}>
                      <div className="strength-icon">{item.icon}</div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`about-panel${currentPanel === 3 ? " active" : ""}`} data-panel="3">
              <div className="panel-content">
                <h3 className="panel-title">
                  <span className="title-number">03</span>
                  Skills &amp; Tools
                </h3>

                <div className="skills-grid">
                  {skillCategories.map((category) => (
                    <div className="skill-category" key={category.title}>
                      <h4>{category.title}</h4>
                      <div className="skill-list">
                        {category.items.map((item) => (
                          <div className="skill-item" key={`${category.title}-${item.name}`}>
                            <span>{item.name}</span>
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

            <div className={`about-panel${currentPanel === 4 ? " active" : ""}`} data-panel="4">
              <div className="panel-content">
                <h3 className="panel-title">
                  <span className="title-number">04</span>
                  Beyond Work
                </h3>

                <p className="beyond-intro">
                  Outside of product management, I&apos;m driven by curiosity and creative
                  expression.
                </p>

                <div className="interests-grid">
                  {interests.map((interest) => (
                    <div className="interest-card" key={interest.title}>
                      <div className="interest-icon">{interest.icon}</div>
                      <h5>{interest.title}</h5>
                      <p>{interest.description}</p>
                    </div>
                  ))}
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
