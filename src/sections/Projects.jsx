import { useTranslation } from "react-i18next";
import SectionTitle from "../components/SectionTitle";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section>
      <SectionTitle title={t("projects.title")} number="03." />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-10 auto-rows-fr">
        {projects.map((project) => (
          <ProjectCard key={project.key} project={project} />
        ))}
      </div>
    </section>
  );
}
