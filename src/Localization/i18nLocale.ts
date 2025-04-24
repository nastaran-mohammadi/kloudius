import i18n from 'i18next';
import en from '@/Localization/locale-json/en.json';
import { initReactI18next } from 'react-i18next';

export type TranslationKeys = keyof typeof en;

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources: {
        en: { translation: en },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export const i18nLocale = i18n;