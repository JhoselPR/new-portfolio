import { useTranslation } from "react-i18next";
import { IoLogoGithub } from "react-icons/io5";
import { MdOutlineWeb, MdDownload } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";

export default function ProjectCard({ item }) {
  const { t } = useTranslation();
  const DeployIcon = item.download ? MdDownload : MdOutlineWeb;
  const deployLabel = item.download ? t("projects.download") : t("projects.demo");

  return (
    <article className="glass-card cyan-glow group flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/50! hover:shadow-[0_0_30px_rgba(100,255,218,0.12)]! motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {item.img ? (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
          <img
            src={item.img}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="h-full w-full scale-105 object-cover opacity-30 transition-transform duration-700 group-hover:scale-100 motion-reduce:transition-none"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(100,255,218,0.3),transparent_32%),linear-gradient(135deg,rgba(7,18,42,0.48),rgba(21,31,55,0.92)_68%)]" />
        </div>
      ) : null}

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-mono text-text-muted">{item.context}</p>
          <div className="flex items-center gap-3 text-text-secondary">
            {item.deploy && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item.deploy}
                aria-label={`${deployLabel}: ${item.title}`}
                title={deployLabel}
                className="hover:scale-105 hover:text-accent-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
              >
                <DeployIcon size={21} />
              </a>
            )}
            {item.code && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item.code}
                aria-label={`${t("projects.code")}: ${item.title}`}
                title={t("projects.code")}
                className="hover:scale-110 hover:text-accent-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
              >
                <IoLogoGithub size={20} />
              </a>
            )}
          </div>
        </div>

        <h4 className="mt-3 text-lg font-title transition-colors duration-300 group-hover:text-accent-primary md:text-xl">
          {item.title}
        </h4>

        {item.award && (
          <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-2.5 py-1 text-xs font-mono text-accent-primary">
            <FaTrophy aria-hidden="true" size={11} />
            {item.award}
          </p>
        )}

        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {item.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border-stealth bg-bg-primary/20 px-2 py-1 text-xs font-mono text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
