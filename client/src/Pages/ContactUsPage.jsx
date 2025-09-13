import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

function ContactUsPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="dark:bg-[#1b1b1b] bg-popover backdrop-blur-xl px-5 py-10 md:p-10 md:my-10 rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Heading */}
        
        <h2 className="text-4xl font-extrabold text-center text-primary">
          {t("contactUs.title")}
        </h2>
        <p className="text-center text-lg border-transparent mt-2 mb-8">
          {t("contactUs.subtitle")}
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* Full Name */}
          <div>
            <Label className="text-md block mb-1">
              {t("inputs.name")}
            </Label>
            <Input
              name="name"
              required
              type="text"
              placeholder={t("inputs.enterName")}
              className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2 border-transparent focus:border-2 !focus-visible:outline-none focus-visible:ring-0"
            />
          </div>

          {/* Email */}
          <div>
            <Label className="text-md block mb-1">
              {t("inputs.email")}
            </Label>
            <Input
              name="email"
              required
              type="email"
              placeholder={t("inputs.enterEmail")}
              className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2 border-transparent focus:border-2 !focus-visible:outline-none focus-visible:ring-0"
            />
          </div>

          {/* Phone (Optional) */}
          <div>
            <Label className="text-md block mb-1">
              {t("inputs.phone")}
            </Label>
            <Input
              name="phone"
              type="tel"
              placeholder={t("inputs.enterPhone")}
              className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2 border-transparent focus:border-2 !focus-visible:outline-none focus-visible:ring-0"
            />
          </div>

          {/* Message */}
          <div>
            <Label className="text-md block mb-1">
              {t("inputs.message")}
            </Label>
            <Input
              name="message"
              required
              rows={4}
              placeholder={t("inputs.enterMessage")}
              className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2 border-transparent focus:border-2 !focus-visible:outline-none focus-visible:ring-0"
            />
          </div>

          {/* Button */}
          <Button
            type="submit"
            className="text-lg w-full bg-gradient-to-r from-[#F57517] to-orange-500 
                       text-white py-6 cursor-pointer rounded-lg font-semibold hover:scale-105 
                       transition-transform shadow-lg flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" /> {t("contactUs.sendButton")}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ContactUsPage;
