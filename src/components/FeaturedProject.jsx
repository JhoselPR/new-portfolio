import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoLogoGithub } from "react-icons/io5";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";

const mediaFrameClass =
  "group relative block overflow-hidden rounded-2xl border border-border-stealth shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:border-accent-primary/50 md:col-span-7";

function ProjectVideo({ src, thumbnail, label, hint, className }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [{ canHover, prefersReducedMotion }] = useState(() => ({
    canHover: window.matchMedia("(hover: hover)").matches,
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  }));
  const playsOnHover = canHover && !prefersReducedMotion;

  function play() {
    videoRef.current?.play().catch(() => {});
  }

  function stop() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (canHover) {
          // Start downloading once visible so hovering plays instantly.
          if (entry.isIntersecting) video.preload = "auto";
        } else if (entry.isIntersecting) {
          // Touch devices can't hover, so play while the demo is on screen.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [canHover, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        <video
          src={src}
          poster={thumbnail}
          aria-label={label}
          muted
          loop
          playsInline
          preload="none"
          controls
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={className}
      tabIndex={playsOnHover ? 0 : undefined}
      onMouseEnter={playsOnHover ? play : undefined}
      onMouseLeave={playsOnHover ? stop : undefined}
      onFocus={playsOnHover ? play : undefined}
      onBlur={playsOnHover ? stop : undefined}
    >
      <video
        ref={videoRef}
        src={src}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
        onPlaying={() => setIsPlaying(true)}
        className="h-full w-full object-cover"
      />
      <img
        src={thumbnail}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />
      {playsOnHover && (
        <span
          className={`pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-accent-primary/40 bg-bg-primary/80 px-3 py-1.5 font-mono text-xs text-accent-primary transition-opacity duration-300 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
        >
          <FiPlay aria-hidden="true" />
          {hint}
        </span>
      )}
    </div>
  );
}

export default function FeaturedProject({ item, reversed }) {
  const { t } = useTranslation();
  const orderClass = reversed ? "md:order-last" : "";

  return (
    <article className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-10">
      {item.video ? (
        <ProjectVideo
          src={item.video}
          thumbnail={item.img}
          label={t("projects.videoAlt", { title: item.title })}
          hint={t("projects.videoHint")}
          className={`${mediaFrameClass} aspect-[1280/774] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary ${orderClass}`}
        />
      ) : (
        <a
          href={item.deploy || item.code}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className={`${mediaFrameClass} ${orderClass}`}
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
      )}

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
