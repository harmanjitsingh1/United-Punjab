import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-[#F57517] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">{t("pageNotFound")}</h2>
      <p className="mb-6">
        {t('404Message')}
      </p>
      <Link
        to="/"
        className="px-6 py-2 rounded-lg bg-[#F57517] text-white transition"
      >
        {t("goHome")}
      </Link>
    </div>
  );
}
