import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en/en";
import vi from "./vi/vi";

i18next.use(initReactI18next).init({
  resources: {
    en,
    vi,
  },
  lng: "vi",
  fallbackLng: "vi",
  ns: Object.keys(vi),
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
