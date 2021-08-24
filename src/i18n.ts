import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next, useTranslation } from "react-i18next";

enum SupportedLanguages {
  "en" = "en",
  "de" = "de",
}

interface LanguageResource {
  welcome: string;
  homeInstruction: string;
}

interface DefaultNamespaceWrapper {
  translation: LanguageResource;
}

type LanguageResources = {
  [key in SupportedLanguages]: DefaultNamespaceWrapper;
};

const resources: LanguageResources = {
  de: {
    translation: {
      welcome: "Willkommen bei aiven clouds!",
      homeInstruction: "Wählen Sie oben entweder Amazon oder Google clouds.",
    },
  },
  en: {
    translation: {
      welcome: "Welcome to aiven clouds!",
      homeInstruction: "Select Amazon or Google clouds on top to get started.",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: resources as any,
  });

export function useLanguageTranslation(): [
  t: (key: keyof LanguageResource) => string,
  i18n: typeof i18n,
  ready: boolean
] {
  return useTranslation();
}
