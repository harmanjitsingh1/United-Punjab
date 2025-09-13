import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BookOpen } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Services = () => {
  const { t } = useTranslation();

  const servicesList = [
    { key: "web", href: "/services/web-development" },
    { key: "digital", href: "/services/digital-marketing" },
    { key: "brand", href: "/services/brand-management" },
    { key: "logo", href: "/services/logo-design" },
    { key: "cyber", href: "/services/cyber-security" },
    { key: "coding", href: "/services/coding-classes" },
  ];

  return (
    <>
      <div className="text-center mb-10">
        <h3 className="text-4xl font-extrabold text-[#F57517] mb-4">
          {t("services.title")}
        </h3>
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          {t("services.intro")}
        </p>
      </div>

      {/* Services Grid */}
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((service) => (
          <Card className={"group cursor-pointer border-2 border-transparent hover:border-[#F57517] transition-colors duration-200 shadow-lg hover:shadow-2xl"} key={service.key}>
            <Link
              to={service.href}
              key={service.key}
              className=" rounded-2xl hover:border-[#F57517] flex flex-col items-center text-center transition-colors duration-200"
            >
              <CardContent className="flex justify-center flex-col items-center p-4">
                {/* Icon with circular background */}
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F57517]/10 transition-colors duration-200 dark:group-hover:bg-[#F57517] group-hover:bg-[#F57517]"
                >
                  <BookOpen className="text-gray-800 dark:text-white group-hover:text-white transition-colors duration-200" />
                </div>

                {/* Title text that changes color on hover */}
                <h4
                  className="text-lg font-semibold text-gray-800 dark:text-gray-200 dark:group-hover:text-[#F57517] group-hover:text-[#F57517] transition-colors duration-200 mt-3"
                >
                  {t(`services.list.${service.key}`)}
                </h4>
              </CardContent>
            </Link>
          </Card>
        ))}
      </ul>
    </>
  );
};

export default Services;
