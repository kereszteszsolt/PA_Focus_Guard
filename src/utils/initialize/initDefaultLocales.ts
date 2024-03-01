import { ILocale, ILocaleMessages, ILocaleWithSettings } from '@/interfaces';
import * as utils from '@/utils';
import * as constants from '@/constants';
import { en, hu, de, ro } from '@/_locales';

export const initLocaleSettingsAndMessages = async (): Promise<void> => {
  let localesWithSettings: ILocaleWithSettings[] = [
    { ...en.locale, isBuiltIn: true, isCurrent: true, isDefault: true, isFallback1: true, isFallback2: true },
    { ...hu.locale, isBuiltIn: true, isCurrent: false, isDefault: false, isFallback1: false, isFallback2: false },
    { ...de.locale, isBuiltIn: true, isCurrent: false, isDefault: false, isFallback1: false, isFallback2: false },
    { ...ro.locale, isBuiltIn: true, isCurrent: false, isDefault: false, isFallback1: false, isFallback2: false }
  ] as ILocaleWithSettings[];

  await utils.data.saveList(constants.storage.FG_LOCALES_SETTINGS, localesWithSettings);

  const messages_en: ILocaleMessages = {
    locale: en.locale,
    messages: en.messages
  };

  const messages_hu: ILocaleMessages = {
    locale: hu.locale,
    messages: hu.messages
  };

  const messages_de: ILocaleMessages = {
    locale: de.locale,
    messages: de.messages
  };

  const messages_ro: ILocaleMessages = {
    locale: ro.locale,
    messages: ro.messages
  };

  await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, [messages_en, messages_hu, messages_de, messages_ro]);
};
