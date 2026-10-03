import { startTransition, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import SectionTitle from "../components/SectionTitle";
import { projects } from "../data/projects";
import FeaturedProject from "../components/FeaturedProject";
import ProjectCard from "../components/ProjectCard";

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function Projects() {
  const { t } = useTranslation();
  const [showOtherProjects, setShowOtherProjects] = useState(false);

  const projectItems = projects.map((project) => ({
    project,
    item: t(`projects.items.${project.key}`, { returnObjects: true }),
  }));
  const featuredProjects = projectItems.filter(({ project }) => project.featured);
  const otherProjects = projectItems.filter(({ project }) => !project.featured);

  function toggleOtherProjects() {
    startTransition(() => {
      setShowOtherProjects((isShown) => !isShown);
    });
  }

  return (
    <section>
      <SectionTitle title={t("projects.title")} number="03." />
      <p className="mt-6 max-w-2xl leading-relaxed text-text-secondary">
        {t("projects.subtitle")}
      </p>

      <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">
        {featuredProjects.map(({ project, item }, index) => (
          <motion.div
            key={project.key}
            {...revealProps}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <FeaturedProject item={item} reversed={index % 2 === 1} />
          </motion.div>
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center gap-6 md:mt-28">
        <h3 className="text-xl font-title text-text-accent md:text-2xl">
          {t("projects.otherTitle")}
        </h3>
        <button
          type="button"
          onClick={toggleOtherProjects}
          aria-expanded={showOtherProjects}
          aria-controls="other-projects"
          className="inline-flex items-center gap-2 rounded-xl border border-accent-primary/40 bg-accent-primary/10 px-6 py-3 font-mono text-sm text-accent-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary hover:bg-accent-primary/15 hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          {showOtherProjects
            ? t("projects.hideOthers")
            : t("projects.showOthers", { count: otherProjects.length })}
          <FiChevronDown
            aria-hidden="true"
            className={`transition-transform duration-300 motion-reduce:transition-none ${
              showOtherProjects ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showOtherProjects && (
          <motion.div
            id="other-projects"
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            transition={{ duration: 0.25 }}
          >
            {otherProjects.map(({ project, item }, index) => (
              <motion.div
                key={project.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.045, ease: "easeOut" }}
              >
                <ProjectCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
