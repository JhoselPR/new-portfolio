import { useTranslation } from "react-i18next";
import { IoLogoGithub } from "react-icons/io5";
import { FiArrowUpRight } from "react-icons/fi";

export default function FeaturedProject({ item, reversed }) {
  const { t } = useTranslation();

  return (
    <article className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-10">
      <a
        href={item.deploy || item.code}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className={`group relative block overflow-hidden rounded-2xl border border-border-stealth shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:border-accent-primary/50 md:col-span-7 ${
          reversed ? "md:order-last" : ""
        }`}
      >
        <img
          src={item.img}
          alt={t("projects.screenshotAlt", { title: item.title })}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg-primary/50 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0" />
      </a>

      <div className="md:col-span-5">
        <p className="text-xs font-mono uppercase tracking-widest text-accent-primary">
          {item.label}
        </p>
        <h3 className="mt-2 text-2xl font-title md:text-3xl">{item.title}</h3>
        <p className="mt-1 text-sm font-mono text-text-muted">{item.context}</p>

        <p className="mt-5 leading-relaxed text-text-secondary">{item.description}</p>
        <p className="mt-4 border-l-2 border-accent-primary/60 pl-4 text-sm leading-relaxed text-text-primary/90">
          {item.highlight}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border-stealth bg-bg-primary/20 px-2 py-1 text-xs font-mono text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {item.deploy && (
            <a
              href={item.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-accent-primary/40 bg-accent-primary/10 px-4 py-2 font-mono text-sm text-accent-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary hover:bg-accent-primary/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {t("projects.demo")}
              <FiArrowUpRight aria-hidden="true" />
            </a>
          )}
          {item.code && (
            <a
              href={item.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border-stealth px-4 py-2 font-mono text-sm text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary/50 hover:text-accent-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <IoLogoGithub aria-hidden="true" />
              {t("projects.code")}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
