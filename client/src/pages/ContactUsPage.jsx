import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { contactUsThunk } from "@/store/thunks/user.thunk";
import toast from "react-hot-toast";
import { Loader2Icon } from "lucide-react";

function ContactUsPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { buttonLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(contactUsThunk(formData));

    if (data?.payload?.success) {
      toast.success(data?.payload?.message || data?.payload?.data?.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    } else {
      toast.error(data?.payload?.message || data?.payload?.data?.message);
    }
  };

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

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label className="text-md block mb-1">{t("inputs.name")}</Label>
            <Input
              name="name"
              required
              type="text"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              placeholder={t("inputs.enterName")}
              className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2 border-transparent focus:border-2 !focus-visible:outline-none focus-visible:ring-0"
            />
          </div>
          <div>
            <Label className="text-md block mb-1">{t("inputs.email")}</Label>
            <Input
              name="email"
              required
              type="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              placeholder={t("inputs.enterEmail")}
              className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2 border-transparent focus:border-2 !focus-visible:outline-none focus-visible:ring-0"
            />
          </div>
          <div>
            <Label className="text-md block mb-1">{t("inputs.phone")}</Label>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange(e)}
              placeholder={t("inputs.enterPhone")}
              className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2 border-transparent focus:border-2 !focus-visible:outline-none focus-visible:ring-0"
            />
          </div>
          <div>
            <Label className="text-md block mb-1">{t("inputs.message")}</Label>
            <Input
              name="message"
              value={formData.message}
              onChange={(e) => handleChange(e)}
              required
              rows={4}
              placeholder={t("inputs.enterMessage")}
              className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2 border-transparent focus:border-2 !focus-visible:outline-none focus-visible:ring-0"
            />
          </div>

          <Button
            type="submit"
            disabled={buttonLoading}
            className="text-lg w-full bg-gradient-to-r from-[#F57517] to-orange-500 text-white py-6 cursor-pointer rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2"
          >
            {buttonLoading ? (
              <Loader2Icon className={"animate-spin"} />
            ) : (
              <>
                <Send className="w-5 h-5" /> {t("contactUs.sendButton")}
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ContactUsPage;
