import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border-stealth mt-12">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 py-8 flex flex-col sm:flex-row gap-3 items-center justify-between text-sm text-text-muted font-mono text-center sm:text-left">
        <p>{t("footer.rights")}</p>
        <p className="whitespace-pre-line text-xs">{t("footer.built")}</p>
      </div>
    </footer>
  );
}
