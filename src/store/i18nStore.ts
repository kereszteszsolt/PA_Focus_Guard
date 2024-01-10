import { defineStore } from 'pinia';
import * as utils from '@/utils';
import { ILocaleSettings, ILocaleMessages, LocaleMessagesType, LocaleSettingsType } from '@/interfaces';
import * as constants from '@/constants';
import { en, hu } from '@/_locales';

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    isLoading: true,
    localeSettings: {
      currentLocale: 'en',
      currentLocaleName: 'English',
      userDefaultLocale: null,
      userDefaultLocaleName: null,
      defaultLocale: 'en',
      defaultLocaleName: 'English',
      builtInLocales: [],
      userLocales: []
    } as ILocaleSettings,
    messages: {} as LocaleMessagesType,
    userDefaultMessages: {} as LocaleMessagesType,
    defaultMessages: {} as LocaleMessagesType
  }),
  getters: {
    getTranslation: (state) => (key: string): string => {
      switch (true) {
        case 'messages' in state.messages && state.messages.messages.hasOwnProperty(key):
          return state.messages.messages[key];
        case 'messages' in state.userDefaultMessages && state.userDefaultMessages.messages.hasOwnProperty(key):
          return state.userDefaultMessages.messages[key];
        case 'messages' in state.defaultMessages && state.defaultMessages.messages.hasOwnProperty(key):
          return state.defaultMessages.messages[key];
        default:
          return key;
      }
    }
  },
  actions: {
    async fetchLocaleSettingsAndMessages(): Promise<void> {
      this.isLoading = true;
      this.localeSettings = await utils.data.fetchEntry(constants.storage.FG_LOCALES_SETTINGS) as ILocaleSettings;
      const allMessages: ILocaleMessages[] = await utils.data.fetchList(constants.storage.FG_LOCALES_MESSAGES);
      if ('currentLocale' in this.localeSettings) {
        this.messages = allMessages.find((message: ILocaleMessages) => message.localeId === (this.localeSettings as ILocaleSettings).currentLocale) || {};
      }
      if ('userDefaultLocale' in this.localeSettings) {
        this.userDefaultMessages = allMessages.find((message: ILocaleMessages) => message.localeId === (this.localeSettings as ILocaleSettings).userDefaultLocale) || {};
      }
      if ('defaultLocale' in this.localeSettings) {
        this.defaultMessages = allMessages.find((message: ILocaleMessages) => message.localeId === (this.localeSettings as ILocaleSettings).defaultLocale) || {};
      }
      this.isLoading = false;
    },
    async addNewLocale(localeId: string, localeName: string, messages: { [key: string]: string; }): Promise<void> {
      this.isLoading = true;
      const allMessages: ILocaleMessages[] = await utils.data.fetchList(constants.storage.FG_LOCALES_MESSAGES);
      allMessages.push({
        id: utils.unique.generateUniqueListId(allMessages),
        localeId: localeId,
        localeName: localeName,
        messages: messages
      });
      await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, allMessages);
      this.isLoading = false;
    },
    async updateLocaleSettings(localeSettings: ILocaleSettings): Promise<void> {
      this.isLoading = true;
      await utils.data.saveEntry(constants.storage.FG_LOCALES_SETTINGS, localeSettings);
      this.isLoading = false;
    },
    async initLocaleSettingsAndMessages(): Promise<void> {
      this.isLoading = true;
      this.localeSettings = {
        currentLocale: 'en',
        currentLocaleName: 'English',
        userDefaultLocale: null,
        userDefaultLocaleName: null,
        defaultLocale: 'en',
        defaultLocaleName: 'English',
        builtInLocales: [],
        userLocales: []
      } as ILocaleSettings;
      await utils.data.saveEntry(constants.storage.FG_LOCALES_SETTINGS, this.localeSettings);

      const messages_en: ILocaleMessages = {
        id: utils.unique.generateUniqueListId([]),
        localeId: en.localeId,
        localeName: en.localeName,
        messages: en.messages
      };
      this.localeSettings.builtInLocales.push(messages_en.localeId);
      await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, [messages_en]);
      await utils.data.saveEntry(constants.storage.FG_LOCALES_SETTINGS, this.localeSettings);

      const messages_hu: ILocaleMessages = {
        id: utils.unique.generateUniqueListId([messages_en]),
        localeId: hu.localeId,
        localeName: hu.localeName,
        messages: hu.messages
      };
      this.localeSettings.builtInLocales.push(messages_hu.localeId);
      await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, [messages_en, messages_hu]);
      await utils.data.saveEntry(constants.storage.FG_LOCALES_SETTINGS, this.localeSettings);
    }
  }
});
