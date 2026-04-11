import { useEffect } from "react";

function CustomCursor() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024
    ) {
      return undefined;
    }

    const cursor = document.createElement("div");
    const cursorDot = document.createElement("div");
    cursor.className = "custom-cursor";
    cursorDot.className = "custom-cursor-dot";
    document.body.append(cursor, cursorDot);
    document.body.classList.add("has-custom-cursor");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pointer };
    let frameId = 0;

    const render = () => {
      pointer.x += (target.x - pointer.x) * 0.16;
      pointer.y += (target.y - pointer.y) * 0.16;
      cursor.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      cursorDot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      frameId = window.requestAnimationFrame(render);
    };

    const handleMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };

    const activate = () => {
      cursor.classList.add("is-active");
      cursorDot.classList.add("is-active");
    };

    const deactivate = () => {
      cursor.classList.remove("is-active", "is-hovering");
      cursorDot.classList.remove("is-active");
    };

    const handleHoverStart = () => {
      cursor.classList.add("is-hovering");
    };

    const handleHoverEnd = () => {
      cursor.classList.remove("is-hovering");
    };

    const hoverTargets = document.querySelectorAll(
      "a, button, .work-item, .skill-card, .social-link, .footer-social a",
    );

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", activate);
    document.addEventListener("mouseleave", deactivate);
    hoverTargets.forEach((node) => {
      node.addEventListener("mouseenter", handleHoverStart);
      node.addEventListener("mouseleave", handleHoverEnd);
    });

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", activate);
      document.removeEventListener("mouseleave", deactivate);
      hoverTargets.forEach((node) => {
        node.removeEventListener("mouseenter", handleHoverStart);
        node.removeEventListener("mouseleave", handleHoverEnd);
      });
      document.body.classList.remove("has-custom-cursor");
      cursor.remove();
      cursorDot.remove();
    };
  }, []);

  return null;
}

export default CustomCursor;
