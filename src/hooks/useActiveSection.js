import { useEffect, useRef, useState } from "react";

const ACTIVE_LINE_RATIO = 0.35;
const FALLBACK_HEADER_HEIGHT = 72;

function getHeaderHeight() {
  return (
    document.querySelector("header")?.getBoundingClientRect().height ??
    FALLBACK_HEADER_HEIGHT
  );
}

function getActiveSectionId(sections) {
  const headerHeight = getHeaderHeight();
  const activationLine =
    headerHeight + (window.innerHeight - headerHeight) * ACTIVE_LINE_RATIO;

  let closestSection = sections[0];
  let closestDistance = Number.POSITIVE_INFINITY;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();

    if (rect.top <= activationLine && rect.bottom > activationLine) {
      return section.id;
    }

    const distanceToActiveLine = Math.min(
      Math.abs(rect.top - activationLine),
      Math.abs(rect.bottom - activationLine)
    );

    if (distanceToActiveLine < closestDistance) {
      closestDistance = distanceToActiveLine;
      closestSection = section;
    }
  }

  return closestSection?.id ?? "";
}

export function useActiveSection(sectionIds = []) {
  const [activeSection, setActiveSection] = useState("");
  const activeSectionRef = useRef("");
  const sectionKey = sectionIds.join("|");

  useEffect(() => {
    const sections = sectionKey
      .split("|")
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    let animationFrameId = null;

    function updateActiveSection() {
      animationFrameId = null;

      const id = getActiveSectionId(sections);

      if (!id || id === activeSectionRef.current) return;

      activeSectionRef.current = id;
      setActiveSection(id);

      // Actualiza el hash sin recargar ni contaminar el historial.
      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, "", `#${id}`);
      }
    }

    function scheduleUpdate() {
      if (animationFrameId !== null) return;

      animationFrameId = window.requestAnimationFrame(updateActiveSection);
    }

    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(scheduleUpdate) : null;

    sections.forEach((section) => resizeObserver?.observe(section));
    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver?.disconnect();

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [sectionKey]);

  return activeSection;
}
