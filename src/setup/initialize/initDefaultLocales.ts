import { ILocaleMessages, ILocaleSettings } from '@/interfaces';
import * as utils from '@/utils';
import * as constants from '@/constants';
import { en, hu, de, ro } from '@/_locales';

export const initLocaleSettingsAndMessages = async (current?: string): Promise<void> => {
  let localeSettings: ILocaleSettings[] = [] as ILocaleSettings[];
  let lsHu: ILocaleSettings = {
    id: utils.unique.generateUniqueListId(localeSettings),
    localeId: hu.locale.id,
    localeName: hu.locale.name,
    text_direction: hu.locale.text_direction,
    isBuiltIn: true,
    isCurrent: current && current === 'hungarian',
    isFactoryDefault: false,
    isFallback1: false,
    isFallback2: false
  } as ILocaleSettings;
  localeSettings.push(lsHu);
  let lsEn: ILocaleSettings = {
    id: utils.unique.generateUniqueListId(localeSettings),
    localeId: en.locale.id,
    localeName: en.locale.name,
    text_direction: en.locale.text_direction,
    isBuiltIn: true,
    isCurrent: current ? current === 'english': true,
    isFactoryDefault: true,
    isFallback1: true,
    isFallback2: true
  } as ILocaleSettings;
  localeSettings.push(lsEn);
  let lsDe: ILocaleSettings = {
    id: utils.unique.generateUniqueListId(localeSettings),
    localeId: de.locale.id,
    localeName: de.locale.name,
    text_direction: de.locale.text_direction,
    isBuiltIn: true,
    isCurrent: current && current === 'german',
    isFactoryDefault: false,
    isFallback1: false,
    isFallback2: false
  } as ILocaleSettings;
  localeSettings.push(lsDe);
  let lsRo: ILocaleSettings = {
    id: utils.unique.generateUniqueListId(localeSettings),
    localeId: ro.locale.id,
    localeName: ro.locale.name,
    text_direction: ro.locale.text_direction,
    isBuiltIn: true,
    isCurrent: current && current === 'romanian',
    isFactoryDefault: false,
    isFallback1: false,
    isFallback2: false
  } as ILocaleSettings;
  localeSettings.push(lsRo);
  await utils.data.saveList(constants.storage.FG_LOCALES_SETTINGS, localeSettings);

  let localeMessages: ILocaleMessages[] = [] as ILocaleMessages[];
  const messages_en: ILocaleMessages = {
    id: utils.unique.generateUniqueListId(localeMessages),
    lsId: lsEn.id,
    locale: en.locale,
    messages: en.messages
  };
  localeMessages.push(messages_en);

  const messages_hu: ILocaleMessages = {
    id: utils.unique.generateUniqueListId(localeMessages),
    lsId: lsHu.id,
    locale: hu.locale,
    messages: hu.messages
  };
  localeMessages.push(messages_hu);

  const messages_de: ILocaleMessages = {
    id: utils.unique.generateUniqueListId(localeMessages),
    lsId: lsDe.id,
    locale: de.locale,
    messages: de.messages
  };
  localeMessages.push(messages_de);

  const messages_ro: ILocaleMessages = {
    id: utils.unique.generateUniqueListId(localeMessages),
    lsId: lsRo.id,
    locale: ro.locale,
    messages: ro.messages
  };
  localeMessages.push(messages_ro);

  await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, localeMessages);
};
