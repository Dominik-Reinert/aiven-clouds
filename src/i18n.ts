import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next, useTranslation } from "react-i18next";

enum SupportedLanguages {
  "en" = "en",
  "de" = "de",
}

export interface PositionValidationParam {
  min: number;
  max: number;
  lonOrLat: "Longitude" | "Latitude";
}

interface LanguageResource {
  welcome: string;
  homeInstruction: string;
  regionDropdownLabel: string;
  providerDropdownLabel: string;
  tableHeaderName: string;
  tableHeaderId: string;
  tableHeaderRegion: string;
  tableHeaderDistanceInKm: string;
  tableHeaderLonLat: string;
  positionValidationNotANumber: string;
  positionValidationWrongValue: string; //(param: PositionValidationParam) => string
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
      regionDropdownLabel: "Region(en)",
      providerDropdownLabel: "Anbieter",
      tableHeaderName: "Name",
      tableHeaderId: "ID",
      tableHeaderRegion: "Region",
      tableHeaderDistanceInKm: "Distanz in Km",
      tableHeaderLonLat: "( lon | lat )",
      positionValidationNotANumber: "{{lonOrLat}} muss eine Zahl sein!",
      positionValidationWrongValue:
        "{{lonOrLat}} muss zwischen {{min}} und {{max}} liegen!",
    },
  },
  en: {
    translation: {
      welcome: "Welcome to aiven clouds!",
      homeInstruction: "Please wait while the data is being fetched.",
      regionDropdownLabel: "Region(s)",
      providerDropdownLabel: "Provider",
      tableHeaderName: "Name",
      tableHeaderId: "ID",
      tableHeaderRegion: "Region",
      tableHeaderDistanceInKm: "Distance in km",
      tableHeaderLonLat: "( lon | lat )",
      positionValidationNotANumber: "{{lonOrLat}} must be a number!",
      positionValidationWrongValue:
        "{{lonOrLat}} must be between {{min}} and {{max}}!",
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
  t: (key: keyof LanguageResource, param?: any) => string,
  i18n: typeof i18n,
  ready: boolean
] {
  return useTranslation();
}
