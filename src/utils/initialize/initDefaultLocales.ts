import { ILocale, ILocaleMessages, ILocaleSettings } from '@/interfaces';
import * as utils from '@/utils';
import * as constants from '@/constants';
import { en, hu } from '@/_locales';

export const initLocaleSettingsAndMessages = async (): Promise<void> => {
  let localeSettings = {
    currentLocale: { id: 'en', name: 'English', text_direction: 'ltr' } as ILocale,
    defaultLocale: { id: 'en', name: 'English', text_direction: 'ltr' } as ILocale,
    userDefaultLocale: null,
    builtInLocales: [
      { id: 'en', name: 'English', text_direction: 'ltr' },
      { id: 'hu', name: 'Hungarian', text_direction: 'ltr' }
    ] as ILocale[],
    userLocales: [] as ILocale[]
  } as ILocaleSettings;

  await utils.data.saveEntry(constants.storage.FG_LOCALES_SETTINGS, localeSettings);

  const messages_en: ILocaleMessages = {
    locale: { id: 'en', name: 'English', text_direction: 'ltr' },
    messages: en.messages
  };

  await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, [messages_en]);
  //await utils.data.saveEntry(constants.storage.FG_LOCALES_SETTINGS, localeSettings);

  const messages_hu: ILocaleMessages = {
    locale: { id: 'hu', name: 'Hungarian', text_direction: 'ltr' },
    messages: hu.messages
  };

  await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, [messages_en, messages_hu]);
  //await utils.data.saveEntry(constants.storage.FG_LOCALES_SETTINGS, localeSettings);
};
