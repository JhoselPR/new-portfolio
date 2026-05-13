import { useTranslation } from "react-i18next";

export default function ProjectCard({ project }) {
  const { t } = useTranslation();
  const item = t(`projects.items.${project.key}`, { returnObjects: true });

  const bentoSpanByKey = {
    design_system: "md:col-span-7",
    analytics_dashboard: "md:col-span-5",
    commerce_frontend: "md:col-span-6",
    devtools_ui: "md:col-span-6",
    landing_performance: "md:col-span-6",
  };

  const bentoClass = bentoSpanByKey[project.key] ?? "md:col-span-6";

  return (
    <article
      className={`glass-card cyan-glow rounded-2xl p-6 md:p-7 h-full transition-all duration-300 hover:border-accent-primary/50! hover:shadow-[0_0_30px_rgba(100,255,218,0.12)]! ${bentoClass}`}
    >
      <p className="text-xs font-mono text-accent-primary uppercase tracking-widest">
        {item.label}
      </p>
      <h3 className="text-xl md:text-2xl font-title mt-3">{item.title}</h3>
      <p className="text-text-secondary mt-4 leading-relaxed">{item.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono text-text-muted border border-border-stealth rounded-md px-2 py-1"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
