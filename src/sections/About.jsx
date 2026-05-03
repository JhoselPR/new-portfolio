import { useTranslation } from "react-i18next";
import SectionTitle from "../components/SectionTitle";

export default function About() {
  const { t, i18n } = useTranslation();

  return (
    <section className="pt-10">
      <SectionTitle title={t("about.title")} />
      <div className="flex flex-col-reverse items-center md:flex-row pt-10 md:pt-20 gap-5 md:gap-20">
        <article>
          <p className="md:text-lg text-text-primary mt-4 whitespace-pre-line leading-loose">
            {t("about.description")}
          </p>

          <p className="md:text-lg text-text-secondary font-semibold mt-8 whitespace-pre-line leading-realaxed">
            {t("about.subtitle")}
          </p>

          <ul className="list-[circle] marker:text-text-secondary list-inside mt-2 grid grid-cols-2 sm:grid-cols-1 gap-1 font-light text-sm md:text-base leading-relaxed">
            <li>JavaScript / TypeScript</li>
            <li>React.js</li>
            <li>Node.js</li>
            <li>Java</li>
            <li>SQL/NoSQL databases</li>
          </ul>

          <p className="md:text-lg mt-8 whitespace-pre-line leading-loose">
            {t("about.ending")}
          </p>
        </article>

        <img
          src="/img/icon.jpg"
          alt="Photo"
          className="rounded-full border shadow-[0_0_15px_var(--color-border),0_0_25px_var(--color-border)] transition-all duration-400 ease-in-out hover:shadow-[0_0_25px_var(--color-border),0_0_50px_var(--color-border)] w-50 md:w-60 lg:w-80 h-auto"
        />
      </div>
    </section>
  );
}
