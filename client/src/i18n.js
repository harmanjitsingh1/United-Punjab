import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import pa from "./locales/pa.json";

i18n
  .use(LanguageDetector) // detect browser language
  .use(initReactI18next) // hook into react
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      pa: { translation: pa },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "hi", "pa"],
    nonExplicitSupportedLngs: true, // handles en-US → en
    interpolation: { escapeValue: false },
    // debug: true,
  });

export default i18n;
