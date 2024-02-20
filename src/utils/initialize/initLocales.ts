import { ILocaleMessages, ILocaleSettings } from '@/interfaces';
import * as utils from '@/utils';
import * as constants from '@/constants';
import { en, hu } from '@/_locales';

export const initLocaleSettingsAndMessages = async (): Promise<void> => {
  let localeSettings = {
    currentLocale: 'en',
    currentLocaleName: 'English',
    userDefaultLocale: null,
    userDefaultLocaleName: null,
    defaultLocale: 'en',
    defaultLocaleName: 'English',
    builtInLocales: [],
    userLocales: []
  } as ILocaleSettings;

  await utils.data.saveEntry(constants.storage.FG_LOCALES_SETTINGS, localeSettings);

  const messages_en: ILocaleMessages = {
    id: utils.unique.generateUniqueListId([]),
    localeId: en.localeId,
    localeName: en.localeName,
    messages: en.messages
  };
  localeSettings.builtInLocales.push(messages_en.localeId);
  await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, [messages_en]);
  await utils.data.saveEntry(constants.storage.FG_LOCALES_SETTINGS, localeSettings);

  const messages_hu: ILocaleMessages = {
    id: utils.unique.generateUniqueListId([messages_en]),
    localeId: hu.localeId,
    localeName: hu.localeName,
    messages: hu.messages
  };
  localeSettings.builtInLocales.push(messages_hu.localeId);
  await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, [messages_en, messages_hu]);
  await utils.data.saveEntry(constants.storage.FG_LOCALES_SETTINGS, localeSettings);
};
