import AsciiPortrait from "../components/AsciiPortrait";
import { useTranslation } from "react-i18next";
import { IoMail } from "react-icons/io5";

export default function Home() {
  const { t } = useTranslation();

  return (
    <section className="min-h-[calc(100svh-96px)] flex items-center md:-mt-20">
      <div className="w-full grid md:grid-cols-[auto_minmax(0,1fr)] gap-10 md:gap-8 items-center">
        <div className="flex items-center justify-center">
        <AsciiPortrait />
         </div>
        <div className="flex flex-col gap-4 md:gap-6 text-center md:text-left max-w-xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-text-accent leading-relaxed font-title tracking-tight">
            {t("home.greeting")}
            <span className="text-accent-primary font-semibold"> Jhosel</span>.
          </h1>
          <p className="sm:text-lg text-text-secondary mt-2 whitespace-pre-line leading-loose">
            {t("home.description")}
          </p>

          <a
            href="mailto:felix.jhosel@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bg-primary bg-accent-primary hover:bg-accent-hover py-2.5 px-8 rounded-xl transition-all duration-300 w-fit cursor-pointer mt-8 md:mt-4 active:scale-95 flex items-center gap-2 self-center md:self-start font-medium"
          >
            <IoMail size={20} />
            {t("home.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
