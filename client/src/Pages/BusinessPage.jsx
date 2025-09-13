import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Building2, Globe2, Users } from "lucide-react";
import { Card, CardHeader } from "@/Components/ui/card";

export default function BusinessPage() {
  const { t } = useTranslation();

  return (
    <section id="business" className="max-w-6xl mx-auto px-6 py-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h3 className="text-4xl font-extrabold text-[#F57517] mb-4">
          {t("business.title")}
        </h3>
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          {t("business.description.part1")}{" "}
          <span className="text-[#F57517] font-semibold">
            {t("business.brand")}
          </span>{" "}
          {t("business.description.part2")}
        </p>
      </div>

      {/* Highlight Card */}
      <div
        className="bg-gradient-to-r from-[#F57517]/10 dark:via-zinc-800 via-[#f0f0f0]  to-[#F57517]/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg border-2 border-transparent hover:border-2 hover:border-[#F57517] transition-all duration-300 mb-16"
      >
        <h4 className="text-4xl font-bold text-primary mb-3 group-hover:text-[#F57517] transition-colors">
          {t("business.brand")}
        </h4>
        <p className="text-lg leading-relaxed">
          {t("business.details")}
        </p>
        <Link
          to="/business/eternal"
          className="mt-6 px-6 py-2 rounded-full bg-[#F57517] text-white 
                     font-semibold hover:bg-[#ff8533] transition-colors"
        >
          {t("business.cta")}
        </Link>
      </div>

      {/* Business Promotion Centers Section */}
      <div className="space-y-10">
        <h3 className="text-3xl font-bold text-primary text-center mb-8">
          {t("business.bfc.title")}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Global Centers */}
          <Card className="rounded-2xl p-6 border border-transparent shadow-md hover:border-[#F57517] transition">
            <CardHeader className="flex items-center gap-3 mb-4">
              <Building2 className="w-8 h-8 text-[#F57517]" />
              <h4 className="text-secondary text-2xl font-semibold ">
                {t("business.bfc.centersTitle")}
              </h4>
            </CardHeader>
            <p className="leading-relaxed">
              {t("business.bfc.centers")}
            </p>
          </Card>

          {/* Trade & Delegations */}
          <Card className="rounded-2xl p-6 border border-transparent shadow-md hover:border-[#F57517] transition">
            <CardHeader className="flex items-center gap-3 mb-4">
              <Globe2 className="w-8 h-8 text-[#F57517]" />
              <h4 className="text-secondary text-2xl font-semibold">
                {t("business.bfc.tradeTitle")}
              </h4>
            </CardHeader>
            <p className="leading-relaxed">
              {t("business.bfc.trade")}
            </p>
          </Card>

          {/* Career & Training */}
          <Card className="rounded-2xl p-6 border border-transparent shadow-md hover:border-[#F57517] transition md:col-span-2">
            <CardHeader className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-[#F57517]" />
              <h4 className="text-secondary text-2xl font-semibold">
                {t("business.bfc.careerTitle")}
              </h4>
            </CardHeader>
            <p className="leading-relaxed">
              {t("business.bfc.career")}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
