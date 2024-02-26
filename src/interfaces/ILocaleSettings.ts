import { ILocale } from '@/interfaces';
export interface ILocaleSettings {
  currentLocale: ILocale;
  defaultLocale: ILocale;
  userDefaultLocale: ILocale | null;
  builtInLocales: ILocale[];
  userLocales: ILocale[];
}
