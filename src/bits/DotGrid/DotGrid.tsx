import { useCallback, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import type { CSSProperties } from "react";

import "./DotGrid.css";

type Dot = {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  inertiaApplied: boolean;
};

type PointerState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  lastTime: number;
  lastX: number;
  lastY: number;
};

type DotGridProps = {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: CSSProperties;
};

function throttle<TArgs extends unknown[]>(func: (...args: TArgs) => void, limit: number) {
  let lastCall = 0;

  return (...args: TArgs) => {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
}

function hexToRgb(hex: string) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) {
    return { r: 0, g: 0, b: 0 };
  }

  return {
    r: Number.parseInt(match[1], 16),
    g: Number.parseInt(match[2], 16),
    b: Number.parseInt(match[3], 16),
  };
}

function DotGrid({
  dotSize = 16,
  gap = 32,
  baseColor = "#5227FF",
  activeColor = "#5227FF",
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = "",
  style,
}: DotGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef<PointerState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) {
      return null;
    }

    const path = new window.Path2D();
    path.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return path;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) {
      return;
    }

    const { width, height } = wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");
    if (context) {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
    }

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;
    const gridWidth = cell * cols - gap;
    const gridHeight = cell * rows - gap;
    const startX = (width - gridWidth) / 2 + dotSize / 2;
    const startY = (height - gridHeight) / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        dots.push({
          cx: startX + x * cell,
          cy: startY + y * cell,
          xOffset: 0,
          yOffset: 0,
          inertiaApplied: false,
        });
      }
    }

    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) {
      return;
    }

    let frameId = 0;
    const proximitySquared = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      const { x: pointerX, y: pointerY } = pointerRef.current;

      dotsRef.current.forEach((dot) => {
        const offsetX = dot.cx + dot.xOffset;
        const offsetY = dot.cy + dot.yOffset;
        const deltaX = dot.cx - pointerX;
        const deltaY = dot.cy - pointerY;
        const distanceSquared = deltaX * deltaX + deltaY * deltaY;

        let fill = baseColor;
        if (distanceSquared <= proximitySquared) {
          const distance = Math.sqrt(distanceSquared);
          const mix = 1 - distance / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * mix);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * mix);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * mix);
          fill = `rgb(${r}, ${g}, ${b})`;
        }

        context.save();
        context.translate(offsetX, offsetY);
        context.fillStyle = fill;
        context.fill(circlePath);
        context.restore();
      });

      frameId = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activeRgb, baseColor, baseRgb, circlePath, proximity]);

  useEffect(() => {
    buildGrid();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(buildGrid);
      if (wrapperRef.current) {
        observer.observe(wrapperRef.current);
      }
    } else {
      window.addEventListener("resize", buildGrid);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      } else {
        window.removeEventListener("resize", buildGrid);
      }
    };
  }, [buildGrid]);

  useEffect(() => {
    const animateDotBack = (dot: Dot) => {
      gsap.to(dot, {
        xOffset: 0,
        yOffset: 0,
        duration: returnDuration,
        ease: "elastic.out(1, 0.75)",
        onComplete: () => {
          dot.inertiaApplied = false;
        },
      });
    };

    const applyImpulse = (dot: Dot, pushX: number, pushY: number) => {
      dot.inertiaApplied = true;
      gsap.killTweensOf(dot);
      const travel = Math.hypot(pushX, pushY);
      const impulseDuration = Math.min(0.65, Math.max(0.18, travel / resistance));

      gsap.to(dot, {
        xOffset: pushX,
        yOffset: pushY,
        duration: impulseDuration,
        ease: "power2.out",
        onComplete: () => animateDotBack(dot),
      });
    };

    const handleMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const now = performance.now();
      const pointer = pointerRef.current;
      const dt = pointer.lastTime ? now - pointer.lastTime : 16;
      const deltaX = event.clientX - pointer.lastX;
      const deltaY = event.clientY - pointer.lastY;

      let velocityX = (deltaX / dt) * 1000;
      let velocityY = (deltaY / dt) * 1000;
      let speed = Math.hypot(velocityX, velocityY);

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        velocityX *= scale;
        velocityY *= scale;
        speed = maxSpeed;
      }

      pointer.lastTime = now;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      pointer.vx = velocityX;
      pointer.vy = velocityY;
      pointer.speed = speed;

      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;

      dotsRef.current.forEach((dot) => {
        const distance = Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y);
        if (speed > speedTrigger && distance < proximity && !dot.inertiaApplied) {
          const pushX = dot.cx - pointer.x + velocityX * 0.005;
          const pushY = dot.cy - pointer.y + velocityY * 0.005;
          applyImpulse(dot, pushX, pushY);
        }
      });
    };

    const handleClick = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      dotsRef.current.forEach((dot) => {
        const distance = Math.hypot(dot.cx - clickX, dot.cy - clickY);
        if (distance < shockRadius && !dot.inertiaApplied) {
          const falloff = Math.max(0, 1 - distance / shockRadius);
          const pushX = (dot.cx - clickX) * shockStrength * falloff;
          const pushY = (dot.cy - clickY) * shockStrength * falloff;
          applyImpulse(dot, pushX, pushY);
        }
      });
    };

    const throttledMove = throttle(handleMove, 50);
    window.addEventListener("mousemove", throttledMove, { passive: true });
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", throttledMove);
      window.removeEventListener("click", handleClick);
    };
  }, [maxSpeed, proximity, resistance, returnDuration, shockRadius, shockStrength, speedTrigger]);

  const classes = className ? `dot-grid ${className}` : "dot-grid";

  return (
    <section className={classes} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
}

export default DotGrid;
