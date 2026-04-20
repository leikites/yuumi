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
          <div className="hero-label">IDENTITY CORE</div>

          <h1 className="hero-title-primary">
            {siteMeta.name.toUpperCase()}
            <span className="hero-title-dot">.</span>
          </h1>

          <div className="hero-subtitle">
            <span className="hero-subtitle-accent">|</span>
            SYSTEM ARCHITECT & PRODUCT STRATEGIST
          </div>

          {/* 带着色单词的引言 */}
          <p className="hero-quote">
            "Though this system be madness, yet there is{" "}
            <span className="hero-quote-highlight">method</span> in my craft."
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
