import { IoLogoGithub } from "react-icons/io5";
import { MdOutlineWeb } from "react-icons/md";

export default function ProjectCard({ item }) {
  return (
    <article
      className="glass-card cyan-glow group flex h-full min-h-[15rem] overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-accent-primary/50! hover:shadow-[0_0_30px_rgba(100,255,218,0.12)]! motion-reduce:transition-none md:p-7"
    >
      {item.img ? (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
          <img
            src={item.img}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="h-full w-full scale-110 object-cover opacity-30 transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(100,255,218,0.3),transparent_32%),linear-gradient(135deg,rgba(7,18,42,0.48),rgba(21,31,55,0.92)_68%)]" />
        </div>
      ) : null}

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex justify-between gap-4 items-center">
          <p className="text-xs font-mono text-accent-primary uppercase tracking-widest">
            {item.label}
          </p>
          <div className="flex gap-3 items-center text-accent-primary">
            {item.deploy && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item.deploy}
                className="hover:scale-105 hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
              >
                <MdOutlineWeb size={22} />
              </a>
            )}
            {item.code && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item.code}
                className="hover:scale-110 hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
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

        <div className="mt-auto pt-6 flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono text-text-muted border border-border-stealth rounded-md bg-bg-primary/20 px-2 py-1 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
