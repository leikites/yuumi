import { useRef, useState } from "react";

import Crosshair from "../../bits/Crosshair";
import ShapeGrid from "../../bits/ShapeGrid/ShapeGrid";
import { siteMeta } from "../../data/site";

function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  return (
    <section className="hero-section" id="hero" ref={sectionRef}>
      <div
        className={`hero-background hero-background-flow${isLocked ? " is-hidden" : ""}`}
        aria-hidden="true"
      >
        <ShapeGrid
          hostRef={sectionRef}
          speed={0.34}
          squareSize={40}
          direction="diagonal"
          borderColor="#47063b"
          hoverFillColor="#222"
          hoverColor="#ae197f"
          size={87}
          shape="square"
          hoverTrailAmount={3}
        />
      </div>

      <div
        className={`hero-background hero-background-reveal${isLocked ? " is-visible" : ""}`}
        aria-hidden="true"
      >
        <ShapeGrid
          key={isLocked ? "reveal-on" : "reveal-off"}
          mode="reveal"
          hostRef={sectionRef}
          squareSize={40}
          size={87}
          direction="diagonal"
          borderColor="#47063b"
          hoverFillColor="#222"
          hoverColor="#ae197f"
          shape="square"
          hoverTrailAmount={0}
          text="YUUMI"
          textColor="#ffffff"
          textReveal
          textRevealActive={isLocked}
          textRevealStepMs={34}
        />
      </div>

      <Crosshair color="#ae197f" containerRef={sectionRef} />

      <div className={`hero-title-zone${isLocked ? " is-locked" : ""}`}>
        <button
          type="button"
          className={`hero-title-button${isLocked ? " is-locked" : ""}`}
          onMouseEnter={() => setIsLocked(true)}
          onMouseLeave={() => setIsLocked(false)}
          onFocus={() => setIsLocked(true)}
          onBlur={() => setIsLocked(false)}
          aria-label="Yuumi He, Product Manager"
        >
          <span className="hero-title-stack">
            <span className="hero-title hero-title-primary">
              {siteMeta.name.toUpperCase()}
              <span className="hero-title-dot">.</span>
            </span>
            <span className="hero-title hero-title-secondary">PRODUCT MANAGER</span>
          </span>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
