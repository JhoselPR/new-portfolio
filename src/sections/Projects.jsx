import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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

  const projectItems = projects.map((project) => ({
    project,
    item: t(`projects.items.${project.key}`, { returnObjects: true }),
  }));
  const featuredProjects = projectItems.filter(({ project }) => project.featured);
  const otherProjects = projectItems.filter(({ project }) => !project.featured);

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

      <h3 className="mt-20 text-xl font-title text-text-accent md:mt-28 md:text-2xl">
        {t("projects.otherTitle")}
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {otherProjects.map(({ project, item }, index) => (
          <motion.div
            key={project.key}
            {...revealProps}
            transition={{ duration: 0.35, delay: (index % 3) * 0.06, ease: "easeOut" }}
          >
            <ProjectCard item={item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
