import { useTranslation } from "react-i18next"

export default function Navbar() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    document.documentElement.lang = lng
  }

  const languages = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ]

  return (
    <header className="w-full px-10 py-4">

      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="inline-block text-2xl transition-transform duration-300 hover:scale-105">Jhosel Ruiz</a>

        <div>
        {["about", "experience", "projects"].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className="inline-block px-4 py-2 text-sm transition-transform duration-300 hover:scale-105"
          >
            {t(`navbar.${section}`)}
          </a>
        ))}

          <div className="inline-block relative">
            <div className="absolute right-0 mt-2 w-32 bg-whie border rounded shadow-lg">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="block w-full text-left px-4 py-2 text-sm "
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
