export interface ILocaleWithSettings {
  id: string;
  name: string;
  text_direction: string;
  isBuiltIn: boolean;
  isCurrent: boolean;
  isFallback1: boolean;
  isFallback2: boolean;
  isFactoryDefault: boolean;
}
