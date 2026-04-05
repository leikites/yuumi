import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import type { FC, RefObject } from "react";

const lerp = (a: number, b: number, amount: number): number => (1 - amount) * a + amount * b;

const getMousePos = (event: Event, container?: HTMLElement | null): { x: number; y: number } => {
  const mouseEvent = event as MouseEvent;

  if (container) {
    const bounds = container.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - bounds.left,
      y: mouseEvent.clientY - bounds.top,
    };
  }

  return { x: mouseEvent.clientX, y: mouseEvent.clientY };
};

interface CrosshairProps {
  color?: string;
  containerRef?: RefObject<HTMLElement | null>;
}

const Crosshair: FC<CrosshairProps> = ({ color = "white", containerRef }) => {
  const lineHorizontalRef = useRef<HTMLDivElement>(null);
  const lineVerticalRef = useRef<HTMLDivElement>(null);
  const filterXRef = useRef<SVGFETurbulenceElement>(null);
  const filterYRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const target: HTMLElement | Window = containerRef?.current ?? window;
    let mouse = { x: 0, y: 0 };
    let animationFrameId = 0;

    const renderedStyles: Record<string, { previous: number; current: number; amt: number }> = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 },
    };

    const lineElements = [lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean);

    const render = () => {
      renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.current = mouse.y;

      for (const key of Object.keys(renderedStyles)) {
        const style = renderedStyles[key];
        style.previous = lerp(style.previous, style.current, style.amt);
      }

      if (lineVerticalRef.current && lineHorizontalRef.current) {
        gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });
        gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      mouse = getMousePos(mouseEvent, containerRef?.current);

      if (containerRef?.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        const outside =
          mouseEvent.clientX < bounds.left ||
          mouseEvent.clientX > bounds.right ||
          mouseEvent.clientY < bounds.top ||
          mouseEvent.clientY > bounds.bottom;

        gsap.to(lineElements, { opacity: outside ? 0 : 1, duration: 0.2, overwrite: true });
      }
    };

    const onFirstMove = () => {
      renderedStyles.tx.previous = renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.previous = renderedStyles.ty.current = mouse.y;

      gsap.to(lineElements, {
        duration: 0.9,
        ease: "power3.out",
        opacity: 1,
      });

      render();
      target.removeEventListener("mousemove", onFirstMove);
    };

    gsap.set(lineElements, { opacity: 0 });
    target.addEventListener("mousemove", handleMouseMove);
    target.addEventListener("mousemove", onFirstMove);

    const primitiveValues = { turbulence: 0 };
    const timeline = gsap
      .timeline({
        paused: true,
        onStart: () => {
          if (lineHorizontalRef.current) {
            lineHorizontalRef.current.style.filter = "url(#filter-noise-x)";
          }

          if (lineVerticalRef.current) {
            lineVerticalRef.current.style.filter = "url(#filter-noise-y)";
          }
        },
        onUpdate: () => {
          if (filterXRef.current && filterYRef.current) {
            filterXRef.current.setAttribute("baseFrequency", primitiveValues.turbulence.toString());
            filterYRef.current.setAttribute("baseFrequency", primitiveValues.turbulence.toString());
          }
        },
        onComplete: () => {
          if (lineHorizontalRef.current) {
            lineHorizontalRef.current.style.filter = "none";
          }

          if (lineVerticalRef.current) {
            lineVerticalRef.current.style.filter = "none";
          }
        },
      })
      .to(primitiveValues, {
        duration: 0.5,
        ease: "power1.out",
        startAt: { turbulence: 1 },
        turbulence: 0,
      });

    const enter = () => timeline.restart();
    const leave = () => {
      timeline.progress(1).pause();
      primitiveValues.turbulence = 0;
    };

    const hoverTargets: NodeListOf<HTMLElement> = containerRef?.current
      ? containerRef.current.querySelectorAll("a, button, [data-crosshair-target='true']")
      : document.querySelectorAll("a, button, [data-crosshair-target='true']");

    hoverTargets.forEach((element) => {
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      target.removeEventListener("mousemove", handleMouseMove);
      target.removeEventListener("mousemove", onFirstMove);
      hoverTargets.forEach((element) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, [containerRef]);

  return (
    <div
      style={{
        position: containerRef ? "absolute" : "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10000,
      }}
    >
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence
              ref={filterXRef}
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves={1}
            />
            <feDisplacementMap in="SourceGraphic" scale={40} />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence
              ref={filterYRef}
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves={1}
            />
            <feDisplacementMap in="SourceGraphic" scale={40} />
          </filter>
        </defs>
      </svg>

      <div
        ref={lineHorizontalRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "1px",
          background: color,
          transform: "translateY(50%)",
          opacity: 0,
        }}
      />

      <div
        ref={lineVerticalRef}
        style={{
          position: "absolute",
          height: "100%",
          width: "1px",
          background: color,
          transform: "translateX(50%)",
          opacity: 0,
        }}
      />
    </div>
  );
};

export default Crosshair;
