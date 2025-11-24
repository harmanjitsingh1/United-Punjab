import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function HeroSection() {
  const { t } = useTranslation();
  const { isAuthorized } = useSelector((state) => state.auth);

  return (
    <section className="relative text-center py-20 md:py-28 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-[#F57517]/10 dark:via-zinc-800 via-[#f0f0f0]  to-[#F57517]/10 transition-colors duration-200">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-[#ff8c42] via-[#F57517] to-[#ff8c42] bg-clip-text text-transparent leading-tight mb-4">
        {t("brandName")}
      </h1>

      {/* Sub Heading */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 transition-colors duration-200">
        {t("tagLine")}
      </h2>

      {/* Description */}
      <p className="mt-4 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed transition-colors duration-200">
        {t("brandDes")}
      </p>

      {/* CTA Button */}
      {isAuthorized ? (
        <Link to="/dashboard">
          <Button
            asChild
            className="mt-8 bg-[#F57517] text-white text-lg font-semibold px-8 py-6 
            rounded-xl shadow-lg hover:bg-[#ff8c42] hover:scale-105 transition-transform"
          >
            <span>{t("nav.dashboard")}</span>
          </Button>
        </Link>
      ) : (
        <Link to="/signup">
          <Button
            asChild
            className="mt-8 bg-[#F57517] text-white text-lg font-semibold px-8 py-6 
            rounded-xl shadow-lg hover:bg-[#ff8c42] hover:scale-105 transition-transform"
          >
            <span>{t("nav.signup")}</span>
          </Button>
        </Link>
      )}
    </section>
  );
}

export default HeroSection;
