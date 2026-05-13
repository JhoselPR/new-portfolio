import { useTranslation } from "react-i18next";
import SectionTitle from "../components/SectionTitle";

export default function About() {
  const { t } = useTranslation();

  return (
    <section>
      <SectionTitle title={t("about.title")} number="01." />
      <div className="flex flex-col-reverse items-center md:flex-row mt-10 md:mt-12 gap-8 md:gap-12">
        <article className="flex-1">
          <p className="md:text-lg text-text-secondary mt-4 whitespace-pre-line leading-loose">
            {t("about.description")}
          </p>

          <p className="md:text-lg text-accent-primary font-semibold mt-8 whitespace-pre-line leading-relaxed">
            {t("about.subtitle")}
          </p>

          <ul className="list-[circle] marker:text-accent-primary list-inside mt-2 grid grid-cols-2 sm:grid-cols-1 gap-1 font-light text-sm md:text-base leading-relaxed text-text-secondary">
            <li>JavaScript / TypeScript</li>
            <li>React.js</li>
            <li>Node.js</li>
            <li>Java</li>
            <li>SQL/NoSQL databases</li>
          </ul>

          <p className="md:text-lg mt-8 whitespace-pre-line leading-loose text-text-muted">
            {t("about.ending")}
          </p>
        </article>

        <div className="p-1 rounded-full border border-border-stealth/80 bg-surface-high/30">
          <img
            src="/img/icon.jpg"
            alt="Photo"
            className="rounded-full shadow-[0_0_20px_rgba(100,255,218,0.16)] transition-all duration-400 ease-in-out hover:shadow-[0_0_36px_rgba(100,255,218,0.24)] w-44 md:w-56 lg:w-72 h-auto"
          />
        </div>
      </div>
    </section>
  );
}
