import { useEffect, useState } from "react";

export function useActiveSection(sectionIds = []) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);

        if (visible) {
          const id = visible.target.id;

          setActiveSection(id);

          // actualiza el hash sin recargar
          window.history.replaceState(null, "", `#${id}`);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px", 
        threshold: 0
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}