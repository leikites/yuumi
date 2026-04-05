import { useEffect, useRef, useState } from "react";

import { aboutPage } from "../../data/about";
import type { AboutStageMeta } from "./aboutStage";

const STEP_TRANSITION_MS = 500;

export const aboutMethodStage: AboutStageMeta = {
  id: "02",
  title: "How I Work",
  footerTitle: "Working Method",
};

function AboutMethodSection() {
  const phases = aboutPage.method.phases;
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const clearPreviousTimeoutRef = useRef<number | null>(null);
  const activePhase = phases[activeIndex];

  const activateStep = (index: number) => {
    if (index === activeIndex) {
      return;
    }

    setPreviousIndex(activeIndex);
    setActiveIndex(index);

    if (clearPreviousTimeoutRef.current !== null) {
      window.clearTimeout(clearPreviousTimeoutRef.current);
    }

    clearPreviousTimeoutRef.current = window.setTimeout(() => {
      setPreviousIndex(null);
      clearPreviousTimeoutRef.current = null;
    }, STEP_TRANSITION_MS);
  };

  useEffect(() => {
    return () => {
      if (clearPreviousTimeoutRef.current !== null) {
        window.clearTimeout(clearPreviousTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="about-screen about-screen-method">
      <div className="about-screen-column about-screen-column-primary about-method-column">
        <p className="about-label anim-el anim-delay-1">{aboutPage.method.eyebrow}</p>
        <h3 id="about-method-title" className="about-method-headline anim-el anim-delay-2">
          A product rhythm built on
          <br />
          clarity, structure, and momentum.
        </h3>

        <ol className="about-method-list anim-el anim-delay-3" aria-label="How I work steps">
          {phases.map((phase, index) => (
            <li
              className={`about-method-list-item${index === activeIndex ? " is-active" : ""}`}
              key={phase.id}
            >
              <button
                type="button"
                className="about-method-list-button"
                onMouseEnter={() => activateStep(index)}
                onFocus={() => activateStep(index)}
                onClick={() => activateStep(index)}
                aria-current={index === activeIndex ? "step" : undefined}
              >
                <span className="about-method-list-index">{phase.id}</span>
                <span className="about-method-list-copy">
                  <span className="about-method-list-title">{phase.title}</span>
                  <span className="about-method-list-description">{phase.summary}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="about-screen-column about-screen-column-secondary about-method-stage anim-el anim-delay-4">
        {phases.map((phase, index) => {
          const isActive = index === activeIndex;
          const isExiting = index === previousIndex;

          return (
            <div
              className={`about-method-stage-layer${isActive ? " is-active" : ""}${isExiting ? " is-exiting" : ""}`}
              key={phase.id}
              aria-hidden={!isActive}
            >
              <p className="about-method-watermark" aria-hidden="true">
                {phase.id}
              </p>

              <div className="about-method-stage-copy about-gradient-panel about-method-detail-panel">
                <p className="about-method-card-index">{phase.id}</p>
                <h4>{phase.title}</h4>

                <div className="about-method-stage-block">
                  <p className="about-detail-label">What</p>
                  <p className="about-method-stage-body">{phase.what}</p>
                </div>

                <div className="about-method-stage-block">
                  <p className="about-detail-label">Goal</p>
                  <p className="about-method-stage-body">{phase.goal}</p>
                </div>
              </div>
            </div>
          );
        })}

        <div className="about-method-stage-sizer" aria-hidden="true">
          <p className="about-method-watermark">{activePhase.id}</p>
          <div className="about-method-stage-copy about-gradient-panel about-method-detail-panel">
            <p className="about-method-card-index">{activePhase.id}</p>
            <h4>{activePhase.title}</h4>
            <div className="about-method-stage-block">
              <p className="about-detail-label">What</p>
              <p className="about-method-stage-body">{activePhase.what}</p>
            </div>
            <div className="about-method-stage-block">
              <p className="about-detail-label">Goal</p>
              <p className="about-method-stage-body">{activePhase.goal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMethodSection;
