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
  regionDropdownLabel: string;
  providerDropdownLabel: string;
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
      homeInstruction: "Bitte warten Sie, während die Daten geladen werden.",
      regionDropdownLabel: "Region",
      providerDropdownLabel: "Anbieter"
    },
  },
  en: {
    translation: {
      welcome: "Welcome to aiven clouds!",
      homeInstruction: "Please wait while the data is being fetched.",
      regionDropdownLabel: "Region",
      providerDropdownLabel: "Provider"
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
