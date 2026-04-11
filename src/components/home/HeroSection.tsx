import { useRef, useState } from "react";

import Crosshair from "../../bits/Crosshair";
import Header from "../header";
import { siteMeta } from "../../data/site";

function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  return (
    <section className="hero-section" id="hero" ref={sectionRef}>
      <Header />
      <Crosshair color="#FFB2BE" containerRef={sectionRef} />

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
