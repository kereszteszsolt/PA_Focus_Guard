export interface ILocaleSettings {
  id: string;
  localeId: string;
  localeName: string;
  text_direction: string;
  isBuiltIn: boolean;
  isCurrent: boolean;
  isFallback1: boolean;
  isFallback2: boolean;
  isFactoryDefault: boolean;
}
