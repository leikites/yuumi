import { useEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";

type RevealSectionProps = PropsWithChildren<{
  className?: string;
  id?: string;
}>;

function RevealSection({ children, className = "", id }: RevealSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={["content-section", "reveal-section", isVisible ? "is-visible" : "", className]
        .filter(Boolean)
        .join(" ")}
      id={id}
    >
      {children}
    </section>
  );
}

export default RevealSection;
