import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    // bg-[#1C1C1A]
    <footer className=" border-t border-[#F57517] text-center md:text-left pt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* <!-- About --> */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">
            {t("brandName")}
          </h3>
          <p className="text-sm leading-relaxed">{t("brandDes")}</p>
        </div>

        {/* <!-- Quick Links --> */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">
            {t("quickLinks")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={"/"} className="hover:text-primary transition">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="hover:text-primary transition">
                {t("nav.aboutUs")}
              </Link>
            </li>
            <li>
              <Link to={"/services"} className="hover:text-primary transition">
                {t("nav.services")}
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="hover:text-primary transition">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* <!-- Contact --> */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">
            {t("nav.contact")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              {t("email")}: &nbsp;
              <a
                href="mailto:unitedpunjab2026@outlook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                unitedpunjab2026@outlook.com
              </a>
            </li>
            <li>
              <a href="tel:+919876464310">{t("phone")}: +91 98764 64310</a>
            </li>
            <li>
              {t("address")}: &nbsp; {t("addressValue")}
            </li>
          </ul>
        </div>
      </div>

      {/* <!-- Bottom copyright --> */}
      <div className="mt-8 border-t text-center border-border dark:border-gray-700 py-4 text-sm">
        <p>&copy; 2025 {t("copyRight")}</p>
      </div>
    </footer>
  );
}

export default Footer;
