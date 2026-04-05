import { useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

import ShapeGrid from "../../bits/ShapeGrid/ShapeGrid";
import { siteMeta } from "../../data/site";
import useSectionProgress from "../../hooks/useSectionProgress";
import Container from "../common/Container";

function HeroSection() {
  const stageRef = useRef<HTMLElement | null>(null);
  const progress = useSectionProgress(stageRef, { startOffset: 0.98, endOffset: 0.16 });
  const [isWordmarkHovered, setIsWordmarkHovered] = useState(false);

  const stageStyle = useMemo(
    () =>
      ({
        "--hero-stage-opacity": String(1 - progress * 0.14),
        "--hero-stage-translate-y": `${progress * -28}px`,
        "--hero-stage-scale": String(1 - progress * 0.025),
        "--hero-stage-mask-stop": `${100 - progress * 18}%`,
        "--hero-bottom-fade-opacity": String(Math.min(progress * 1.35, 1)),
        "--hero-stage-overlay-opacity": String(Math.min(progress * 0.9, 1)),
        "--hero-background-scale": String(1 + progress * 0.035),
        "--hero-background-blur": `${progress * 2.2}px`,
        "--hero-grid-light-opacity": String(Math.min(progress * 1.4, 1)),
        "--hero-grid-soften-opacity": String(Math.min(progress * 1.1, 1)),
        "--hero-grid-layer-opacity": String(1 - progress * 0.08),
        "--hero-grid-layer-blur": `${progress * 0.8}px`,
        "--hero-grid-dissolve-opacity": String(Math.min(progress * 1.15, 1)),
        "--hero-grid-dissolve-start": `${58 - progress * 8}%`,
        "--hero-grid-dissolve-mid": `${72 - progress * 6}%`,
        "--hero-grid-dissolve-end": `${94 - progress * 8}%`,
        "--hero-title-translate-y": `${progress * -16}px`,
        "--hero-title-opacity": String(1 - progress * 0.08),
        "--hero-scroll-translate-y": `${progress * 18}px`,
        "--hero-scroll-opacity": String(1 - progress * 0.92),
      }) as CSSProperties,
    [progress],
  );

  const scrollToAbout = () => {
    const about = document.getElementById("about");
    if (!about) {
      return;
    }

    about.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero-stage" id="home" ref={stageRef}>
      <div className="hero-stage-sticky">
        <div className="hero-stage-frame" style={stageStyle}>
          <section className="hero-section" aria-label="Hero">
            <div className="hero-background" aria-hidden="true">
              <ShapeGrid
                mode="reveal"
                squareSize={48}
                speed={0.22}
                direction="diagonal"
                shape="square"
                borderColor="rgba(255, 20, 180, 0.12)"
                hoverFillColor="rgba(255, 20, 180, 0.16)"
                hoverColor="rgba(255, 93, 205, 0.56)"
                text="YUUMI"
                textColor="rgba(255, 255, 255, 0.18)"
                textReveal
                textRevealActive
                textRevealStepMs={22}
              />
            </div>

            <Container>
              <div className="hero-wordmark">
                <div className="hero-wordmark-stack">
                  <span className="hero-dot-accent" aria-hidden="true" />

                  <h1 className="hero-wordmark-heading">
                    <button
                      type="button"
                      className="hero-wordmark-button"
                      onClick={scrollToAbout}
                      onMouseEnter={() => setIsWordmarkHovered(true)}
                      onMouseLeave={() => setIsWordmarkHovered(false)}
                      onFocus={() => setIsWordmarkHovered(true)}
                      onBlur={() => setIsWordmarkHovered(false)}
                      aria-label="Scroll to About section"
                    >
                      <span
                        className={`hero-wordmark-text hero-wordmark-primary${
                          isWordmarkHovered ? " is-hidden" : ""
                        }`}
                      >
                        {siteMeta.name.toUpperCase()}.
                      </span>
                      <span
                        className={`hero-wordmark-text hero-wordmark-secondary${
                          isWordmarkHovered ? " is-hidden" : ""
                        }`}
                      >
                        PRODUCT MANAGER
                      </span>
                      <span
                        className={`hero-wordmark-text hero-wordmark-alt${
                          isWordmarkHovered ? " is-visible" : ""
                        }`}
                      >
                        BUILD NEXT
                      </span>
                    </button>
                  </h1>

                  <p className="hero-subtitle">
                    0 to 1 product building through clarity, structure, and momentum
                    <span className="hero-subtitle-cursor" aria-hidden="true">
                      _
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  className="hero-scroll-indicator"
                  onClick={scrollToAbout}
                  aria-label="Scroll to About section"
                >
                  <span className="hero-scroll-label">Build Next</span>
                  <span className="hero-scroll-track" aria-hidden="true">
                    <span className="hero-scroll-dot" />
                  </span>
                </button>
              </div>
            </Container>
          </section>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
