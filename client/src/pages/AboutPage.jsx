import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import React from "react";
import { useTranslation } from "react-i18next";

// function AboutPage() {
//   const { t } = useTranslation();

//   return (
//     <div className="px-6 py-12 max-w-6xl mx-auto">
//       {/* Title */}
//       <h1 className="text-[#F57517] text-4xl md:text-5xl font-extrabold text-center mb-6">
//         {t("nav.aboutUs")}
//       </h1>

//       {/* Intro Section */}
//       <p className="text-xl md:text-xl text-center max-w-4xl mx-auto mb-12 leading-relaxed">
//         United Punjab is a{" "}
//         <span className="font-semibold">social initiative</span> by{" "}
//         <span className="font-semibold">
//           IndusOne, Tech IndusOne Services LLP
//         </span>{" "}
//         — a premier IT startup dedicated to building world-class tech talent and
//         empowering Punjabi youth with opportunities across the globe.
//       </p>

//       {/* Two Column Layout */}
//       <div className="grid md:grid-cols-2 gap-10 items-center">
//         {/* Left - Text */}
//         <div className="space-y-8">
//           <div className="space-y-2">
//             <h2 className="text-2xl font-bold text-[#F57517]">Our Mission</h2>
//             <p className="text-lg leading-relaxed">
//               We aim to nurture and empower local talent by creating an
//               environment of continuous learning, mentorship, and career
//               opportunities. Through AI, Machine Learning, hackathons, and
//               skill-based training, we bridge the gap between learning and
//               employment.
//             </p>
//           </div>

//           <div className="space-y-2">
//             <h2 className="text-2xl font-bold text-[#F57517]">
//               Global Presence
//             </h2>
//             <p className="text-lg leading-relaxed">
//               Headquartered in <strong>Mohali, Punjab</strong>, we also have a
//               business development team in <strong>San Jose, California</strong>
//               . New offices in <strong>Singapore</strong> and{" "}
//               <strong>Dubai</strong> are launching by early 2026 to expand
//               global outreach.
//             </p>
//           </div>
//         </div>

//         {/* Right - Image / Illustration */}
//         <div className="flex justify-center">
//           <img
//             src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=700&q=80"
//             alt="Teamwork"
//             className="rounded-2xl shadow-lg"
//           />
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
//         <div className="p-6 bg-[#3c3c3c98] rounded-2xl shadow-md hover:shadow-lg transition">
//           <h3 className="text-3xl font-bold text-[#F57517]">25,000+</h3>
//           <p className="mt-2">Career Opportunities</p>
//         </div>
//         <div className="p-6 bg-[#3c3c3c98] rounded-2xl shadow-md hover:shadow-lg transition">
//           <h3 className="text-3xl font-bold text-[#F57517]">4+</h3>
//           <p className="mt-2">Global Offices</p>
//         </div>
//         <div className="p-6 bg-[#3c3c3c98] rounded-2xl shadow-md hover:shadow-lg transition">
//           <h3 className="text-3xl font-bold text-[#F57517]">1000s</h3>
//           <p className="mt-2">Youth Trained & Mentored</p>
//         </div>
//       </div>
//     </div>
//   );
// }

function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="text-[#F57517] text-4xl md:text-5xl font-extrabold text-center mb-6">
        {t("about.title")}
      </h1>

      {/* Intro Section */}
      <p className="text-xl md:text-xl text-center max-w-4xl mx-auto mb-12 leading-relaxed">
        {t("about.intro")}
      </p>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left - Text */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#F57517]">{t("about.mission.title")}</h2>
            <p className="text-lg leading-relaxed">
             {t("about.mission.text")}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#F57517]">
              {t("about.presence.title")}
            </h2>
            <p className="text-lg leading-relaxed">
              {t("about.presence.text")}
            </p>
          </div>
        </div>

        {/* Right - Image / Illustration */}
        <div className="flex justify-center">
          <img
            src="/src/assets/image.jpeg"
            alt="Teamwork"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
        <Card className="p-6 rounded-2xl shadow-md hover:shadow-lg border-1 border-primary transition">
          <CardTitle className="text-3xl font-bold text-[#F57517]">25,000+</CardTitle>
          <CardContent className="text-lg">{t("about.stats.opportunities")}</CardContent>
        </Card>
        <Card className="p-6 rounded-2xl shadow-md hover:shadow-lg border-1 border-primary transition">
          <CardTitle className="text-3xl font-bold text-[#F57517]">4+</CardTitle>
          <CardContent className="text-lg">{t("about.stats.offices")}</CardContent>
        </Card>
        <Card className="p-6 rounded-2xl shadow-md hover:shadow-lg border-1 border-primary transition">
          <CardTitle className="text-3xl font-bold text-[#F57517]">1000s</CardTitle>
          <CardContent className="text-lg">{t("about.stats.youth")}</CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AboutPage;
