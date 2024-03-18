import * as cst from './constants';
import * as faqEn from './faq-en';
import * as faqHu from './faq-hu';
export const getTranslatedFile = (lang: string, content: string) => {
  switch (content) {
    case cst.FAQ:
      console.log('lang', lang);
      return lang === 'hu' ? faqHu.faq : faqEn.faq;
    default:
      return undefined;
  }
};
