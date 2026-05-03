import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { useTranslation } from "react-i18next";
import { experience } from "../data/experience";

export default function Experience() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const active = experience[activeTab];
  const data = t(`experience.items.${active.key}`, { returnObjects: true });

  return (
    <section className="pt-10">
      <SectionTitle title={t("experience.title")} />

      <div className="flex flex-col md:flex-row mt-8 gap-4 mt-12">
        
        {/* Tabs */}
        <div className="flex md:flex-col border-b md:border-b-0 md:border-r border-border/30 overflow-x-auto">
          {experience.map((item, index) => {
            const company = t(`experience.items.${item.key}.company`);

            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-3 text-left whitespace-nowrap
                  ${
                    activeTab === index
                      ? "text-text-secondary border-b-2 md:border-b-0 md:border-r-2 border-accent-primary bg-white/5"
                      : "text-brand-secondary hover:text-white"
                  }`}
              >
                {company}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 md:pl-8 pt-6 md:pt-0">
          <h3 className="text-xl md:text-2xl font-semibold">
            {data.position}{" "}
            <span className="text-text-secondary">-  {data.company}</span>
          </h3>

          <p className="text-lg text-gray-400 mt-3">{data.date}</p>

          <ul className="mt-6 space-y-4 list-[circle] marker:text-text-secondary list-inside">
            {data.description.map((item, i) => (
              <li key={i} className="text-text-darker leading-relaxed">
              {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}