import { useTranslation } from "react-i18next";
import SectionTitle from "../components/SectionTitle";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub, IoMail } from "react-icons/io5";
import { TbFileCvFilled } from "react-icons/tb";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section>
      <SectionTitle title={t("contact.title")} number="04." />

      <div className="mt-10 md:mt-12 text-center md:text-left flex flex-col items-center md:items-start gap-6">
        <p className="text-text-secondary max-w-xl leading-relaxed">
          {t("contact.description")}
        </p>

        <a
          href="mailto:felix.jhosel@gmail.com"
          className="bg-accent-primary text-bg-primary font-semibold rounded-xl px-7 py-3 hover:bg-accent-hover transition-colors"
        >
          {t("contact.cta")}
        </a>

        <div className="flex items-center md:w-45 md:justify-center gap-5 text-text-primary">
          <a href="https://www.linkedin.com/in/jhosel" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-5 h-5 hover:text-accent-primary transition-colors" />
          </a>
          <a href="https://github.com/JhoselPR" target="_blank" rel="noopener noreferrer">
            <IoLogoGithub className="w-5 h-5 hover:text-accent-primary transition-colors" />
          </a>
          <a href="mailto:felix.jhosel@gmail.com" target="_blank" rel="noopener noreferrer">
            <IoMail className="w-5 h-5 hover:text-accent-primary transition-colors" />
          </a>
          <a href="/files/CV_FJPR.pdf" target="_blank" rel="noopener noreferrer">
            <TbFileCvFilled className="w-5 h-5 hover:text-accent-primary transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
