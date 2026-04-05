import { useEffect, useRef, useState } from "react";

import AboutHeroSection, { aboutHeroStage } from "../about/AboutHeroSection";
import AboutMethodSection, { aboutMethodStage } from "../about/AboutMethodSection";
import AboutStrengthsSection, { aboutStrengthsStage } from "../about/AboutStrengthsSection";
import type { AboutStageScreen } from "../about/aboutStage";
import Container from "../common/Container";
import "../../styles/about.css";

function AboutPreviewSection() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth >= 768,
  );
  const screens: AboutStageScreen[] = [
    {
      ...aboutHeroStage,
      panel: <AboutHeroSection />,
    },
    {
      ...aboutMethodStage,
      panel: <AboutMethodSection />,
    },
    {
      ...aboutStrengthsStage,
      panel: <AboutStrengthsSection />,
    },
  ];
  const activeScreen = screens[activeIndex];

  useEffect(() => {
    const onResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setActiveIndex(0);
      return;
    }

    const updateActivePanel = () => {
      const spacer = spacerRef.current;
      if (!spacer) {
        return;
      }

      const spacerTop = spacer.getBoundingClientRect().top + window.scrollY;
      const totalScroll = Math.max(spacer.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max((window.scrollY - spacerTop) / totalScroll, 0), 1);
      const nextIndex = Math.min(Math.floor(progress * screens.length), screens.length - 1);

      setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
    };

    const onScroll = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(updateActivePanel);
    };

    updateActivePanel();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop, screens.length]);

  const scrollToIndex = (targetIndex: number) => {
    const spacer = spacerRef.current;
    if (!spacer) {
      return;
    }

    const clampedIndex = Math.min(Math.max(targetIndex, 0), screens.length - 1);
    const spacerTop = spacer.getBoundingClientRect().top + window.scrollY;
    const totalScroll = Math.max(spacer.offsetHeight - window.innerHeight, 0);
    const targetScroll = spacerTop + (clampedIndex / screens.length) * totalScroll;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  if (!isDesktop) {
    return (
      <section className="about-section about-section-mobile" id="about">
        <div className="about-site-grid" aria-hidden="true" />
        <div className="about-geometry-accent" aria-hidden="true" />
        <Container>
          <div className="about-mobile-stack">
            {screens.map((screen) => (
              <section className="about-mobile-sub" key={screen.id} aria-label={screen.title}>
                <div className="about-mobile-sub-inner">{screen.panel}</div>
                <footer className="about-stage-footer about-stage-footer-mobile">
                  <p>
                    {screen.id} / {String(screens.length).padStart(2, "0")}
                  </p>
                  <p>YUUMI HE</p>
                  <p>{screen.footerTitle}</p>
                  <p>&copy; 2026 YUUMI HE</p>
                </footer>
              </section>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="about-section" id="about">
      <div className="about-site-grid" aria-hidden="true" />
      <div className="about-geometry-accent" aria-hidden="true" />
      <div className="about-scroll-spacer" ref={spacerRef}>
        <div className="about-sticky-viewport">
          <Container>
            <div className="about-stage-shell">
              <aside className="about-stage-index" aria-label="About section navigation">
                {screens.map((screen, index) => (
                  <button
                    type="button"
                    className={`page-dot${index === activeIndex ? " active" : ""}`}
                    key={screen.id}
                    onClick={() => scrollToIndex(index)}
                    aria-label={`Go to ${screen.title}`}
                    aria-current={index === activeIndex ? "step" : undefined}
                  >
                    <span className="page-dot-core" aria-hidden="true" />
                    <span className="page-dot-label">{screen.id}</span>
                  </button>
                ))}
              </aside>

              <div className="about-stage-frame">
                <div className="about-inner" aria-live="polite">
                  {screens.map((screen, index) => (
                    <section
                      className={`about-panel${index === activeIndex ? " active" : ""}`}
                      key={screen.id}
                      aria-hidden={index !== activeIndex}
                    >
                      {screen.panel}
                    </section>
                  ))}
                </div>

                <footer className="about-stage-footer" aria-label="About section status">
                  <p>
                    <span className="about-footer-animated" key={`counter-${activeScreen.id}`}>
                      {activeScreen.id} / {String(screens.length).padStart(2, "0")}
                    </span>
                  </p>
                  <p>YUUMI HE</p>
                  <p>
                    <span className="about-footer-animated" key={`section-${activeScreen.id}`}>
                      {activeScreen.footerTitle}
                    </span>
                  </p>
                  <p>&copy; 2026 YUUMI HE</p>
                </footer>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

export default AboutPreviewSection;
