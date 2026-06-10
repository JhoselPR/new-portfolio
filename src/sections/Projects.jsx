import { startTransition, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

const ALL_TECH_FILTER = "all";
const INITIAL_PROJECTS_COUNT = 4;
const TECH_FILTERS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Unity",
  "iOS",
  "Supabase",
  "MySQL",
  "MongoDB",
  "Java",
];

const bentoSpanPatterns = {
  1: ["md:col-span-12"],
  2: ["md:col-span-7", "md:col-span-5"],
  3: ["md:col-span-4", "md:col-span-4", "md:col-span-4"],
  4: ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"],
  5: [
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
    "md:col-span-12",
  ],
  6: [
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
    "md:col-span-6",
    "md:col-span-6",
  ],
  7: [
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-4",
  ],
  8: [
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
    "md:col-span-6",
    "md:col-span-6",
    "md:col-span-5",
    "md:col-span-7",
  ],
  9: [
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-5",
    "md:col-span-7",
  ],
};

function getBentoClass(index, total) {
  return bentoSpanPatterns[total]?.[index] ?? "md:col-span-6";
}

const gridVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      staggerChildren: 0.045,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25 },
  },
};

export default function Projects() {
  const { t } = useTranslation();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeTech, setActiveTech] = useState(ALL_TECH_FILTER);

  const projectItems = projects.map((project) => ({
    project,
    item: t(`projects.items.${project.key}`, { returnObjects: true }),
  }));

  const filteredProjects =
    activeTech === ALL_TECH_FILTER
      ? projectItems
      : projectItems.filter(({ item }) => item.stack?.includes(activeTech));

  const visibleProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECTS_COUNT);
  const hasHiddenProjects = filteredProjects.length > INITIAL_PROJECTS_COUNT;

  function handleTechFilter(tech) {
    setActiveTech(tech);
    setShowAllProjects(false);
  }

  function handleShowMore() {
    startTransition(() => {
      setShowAllProjects(true);
    });
  }

  return (
    <section>
      <SectionTitle title={t("projects.title")} number="03." />

      <div
        className="mt-8 flex flex-wrap gap-2 md:gap-3"
        role="group"
        aria-label={t("projects.filtersLabel")}
      >
        <button
          type="button"
          aria-pressed={activeTech === ALL_TECH_FILTER}
          onClick={() => handleTechFilter(ALL_TECH_FILTER)}
          className={`rounded-full border px-4 py-2 font-mono text-xs transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary motion-reduce:transition-none ${
            activeTech === ALL_TECH_FILTER
              ? "border-accent-primary bg-accent-primary/15 text-accent-primary shadow-[0_0_18px_rgba(100,255,218,0.12)]"
              : "border-border-stealth bg-surface-high/40 text-text-muted hover:border-accent-primary/50 hover:text-accent-primary"
          }`}
        >
          {t("projects.filtersAll")}
        </button>

        {TECH_FILTERS.map((tech) => (
          <button
            key={tech}
            type="button"
            aria-pressed={activeTech === tech}
            onClick={() => handleTechFilter(tech)}
            className={`rounded-full border px-4 py-2 font-mono text-xs transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary motion-reduce:transition-none ${
              activeTech === tech
                ? "border-accent-primary bg-accent-primary/15 text-accent-primary shadow-[0_0_18px_rgba(100,255,218,0.12)]"
                : "border-border-stealth bg-surface-high/40 text-text-muted hover:border-accent-primary/50 hover:text-accent-primary"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTech}
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {visibleProjects.map(({ project, item }, index) => (
            <motion.div
              key={project.key}
              className={getBentoClass(index, visibleProjects.length)}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              layout
            >
              <ProjectCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {hasHiddenProjects && !showAllProjects ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleShowMore}
            className="rounded-xl border border-accent-primary/40 bg-accent-primary/10 px-6 py-3 font-mono text-sm text-accent-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary hover:bg-accent-primary/15 hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary active:scale-95 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {t("projects.showMore")}
          </button>
        </div>
      ) : null}
    </section>
  );
}
