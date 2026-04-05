import { aboutPage } from "../../data/about";
import type { AboutStageMeta } from "./aboutStage";

export const aboutStrengthsStage: AboutStageMeta = {
  id: "03",
  title: "What I Bring",
  footerTitle: "Core Strengths",
};

function AboutStrengthsSection() {
  return (
    <div className="about-screen about-screen-strengths" aria-labelledby="about-strengths-title">
      <div className="about-screen-column about-screen-column-primary about-strengths-copy">
        <p className="about-label anim-el anim-delay-1">{aboutPage.strengths.eyebrow}</p>
        <h3 id="about-strengths-title" className="anim-el anim-delay-2">
          A few things I bring to early-stage product work.
        </h3>
        <p className="about-strengths-subline anim-el anim-delay-3">
          When a product is still taking shape, I contribute through clear thinking, practical
          structure, and steady execution.
        </p>
      </div>

      <div className="about-screen-column about-screen-column-secondary about-strengths-list">
        {aboutPage.strengths.items.map((item, index) => (
          <article
            className={`about-strength-item anim-el anim-delay-${index + 3}`}
            key={item.title}
          >
            <p className="about-strength-item-index">{String(index + 1).padStart(2, "0")}</p>
            <div className="about-strength-item-copy">
              <p className="about-strength-item-title">{item.title}</p>
              <p className="about-strength-item-detail">{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AboutStrengthsSection;
