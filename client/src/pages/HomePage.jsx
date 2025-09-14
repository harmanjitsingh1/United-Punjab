import HeroSection from "@/components/HeroSection";
import { useTranslation } from "react-i18next";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function HomePage() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <HeroSection />

      {/* <section className="bg-zinc-900 text-zinc-200 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F57517]">
            {t("homeSection.title")}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed">
            {t("homeSection.paragraphs.0")}
          </p>
          <p className="text-lg md:text-xl leading-relaxed">
            {t("homeSection.paragraphs.1")}
          </p>
          <p className="text-lg md:text-xl leading-relaxed">
            {t("homeSection.paragraphs.2")}
          </p>
          <p className="text-lg md:text-xl leading-relaxed">
            {t("homeSection.paragraphs.3")}
          </p>
        </div>
      </section> */}

      <section className="pt-10 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-10">
          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#F57517] leading-snug">
            {t("homeSection.title")}
          </h2>

          {/* Intro */}
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t("homeSection.paragraphs.0")}
          </p>

          {/* Grid of Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-12 transition">
      
            <Card className="rounded-2xl shadow-md hover:shadow-xl transition border-none">
              <CardTitle className="text-2xl font-semibold text-[#F57517]">
                {t("homeSection.cards.challengeTitle")}
              </CardTitle>
              <CardContent className=" text-md leading-relaxed">
                {t("homeSection.cards.challengeText")}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md hover:shadow-lgxk transition border-none">
              <CardTitle className="text-2xl font-semibold text-[#F57517]">
                {t("homeSection.cards.unityTitle")}
              </CardTitle>
              <CardContent className=" text-md leading-relaxed">
                {t("homeSection.cards.unityText")}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md hover:shadow-xl transition border-none">
              <CardTitle className="text-2xl font-semibold text-[#F57517]">
                {t("homeSection.cards.visionTitle")}
              </CardTitle>
              <CardContent className=" text-md leading-relaxed">
                {t("homeSection.cards.visionText")}
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-16 space-y-6">
            <h3 className="text-3xl font-bold text-[#F57517]">
              {t("homeSection.ctaTitle")}
            </h3>
            <p className=" text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              {t("homeSection.ctaText")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
