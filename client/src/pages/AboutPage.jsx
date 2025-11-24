import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";
import { useTranslation } from "react-i18next";
function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-primary text-4xl md:text-5xl font-extrabold text-center mb-6">
        {t("about.title")}
      </h1>

      <p className="text-xl md:text-xl text-center max-w-4xl mx-auto mb-12 leading-relaxed">
        {t("about.intro")}
      </p>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary">{t("about.mission.title")}</h2>
            <p className="text-lg leading-relaxed">
             {t("about.mission.text")}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary">
              {t("about.presence.title")}
            </h2>
            <p className="text-lg leading-relaxed">
              {t("about.presence.text")}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/src/assets/image.jpeg"
            alt="Teamwork"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
        <Card className="p-6 rounded-2xl shadow-md hover:shadow-lg border-1 border-primary transition">
          <CardTitle className="text-3xl font-bold text-primary">25,000+</CardTitle>
          <CardContent className="text-lg">{t("about.stats.opportunities")}</CardContent>
        </Card>
        <Card className="p-6 rounded-2xl shadow-md hover:shadow-lg border-1 border-primary transition">
          <CardTitle className="text-3xl font-bold text-primary">4+</CardTitle>
          <CardContent className="text-lg">{t("about.stats.offices")}</CardContent>
        </Card>
        <Card className="p-6 rounded-2xl shadow-md hover:shadow-lg border-1 border-primary transition">
          <CardTitle className="text-3xl font-bold text-primary">1000s</CardTitle>
          <CardContent className="text-lg">{t("about.stats.youth")}</CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AboutPage;
