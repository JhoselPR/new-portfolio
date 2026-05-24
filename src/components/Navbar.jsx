import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useActiveSection } from "../hooks/useActiveSection";
import { FaLinkedin } from "react-icons/fa";
import { IoMail, IoLogoGithub } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { TbFileCvFilled } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

const sections = ["home", "about", "experience", "projects", "contact"];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const activeSection = useActiveSection(sections);
  const currentLang = i18n.language || "es";

  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  };

  // bloquear scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <header className={`w-full px-6 md:px-10 lg:px-12 py-4 fixed top-0 left-0 z-50 backdrop-blur-xl border-b border-border-stealth/80 ${isOpen ? "bg-bg-primary/95" : "bg-bg-primary/70"}`}>
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between text-text-primary">
        {/* IZQUIERDA (NO TOCAR) */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="inline-block text-xl transition-transform duration-300 hover:scale-105 font-semibold font-title tracking-tight"
          >
            Jhosel Ruiz
          </a>

          <div className="hidden md:flex items-center gap-6">
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={
                  "inline-block text-sm hover:scale-105 hover:text-accent-primary transition-all duration-300 font-mono " +
                  (activeSection === section
                    ? "border-b border-accent-primary font-medium text-accent-primary"
                    : "")
                }
              >
                {t(`navbar.${section}`)}
              </a>
            ))}
          </div>
        </div>

        {/* DERECHA (NO TOCAR EN DESKTOP) */}
        <div className="hidden md:flex gap-6 items-center">
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/jhosel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-5 h-auto hover:scale-105 hover:text-accent-primary transition-transform duration-300 text-text-primary" />
            </a>
            <a
              href="https://github.com/JhoselPR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoGithub className="w-5 h-auto hover:scale-105 hover:text-accent-primary transition-transform duration-300 text-text-primary" />{" "}
            </a>
            <a
              href="mailto:felix.jhosel@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoMail className="w-5 h-auto hover:scale-105 hover:text-accent-primary transition-transform duration-300 text-text-primary" />
            </a>
            <a
              href="/files/CV_FJPR.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TbFileCvFilled className="w-5 h-auto hover:scale-105 hover:text-accent-primary transition-transform duration-300 text-text-primary" />
            </a>
          </div>

          <div className="flex gap-2 text-[15px] font-mono text-text-muted">
            <button
              onClick={() => changeLanguage("en")}
              className={`cursor-pointer ${currentLang === "en" ? "border-b font-medium text-accent-primary" : ""}`}
            >
              EN
            </button>
            /
            <button
              onClick={() => changeLanguage("es")}
              className={`cursor-pointer ${currentLang === "es" ? "border-b font-medium text-accent-primary" : ""}`}
            >
              ES
            </button>
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiX size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiMenu size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 w-full backdrop-blur-lg bg-bg-primary/95 border-b border-border-stealth shadow-lg"
          >
            <div className="flex flex-col items-center py-6 gap-6">
              {/* Sections */}
              <div className="flex flex-col items-center gap-5">
                {sections.map((section) => (
                  <a
                    key={section}
                    href={`#${section}`}
                    onClick={() => setIsOpen(false)}
                    className={
                      "inline-block text-base hover:scale-105 transition-all duration-300 " +
                       (activeSection === section
                        ? "border-b font-medium text-accent-primary"
                        : "")
                    }
                  >
                    {t(`navbar.${section}`)}
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="w-2/3 border-t border-border-stealth" />

              {/* Social */}
              <div className="flex items-center gap-5">
                <a
                  href="https://www.linkedin.com/in/jhosel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="w-5 h-auto hover:scale-105 hover:text-accent-primary transition-transform duration-300 text-text-primary" />
                </a>
                <a
                  href="https://github.com/JhoselPR"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoGithub className="w-5 h-auto hover:scale-105 hover:text-accent-primary transition-transform duration-300 text-text-primary" />{" "}
                </a>
                <a
                  href="mailto:felix.jhosel@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoMail className="w-5 h-auto hover:scale-105 hover:text-accent-primary transition-transform duration-300 text-text-primary" />
                </a>
                <a
                  href="/files/CV_FJPR.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TbFileCvFilled className="w-5 h-auto hover:scale-105 hover:text-accent-primary transition-transform duration-300 text-text-primary" />
                </a>
              </div>

              {/* Language */}
              <div className="flex gap-3 text-base">
                <button
                  onClick={() => changeLanguage("en")}
                  className={`cursor-pointer ${currentLang === "en" ? "border-b font-medium text-accent-primary" : ""}`}
                >
                  EN
                </button>
                /
                <button
                  onClick={() => changeLanguage("es")}
                  className={`cursor-pointer ${currentLang === "es" ? "border-b font-medium text-accent-primary" : ""}`}
                >
                  ES
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
