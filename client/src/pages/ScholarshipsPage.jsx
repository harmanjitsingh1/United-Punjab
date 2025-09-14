import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function ScholarshipsPage() {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#F57517]">
            {t("scholarships.title")}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            {t("scholarships.subtitle")}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <CardTitle className="text-5xl font-bold text-[#F57517]">100</CardTitle>
            <CardContent className="mt-2 text-lg">{t("scholarships.stats.0")}</CardContent>
          </Card>
          <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <CardTitle className="text-5xl font-bold text-[#F57517]">500</CardTitle>
            <CardContent className="mt-2 text-lg">{t("scholarships.stats.1")}</CardContent>
          </Card>
          <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <CardTitle className="text-5xl font-bold text-[#F57517]">10,000</CardTitle>
            <CardContent className="mt-2 text-lg">{t("scholarships.stats.2")}</CardContent>
          </Card>
        </div>

        {/* Mission / Pledge */}
        <div className="bg-gradient-to-r from-[#F57517]/10 dark:via-zinc-800 via-[#f0f0f0]  to-[#F57517]/10 p-8 rounded-2xl text-center space-y-4 shadow-lg border-2 border-transparent hover:border-primary transition ">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F57517]">
            {t("scholarships.pledgeTitle")}
          </h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            {t("scholarships.pledgeText")}
          </p>
          <button className="mt-4 px-6 py-3 bg-[#F57517] text-white rounded-full font-semibold hover:bg-[#ff8c42] transition">
            {t("scholarships.supportButton")}
          </button>
        </div>
      </div>
    </section>
  );
}
