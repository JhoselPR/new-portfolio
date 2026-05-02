import AsciiPortrait from "../components/AsciiPortrait";
import { useTranslation } from "react-i18next";
import { IoMail } from "react-icons/io5";

export default function Home() {
  const { t, i18n } = useTranslation();

  return (
    <section
      id="home"
      className="h-screen flex items-center justify-center"
    >
      <div className="flex flex-col md:flex-row gap-10 md:gap-2 items-center -mt-25 sm:-mt-10 md:mt-0">
        <AsciiPortrait />
        <div className="flex flex-col gap-4 text-center md:text-left max-w-xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-text-accent">
            {t("home.greeting")}
            <span className="text-text-secondary"> Jhosel.</span>
          </h1>
          <p className="sm:text-lg text-text-primary mt-2 whitespace-pre-line leading-loose">
            {t("home.description")}
          </p>

          <a
            href="mailto:felix.jhosel@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-accent border border-text-accent hover:bg-bg-secondary py-2 px-12 rounded-md transition-all duration-300 w-fit cursor-pointer mt-8 md:mt-4 active:scale-95 flex items-center gap-2 self-center md:self-start"
          >
            <IoMail size={20} />
            {t("home.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
