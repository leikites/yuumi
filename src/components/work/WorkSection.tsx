import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../common/Container";
import "../../styles/work.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Project = {
  ratio: "portrait" | "landscape" | "square";
  title: string;
  desc: string;
  speed: number;
};

const projects: Project[] = [
  { ratio: "portrait", title: "Mobile Banking App", desc: "iOS & Android Design", speed: 0.62 },
  { ratio: "landscape", title: "Analytics Dashboard", desc: "SaaS Product", speed: 1.08 },
  { ratio: "square", title: "E-commerce Platform", desc: "Web Application", speed: 0.78 },
  { ratio: "portrait", title: "Health Tracking", desc: "Mobile App", speed: 1.24 },
  { ratio: "landscape", title: "Project Management", desc: "Dashboard UI", speed: 0.88 },
  { ratio: "square", title: "Social Network", desc: "Mobile & Web", speed: 1.32 },
  { ratio: "landscape", title: "CRM System", desc: "Enterprise Software", speed: 0.7 },
  { ratio: "portrait", title: "Fitness App", desc: "iOS Design", speed: 1.18 },
  { ratio: "square", title: "Food Delivery", desc: "Mobile App", speed: 0.94 },
  { ratio: "portrait", title: "Travel Booking", desc: "App Design", speed: 1.28 },
  { ratio: "landscape", title: "Admin Panel", desc: "Web Dashboard", speed: 0.74 },
  { ratio: "square", title: "Music Player", desc: "UI/UX Design", speed: 1.06 },
  { ratio: "portrait", title: "Dating App", desc: "Mobile Design", speed: 0.84 },
  { ratio: "landscape", title: "Video Platform", desc: "Streaming Service", speed: 1.14 },
  { ratio: "square", title: "Chat Application", desc: "Real-time Messaging", speed: 0.9 },
];

const placeholders = {
  portrait: "https://via.placeholder.com/300x600/667eea/ffffff?text=",
  landscape: "https://via.placeholder.com/450x300/764ba2/ffffff?text=",
  square: "https://via.placeholder.com/350x350/f093fb/ffffff?text=",
};

function WorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".work-item");

      items.forEach((item) => {
        const speed = Number(item.dataset.speed ?? "1");

        gsap.to(item, {
          y: () => -100 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      items.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          delay: (index % 3) * 0.15,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="work" ref={sectionRef}>
      <Container>
        <h2 className="section-title work-title">Selected Work</h2>

        <div className="work-grid" id="workGrid">
          {projects.map((project) => (
            <article
              className="work-item"
              data-ratio={project.ratio}
              data-speed={project.speed.toFixed(2)}
              key={project.title}
            >
              <img
                src={`${placeholders[project.ratio]}${encodeURIComponent(project.title)}`}
                alt={project.title}
                loading="lazy"
              />

              <div className="work-overlay">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WorkSection;
