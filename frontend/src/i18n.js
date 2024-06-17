import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// eslint-disable-next-line import/prefer-default-export
export const initializeI18n = () => {
  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      supportedLngs: ['en', 'ru'],
      fallbackLng: 'ru',
      debug: true,
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: '/locales/{{lng}}.json',
      },
    });

  return i18n;
};
