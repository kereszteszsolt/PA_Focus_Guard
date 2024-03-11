import { ILocale, ILocaleMessages, ILocaleSettings } from '@/interfaces';
import * as utils from '@/utils';
import * as constants from '@/constants';
import { en, hu, de, ro } from '@/_locales';

export const initLocaleSettingsAndMessages = async (): Promise<void> => {
  let localesWithSettings: ILocaleSettings[] = [
    { localeId: hu.locale.id, localeName: hu.locale.name, isBuiltIn: true, isCurrent: true, isFactoryDefault: true, isFallback1: true, isFallback2: true },
    { localeId: en.locale.id, localeName: en.locale.name, isBuiltIn: true, isCurrent: false, isFactoryDefault: false, isFallback1: false, isFallback2: false },
    { localeId: de.locale.id, localeName: de.locale.name, isBuiltIn: true, isCurrent: false, isFactoryDefault: false, isFallback1: false, isFallback2: false },
    { localeId: ro.locale.id, localeName: ro.locale.name, isBuiltIn: true, isCurrent: false, isFactoryDefault: false, isFallback1: false, isFallback2: false }
  ] as ILocaleSettings[];

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
