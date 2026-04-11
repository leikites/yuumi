import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../common/Container";
import "../../styles/about.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  { number: "5+", label: "Years Experience" },
  { number: "10+", label: "Projects Delivered" },
  { number: "3+", label: "Teams Led" },
];

function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      timeline.from(".avatar-wrapper", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      timeline.from(
        ".about-content .section-title",
        {
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      );

      timeline.from(
        ".about-text",
        {
          x: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.4",
      );

      timeline.from(
        ".stat-card",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.4",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section id="about" ref={sectionRef}>
      <Container>
        <div className="about-container">
          <div className="about-avatar">
            <div className="avatar-wrapper">
              <img
                src="https://via.placeholder.com/300/667eea/ffffff?text=Avatar"
                alt="Yuumi Avatar"
              />
            </div>
          </div>

          <div className="about-content">
            <h2 className="section-title">About Me</h2>
            <p className="about-text">
              I&apos;m a Product Manager with 5+ years of experience building user-centric
              products that solve real problems. I thrive at the intersection of business,
              design, and technology.
            </p>
            <p className="about-text">
              I specialize in taking products from 0 to 1, leading cross-functional teams,
              and using data-driven insights to drive product strategy and growth.
            </p>

            <div className="stats-grid">
              {stats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
