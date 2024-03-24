import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { dictionaryENG } from "./dictionary/eng/eng";
import { dictionaryRUS } from "./dictionary/rus/rus";

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    fallbackLng: "en",
    returnObjects: true,
    resources: {
        en: {
            translation: dictionaryENG
        },
        ru: {
            translation: dictionaryRUS
        }
    }
})
 