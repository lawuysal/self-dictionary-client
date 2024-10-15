import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next.use(LanguageDetector).init({
  supportedLngs: ["en-US", "tr-TR", "tr", "en"],
  fallbackLng: "en-US",
  detection: { caches: ["localStorage"], order: ["navigator"] },
});
