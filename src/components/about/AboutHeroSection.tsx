import { aboutPage } from "../../data/about";
import type { AboutStageMeta } from "./aboutStage";

export const aboutHeroStage: AboutStageMeta = {
  id: "01",
  title: "About",
  footerTitle: "Product Narrative",
};

function AboutHeroSection() {
  const { hero } = aboutPage;

  return (
    <div className="about-screen about-screen-hero">
      <div className="about-screen-column about-screen-column-primary about-hero-copy">
        <p className="about-label anim-el anim-delay-1">
          {hero.eyebrow} &mdash; {hero.name}
        </p>

        <div className="about-hero-copy-frame">
          <div className="about-hero-copy-main anim-el anim-delay-2">
            <h2 className="about-hero-slogan">
              Bridging theGap Between Complex Code
              <br />
              and Business Value.
            </h2>
          </div>

          <div className="about-hero-copy-meta anim-el anim-delay-3">
            <p className="about-hero-meta-label">Focus</p>
            <p className="about-hero-bio">{hero.intro}</p>
          </div>
        </div>
      </div>

      <aside
        className="about-screen-column about-screen-column-secondary about-mark-panel"
        aria-label={hero.markLabel}
      >
        <div className="about-mark-stack about-gradient-panel about-brand-card anim-el anim-delay-4">
          <div className="about-mark-header">
            <p className="about-mark-label">Brand Mark</p>
            <p className="about-mark-kicker">Visual Identifier</p>
          </div>

          <div className="about-mark-body">
            <div className="about-mark-stage">
              <div className="about-mark-glow" aria-hidden="true" />
              <div className="about-mark-shell" aria-hidden="true">
                <div className="about-mark-ring about-mark-ring-one" />
                <div className="about-mark-ring about-mark-ring-two" />
                <div className="about-mark-axis about-mark-axis-vertical" />
                <div className="about-mark-axis about-mark-axis-horizontal" />
                <div className="about-mark-core">
                  <span>YH</span>
                </div>
                <span className="about-mark-node about-mark-node-one" />
                <span className="about-mark-node about-mark-node-two" />
                <span className="about-mark-node about-mark-node-three" />
              </div>
            </div>

            <dl className="about-mark-meta">
              <div>
                <dt>Role</dt>
                <dd>{hero.role}</dd>
              </div>

              <div>
                <dt>Focus</dt>
                <dd>0 &rarr; 1 Product Building</dd>
              </div>

              <div>
                <dt>Method</dt>
                <dd>Clarity, Structure, Momentum</dd>
              </div>
            </dl>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default AboutHeroSection;
