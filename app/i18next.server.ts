import { RemixI18Next } from 'remix-i18next';
import i18n from '~/i18n'; // your i18n configuration file
import enCommon from '@public/locales/en/common.json'
import jaCommon from '@public/locales/ja/common.json'

export const lngs  = { 
  en : {
    common : enCommon
  },
  ja : {
    common : jaCommon
  }
}

let i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
  },
});

export default i18next;