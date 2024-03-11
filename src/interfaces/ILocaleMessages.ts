import { ILocale } from '@/interfaces/ILocale';

export interface ILocaleMessages {
  id: string;
  lsId: string;
  locale: ILocale;
  messages: { [key: string]: string; };
};
