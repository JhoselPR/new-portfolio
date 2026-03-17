import { useTranslation } from "react-i18next"
import { useActiveSection } from "../hooks/useActiveSection"

const sections = ["home", "about", "experience", "projects"]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const activeSection = useActiveSection(sections)
  const currentLang = i18n.language || "es"

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    document.documentElement.lang = lng
  }

  const languages = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ]

  return (
    <header className="w-full px-20 py-4 fixed top-0 left-0 shadow z-50 bg-[03001cb3] backdrop-blur-sm scroll-mt-24">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="#" className="inline-block text-xl transition-transform duration-300 hover:scale-105 font-semibold">Jhosel Ruiz</a>
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={"inline-block text-sm hover:scale-105 transition-all duration-300 " + (activeSection === section ? "text-green-bright font-medium" : "")}
            >
              {t(`navbar.${section}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
          type="button"
          onClick={() => changeLanguage("en")}
          className={`px-3 py-1 rounded-md ${currentLang === "en" ? "bg-green-bright text-black" : "bg-gray-700 text-white"}`}
          >
            EN
          </button>
          /
          <button
          type="button"
          onClick={() => changeLanguage("es")}
          className={`px-3 py-1 rounded-md ${currentLang === "es" ? "bg-green-bright text-black" : "bg-gray-700 text-white"}`}
          >
            ES
          </button>
        </div>
      </nav>
    </header>
  )
}
