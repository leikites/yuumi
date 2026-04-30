import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../common/Container";
import "../../styles/contact.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ContactSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const triggerEl = sectionRef.current?.querySelector("#contact") ?? sectionRef.current;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top 60%",
        },
      });

      timeline.from(".contact-kicker", {
        y: 14,
        opacity: 0,
        duration: 0.55,
        ease: "power3.out",
      });

      timeline.from(
        ".contact-title",
        {
          y: 18,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.35",
      );

      timeline.from(
        ".contact-desc",
        {
          y: 16,
          opacity: 0,
          duration: 0.55,
          ease: "power3.out",
        },
        "-=0.35",
      );

      timeline.from(
        ".contact-actions > *",
        {
          y: 14,
          opacity: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.25",
      );

      timeline.from(
        ".contact-visual-card",
        {
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.35",
      );

      timeline.from(
        ".contact-metric",
        {
          y: 14,
          opacity: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.25",
      );
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef}>
      <section id="contact">
        <Container>
          <div className="contact-shell">
            <div className="contact-main">
              <div className="contact-copy">
                <h2 className="contact-title font-headline">
                  <span className="contact-kicker">Ready to build?</span>
                  <span className="contact-title-line">Let&apos;s Work Together</span>
                </h2>

                <p className="contact-desc font-body">
                  I&apos;m currently available for freelance projects and full-time collaborations.
                  If you have an idea that needs a digital edge, let&apos;s connect.
                </p>

                <div className="contact-actions">
                  <a
                    href="mailto:hello@yuumi.design"
                    className="contact-cta contact-cta-primary font-label"
                  >
                    <span>Email Me</span>
                    <span className="material-symbols-outlined contact-cta-icon" aria-hidden="true">
                      send
                    </span>
                  </a>
                  <a href="#projects" className="contact-cta contact-cta-secondary">
                    <span className="contact-cta-secondary-label font-label">View Services</span>
                    <span className="material-symbols-outlined contact-cta-icon" aria-hidden="true">
                      east
                    </span>
                  </a>
                </div>
              </div>

              <div className="contact-visual" aria-hidden="true">
                <div className="contact-visual-frame">
                  <div className="contact-visual-grid" />

                  <div className="contact-visual-card contact-visual-card-top">
                    <span
                      className="material-symbols-outlined contact-visual-icon"
                      aria-hidden="true"
                    >
                      bolt
                    </span>
                    <div className="contact-visual-eyebrow font-label">Global Operations</div>
                    <div className="contact-visual-value font-body">
                      GMT +8 (Hong Kong &amp; Guangzhou)
                    </div>
                  </div>

                  <div className="contact-visual-card contact-visual-card-bottom">
                    <span
                      className="material-symbols-outlined contact-visual-icon"
                      aria-hidden="true"
                    >
                      public
                    </span>
                    <div className="contact-visual-eyebrow font-label">Available For</div>
                    <div className="contact-visual-value font-body">Remote Projects</div>
                  </div>

                  <div className="contact-visual-bg" aria-hidden="true">
                    <img
                      alt="abstract digital network"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS5aLIOVJ7SuhX5HJYItuTfFjhG8ZoZpy68iA1fSvEL0aBo-hRRGNhEXRjt0yRi2ScRz-bCz_4HgGn3NUDQABnyAxaGGFNbnoxCiQynvk-SjRRVZSq6Z5idLPomgj9cMfhrz7Y8QBymtyOoJbnwN4a1RXsdGMrslKVdfic7joUslZYOHt855llHzVWIisvDx9rufVYBOtEFyLICzp9YtsW8g6nQgDMESJJKnk3j27dvap7K9fMM1gBkRNqmQcm-AfUb41s221i1Wa9"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="contact-stats-section" aria-label="Contact metrics">
        <Container>
          <div className="contact-stats" role="list" aria-label="Contact metrics">
            <div className="contact-metric" role="listitem">
              <div className="contact-metric-label font-label">Availability</div>
              <div className="contact-metric-bar" aria-hidden="true">
                <span className="contact-metric-bar-fill" style={{ width: "85%" }} />
              </div>
              <div className="contact-metric-value font-body">85% Booked</div>
            </div>

            <div className="contact-metric" role="listitem">
              <div className="contact-metric-label font-label">Experience</div>
              <div className="contact-metric-bar" aria-hidden="true">
                <span className="contact-metric-bar-fill" style={{ width: "100%" }} />
              </div>
              <div className="contact-metric-value font-body">8+ Years Prof.</div>
            </div>

            <div className="contact-metric" role="listitem">
              <div className="contact-metric-label font-label">Success Rate</div>
              <div className="contact-metric-bar" aria-hidden="true">
                <span className="contact-metric-bar-fill" style={{ width: "98%" }} />
              </div>
              <div className="contact-metric-value font-body">98% Satisfaction</div>
            </div>

            <div className="contact-metric" role="listitem">
              <div className="contact-metric-label font-label">Response Time</div>
              <div className="contact-metric-bar" aria-hidden="true">
                <span className="contact-metric-bar-fill" style={{ width: "40%" }} />
              </div>
              <div className="contact-metric-value font-body">&lt; 24 Hours</div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default ContactSection;
