import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { useTranslation } from "react-i18next";
import { experience } from "../data/experience";
import { motion, AnimatePresence } from "framer-motion";

export default function Experience() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const active = experience[activeTab];
  const data = t(`experience.items.${active.key}`, { returnObjects: true });

  return (
    <section>
      <SectionTitle title={t("experience.title")} number="02." />

      <div className="flex flex-col md:flex-row mt-10 md:mt-12 gap-6 md:gap-8">
        {/* Tabs */}
        <div className="flex md:flex-col md:min-w-56 border-b md:border-b-0 md:border-r border-border-stealth/80 overflow-x-auto">
          {experience.map((item, index) => {
            const company = t(`experience.items.${item.key}.company`);
            const isActive = index === activeTab;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(index)}
                className="relative px-4 py-3 text-left whitespace-nowrap"
              >
                <span
                    className={`relative z-10 font-medium ${
                      isActive
                        ? "text-accent-primary"
                        : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {company}
                </span>

                {/* Indicador animado */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                     className="absolute inset-0 bg-surface-high/35 border-accent-primary 
                       border-b-2 md:border-b-0 md:border-r-2"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 md:pl-8 pt-4 md:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
               <h3 className="text-xl md:text-2xl font-semibold font-title">
                {data.position}{" "}
                <span className="text-accent-primary">- {data.company}</span>
              </h3>

              <p className="text-sm md:text-base text-text-muted mt-3 font-mono">{data.date}</p>

              <ul className="mt-6 space-y-4 list-[circle] marker:text-text-secondary list-inside">
                {data.description.map((item, i) => (
                  <li key={i} className="text-text-secondary leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
