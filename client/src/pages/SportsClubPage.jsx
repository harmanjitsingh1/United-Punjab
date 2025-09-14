import { useTranslation } from "react-i18next";
import { Volleyball, Trophy, BicepsFlexed } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SportsClubPage() {
  const { t } = useTranslation();

  const clubs = [
    { label: t("sports.clubs.football"), icon: Volleyball },
    { label: t("sports.clubs.hockey"), icon: Trophy },
    { label: t("sports.clubs.kabaddi"), icon: BicepsFlexed },
  ];

  return (
    <section id="sports" className="max-w-6xl mx-auto px-6 py-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h3 className="text-4xl font-extrabold text-primary mb-4">
          {t("sports.title")}
        </h3>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed">
          {t("sports.subtitle")}
        </p>
      </div>

      {/* Clubs Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {clubs.map((club, index) => {
          const Icon = club.icon;
          return (
            <Card
              key={index}
              className="group border-2 border-transparent rounded-2xl p-8 hover:border-primary dark:hover:border-primary hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
            >
              <div
                className="w-16 h-16 flex items-center justify-center bg-[#F57517]/10 rounded-full mb-4 dark:group-hover:bg-[#F57517] group-hover:bg-[#F57517] transition-colors"
              >
                <Icon className="text-gray-800 dark:text-white group-hover:text-white" />
              </div>
              <h4 className="text-lg font-semibold group-hover:text-[#F57517] transition-colors">
                {club.label}
              </h4>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
