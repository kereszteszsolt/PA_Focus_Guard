export interface ILocaleMessages {
  id: string;
  localeId: string;
  localeName: string;
  messages: {[key: string]: string;}
};

export type LocaleMessagesType = ILocaleMessages | {};
