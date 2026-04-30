import { useRef } from "react";

import Header from "../header";
import Aurora from "../layout/Aurora";
import { siteMeta } from "../../data/site";

function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section className="hero-section" id="hero" ref={sectionRef}>
      <Aurora
        colorStops={["#be7ead", "#851787", "#562097"]}
        blend={0.72}
        amplitude={1.0}
        speed={0.9}
      />
      <Header />

      <div className="hero-title-zone">
        <div className="hero-content">
          <div className="hero-label">XIAOLEI HE</div>

          <h1 className="hero-title-primary">
            {siteMeta.name.toUpperCase()}
            <span className="hero-title-dot">.</span>
          </h1>

          <div className="hero-subtitle">
            <span className="hero-subtitle-accent">|</span>
            AI-NATIVE PRODUCT MANAGER
          </div>

          <p className="hero-quote">
            Building ride-hailing, SaaS billing, and cross-border platforms with{" "}
            <span className="hero-quote-highlight">AI-powered</span> product workflows. Clear PRDs,
            fast iteration, measurable outcomes.
          </p>
        </div>

        {/* 页码装饰 */}
        <div className="hero-number-wrapper">
          <span className="hero-number">01</span>
          <div className="hero-number-line"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
