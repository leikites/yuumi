import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { RefObject } from "react";

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

const getMousePos = (event: MouseEvent, container?: HTMLElement | null) => {
  if (container) {
    const bounds = container.getBoundingClientRect();
    return {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
  }

  return { x: event.clientX, y: event.clientY };
};

type CrosshairProps = {
  color?: string;
  containerRef?: RefObject<HTMLElement | null>;
};

function Crosshair({ color = "white", containerRef }: CrosshairProps) {
  const lineHorizontalRef = useRef<HTMLDivElement>(null);
  const lineVerticalRef = useRef<HTMLDivElement>(null);
  const filterXRef = useRef<SVGFETurbulenceElement>(null);
  const filterYRef = useRef<SVGFETurbulenceElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const renderStartedRef = useRef(false);

  useEffect(() => {
    const target = containerRef?.current ?? window;
    const container = containerRef?.current ?? null;
    const horizontal = lineHorizontalRef.current;
    const vertical = lineVerticalRef.current;
    const filterX = filterXRef.current;
    const filterY = filterYRef.current;

    if (!horizontal || !vertical) {
      return;
    }

    const rendered = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 },
    };

    gsap.set([horizontal, vertical], { opacity: 0 });

    const render = () => {
      rendered.tx.current = mouseRef.current.x;
      rendered.ty.current = mouseRef.current.y;
      rendered.tx.previous = lerp(rendered.tx.previous, rendered.tx.current, rendered.tx.amt);
      rendered.ty.previous = lerp(rendered.ty.previous, rendered.ty.current, rendered.ty.amt);

      gsap.set(vertical, { x: rendered.tx.previous });
      gsap.set(horizontal, { y: rendered.ty.previous });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    const startRenderLoop = () => {
      if (renderStartedRef.current) {
        return;
      }

      rendered.tx.previous = rendered.tx.current = mouseRef.current.x;
      rendered.ty.previous = rendered.ty.current = mouseRef.current.y;

      gsap.to([horizontal, vertical], {
        duration: 0.9,
        ease: "power3.out",
        opacity: 1,
      });

      renderStartedRef.current = true;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = getMousePos(event, container);

      if (container) {
        const bounds = container.getBoundingClientRect();
        const isInside =
          event.clientX >= bounds.left &&
          event.clientX <= bounds.right &&
          event.clientY >= bounds.top &&
          event.clientY <= bounds.bottom;

        gsap.to([horizontal, vertical], { opacity: isInside ? 1 : 0, duration: 0.2 });
      }

      startRenderLoop();
    };

    const primitiveValues = { turbulence: 0 };

    const timeline = gsap.timeline({
      paused: true,
      onStart: () => {
        horizontal.style.filter = "url(#filter-noise-x)";
        vertical.style.filter = "url(#filter-noise-y)";
      },
      onUpdate: () => {
        if (filterX && filterY) {
          filterX.setAttribute("baseFrequency", String(primitiveValues.turbulence));
          filterY.setAttribute("baseFrequency", String(primitiveValues.turbulence));
        }
      },
      onComplete: () => {
        horizontal.style.filter = "none";
        vertical.style.filter = "none";
      },
    });

    timeline.to(primitiveValues, {
      duration: 0.5,
      ease: "power1.out",
      startAt: { turbulence: 1 },
      turbulence: 0,
    });

    const enter = () => timeline.restart();
    const leave = () => {
      timeline.progress(1).pause();
      horizontal.style.filter = "none";
      vertical.style.filter = "none";
    };

    const interactiveElements = container
      ? container.querySelectorAll("a, button")
      : document.querySelectorAll("a, button");

    if (target instanceof Window) {
      target.addEventListener("mousemove", handleMouseMove);
    } else {
      target.addEventListener("mousemove", handleMouseMove);
    }

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
      element.addEventListener("focus", enter);
      element.addEventListener("blur", leave);
    });

    return () => {
      if (target instanceof Window) {
        target.removeEventListener("mousemove", handleMouseMove);
      } else {
        target.removeEventListener("mousemove", handleMouseMove);
      }
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
        element.removeEventListener("focus", enter);
        element.removeEventListener("blur", leave);
      });

      timeline.kill();

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      renderStartedRef.current = false;
    };
  }, [containerRef]);

  return (
    <div
      style={{
        position: containerRef ? "absolute" : "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 3,
      }}
    >
      <svg style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence
              ref={filterXRef}
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence
              ref={filterYRef}
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
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
          pointerEvents: "none",
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
          pointerEvents: "none",
          transform: "translateX(50%)",
          opacity: 0,
        }}
      />
    </div>
  );
}

export default Crosshair;
