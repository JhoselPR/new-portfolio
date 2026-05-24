import { useTranslation } from "react-i18next";
import { IoLogoGithub } from "react-icons/io5";
import { MdOutlineWeb } from "react-icons/md";

export default function ProjectCard({ project }) {
  const { t } = useTranslation();
  const item = t(`projects.items.${project.key}`, { returnObjects: true });
console.log(item)
  const bentoSpanByKey = {
    1: "md:col-span-7",
    2: "md:col-span-5",
    3: "md:col-span-6",
    4: "md:col-span-6",
    5: "md:col-span-12",
  };

  const bentoClass = bentoSpanByKey[project.key] ?? "md:col-span-6";
  return (
    <article
      className={`glass-card cyan-glow rounded-2xl p-6 md:p-7 h-full transition-all duration-300 hover:border-accent-primary/50! hover:shadow-[0_0_30px_rgba(100,255,218,0.12)]! ${bentoClass}`}
    >
      <div className="flex justify-between gap-4 items-center">
        <p className="text-xs font-mono text-accent-primary uppercase tracking-widest">
          {item.label}
        </p>
        <div className="flex gap-3 items-center text-accent-primary">
          {item.deploy && (
            <a
              target="_blank"
              href={item.deploy}
              className="hover:scale-105 hover:text-accent-hover"
            >
              <MdOutlineWeb size={22} />
            </a>
          )}
          {item.code && (
            <a
              target="_blank"
              href={item.code}
              className="hover:scale-110 hover:text-accent-hover"
            >
              <IoLogoGithub size={21} />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-title mt-3">{item.title}</h3>
      <p className="text-text-secondary mt-4 leading-relaxed">
        {item.description}
      </p>

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
