import { ILocale } from '@/interfaces/ILocale';

export interface ILocaleMessages {
  locale: ILocale;
  messages: {[key: string]: string;}
};
