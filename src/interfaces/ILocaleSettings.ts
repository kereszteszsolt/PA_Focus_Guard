export interface ILocaleSettings{
  currentLocale: string;
  currentLocaleName: string;
  defaultLocale: string;
  defaultLocaleName: string;
  userDefaultLocale: string | null;
  userDefaultLocaleName: string | null;
  builtInLocales: string[];
  userLocales: string[];
}

export type LocaleSettingsType = ILocaleSettings | {};
