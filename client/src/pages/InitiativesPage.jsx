import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Phone, Plane, BookOpen, Users } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function InitiativesPage() {
  const { t } = useTranslation();

  return (
    <section id="global-initiatives" className="max-w-6xl mx-auto px-6 py-16">
      {/* Title */}
      <h2 className="text-4xl font-bold text-[#F57517] mb-8 text-center">
        {t("initiatives.title")}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Airlines */}
        <Card className="rounded-2xl shadow-md hover:shadow-lg transition border-none">
          <CardHeader className="flex flex-row items-center gap-3">
            <Plane className="w-8 md:w-10 h-8 md:h-10 text-[#F57517]" />
            <CardTitle className="text-xl md:text-2xl">
              {t("initiatives.airlines.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {t("initiatives.airlines.description")}
          </CardContent>
        </Card>

        {/* Helpline */}
        <Card className="rounded-2xl shadow-md hover:shadow-lg transition border-none">
          <CardHeader className="flex flex-row items-center gap-3">
            <Phone className="w-8 md:w-10 h-8 md:h-10 text-[#F57517]" />
            <CardTitle className="text-xl md:text-2xl">
              {t("initiatives.helpline.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {t("initiatives.helpline.description")}
          </CardContent>
        </Card>

        {/* Gurdwaras & Directory */}
        <Card className="rounded-2xl shadow-md hover:shadow-lg transition border-none">
          <CardHeader className="flex flex-row items-center gap-3">
            <BookOpen className="w-8 md:w-10 h-8 md:h-10 text-[#F57517]" />
            <CardTitle className="text-xl md:text-2xl">
              {t("initiatives.directory.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {t("initiatives.directory.description")}
          </CardContent>
        </Card>

        {/* Business Roundtable */}
        <Card className="rounded-2xl shadow-md hover:shadow-lg transition border-none">
          <CardHeader className="flex flex-row items-center gap-3">
            <Users className="w-8 md:w-10 h-8 md:h-10 text-[#F57517]" />
            <CardTitle className="text-xl md:text-2xl">
              {t("initiatives.business.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {t("initiatives.business.description")}
          </CardContent>
        </Card>

      </div>
    </section>
  )
}
