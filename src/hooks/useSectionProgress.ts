import { useEffect, useState } from "react";
import type { RefObject } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

type UseSectionProgressOptions = {
  startOffset?: number;
  endOffset?: number;
};

function useSectionProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseSectionProgressOptions = {},
) {
  const { startOffset = 0.8, endOffset = 0.3 } = options;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      const node = ref.current;
      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * startOffset;
      const end = rect.height - viewportHeight * endOffset;
      const next = clamp((start - rect.top) / Math.max(end, 1), 0, 1);
      setProgress(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [endOffset, ref, startOffset]);

  return progress;
}

export default useSectionProgress;
