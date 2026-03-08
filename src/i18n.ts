import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

function getInitialLanguage(): string {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("lang");
  if (saved === "zh" || saved === "en") return saved;
  const browser = navigator.language || (navigator.languages && navigator.languages[0]) || "";
  if (/^zh(\s*-\s*[A-Za-z]+)?$/i.test(browser)) return "zh";
  return "en";
}

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, zh: { translation: zh } },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
  document.documentElement.lang = lng;
});

export default i18n;
