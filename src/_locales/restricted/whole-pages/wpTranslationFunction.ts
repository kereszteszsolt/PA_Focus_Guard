import * as cst from './constants';
import * as faqEn from './faq-en';
import * as faqHu from './faq-hu';
import * as gtcHU from './gtc-hu';
import * as gtcEN from './gtc-en';
import * as privacyEn from './privacy-en';
import * as privacyHu from './privacy-hu';
import * as acknowledgementEn from './acknowledgements-en';
import * as acknowledgementHu from './acknowledgements-hu';

export const getTranslatedFile = (lang: string, content: string) => {
  switch (content) {
    case cst.FAQ:
      console.log('lang', lang);
      return lang === 'hu' ? faqHu.faq : faqEn.faq;
    case cst.GTC:
      return lang === 'hu' ? gtcHU.gtc : gtcEN.gtc;
    case cst.PRIVACY:
      return lang === 'hu' ? privacyHu.privacy : privacyEn.privacy;
    case cst.ACKNOWLEDGEMENT:
      return lang === 'hu' ? acknowledgementHu.acknowledgements : acknowledgementEn.acknowledgements;
    default:
      return undefined;
  }
};
