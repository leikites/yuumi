import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    Lenis?: new (options?: Record<string, unknown>) => {
      on: (event: string, handler: (...args: unknown[]) => void) => void;
      raf: (time: number) => void;
      destroy?: () => void;
    };
  }
}

function SmoothScroll() {
  useEffect(() => {
    const Lenis = window.Lenis;
    if (!Lenis) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", updateScrollTrigger);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy?.();
    };
  }, []);

  return null;
}

export default SmoothScroll;
