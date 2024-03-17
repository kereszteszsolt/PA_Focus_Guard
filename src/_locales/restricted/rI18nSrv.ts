import r_en from './r_en.json';
import r_hu from './r_hu.json';

interface Translation {
  [key: string]: string;
}

const translations: { [lang: string]: Translation } = {
  en: r_en as Translation,
  hu: r_hu as Translation,
};

export const getTranslation = (key: string, lang: string): string => {
  const translation = translations[lang][key];
  return translation || key;
};
