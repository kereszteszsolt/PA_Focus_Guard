import * as cst from './constants';
import * as faqEn from './faq-en';
import * as faqHu from './faq-hu';
import * as gtcHU from './gtc-hu';
import * as gtcEN from './gtc-en';

export const getTranslatedFile = (lang: string, content: string) => {
  switch (content) {
    case cst.FAQ:
      console.log('lang', lang);
      return lang === 'hu' ? faqHu.faq : faqEn.faq;
    case cst.GTC:
      return lang === 'hu' ? gtcHU.gtc : gtcEN.gtc;
    default:
      return undefined;
  }
};
