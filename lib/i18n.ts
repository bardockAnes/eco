// src/lib/i18n.ts
import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import fr from '../locales/fr.json';


export const deviceLanguage = getLocales()?.[0]?.languageCode?? "en";

export const i18n = new I18n({
  en,
  ar,
  fr,
});

i18n.defaultLocale = deviceLanguage;
i18n.locale = deviceLanguage;
