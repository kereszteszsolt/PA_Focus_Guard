import { defineStore } from 'pinia';
import * as utils from '@/utils';
import { ILocaleSettings, ILocaleMessages, ILocale } from '@/interfaces';
import * as constants from '@/constants';

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    isLoading: true,
    localeSettings: {
      currentLocale: { id: 'en', name: 'Hungarian', text_direction: 'ltr' } as ILocale,
      userDefaultLocale: { id: 'en', name: 'English', text_direction: 'ltr' } as ILocale,
      defaultLocale: { id: 'en', name: 'English', text_direction: 'ltr' } as ILocale,
      builtInLocales: [{ id: 'en', name: 'English', text_direction: 'ltr' }, {
        id: 'hu',
        name: 'Hungarian',
        text_direction: 'ltr'
      }] as ILocale[],
      userLocales: [{ id: 'hu-runes', name: 'Old-Hungarian', text_direction: 'rtl' }] as ILocale[]
    } as ILocaleSettings,
    messages: {} as ILocaleMessages | undefined,
    userDefaultMessages: {} as ILocaleMessages | undefined,
    defaultMessages: {} as ILocaleMessages | undefined
  }),
  getters: {
    getTranslation: (state) => (key: string): string => {
      switch (true) {
        case state.messages && state.messages.messages.hasOwnProperty(key):
          return state.messages.messages[key];
        case state.userDefaultMessages && state.userDefaultMessages.messages.hasOwnProperty(key):
          return state.userDefaultMessages.messages[key];
        case state.defaultMessages && state.defaultMessages.messages.hasOwnProperty(key):
          return state.defaultMessages.messages[key];
        default:
          return key;
      }
    },
    getAllLocales: (state) => {
      return state.localeSettings.builtInLocales;
    },
    getCurrentLocale: (state) => {
      return state.localeSettings.currentLocale;
    },
  },
  actions: {
    async fetchLocaleSettingsAndMessages(): Promise<void> {
      this.isLoading = true;
      this.localeSettings = await utils.data.fetchEntry(constants.storage.FG_LOCALES_SETTINGS) as ILocaleSettings;
      const allMessages: ILocaleMessages[] = await utils.data.fetchList(constants.storage.FG_LOCALES_MESSAGES);
      this.messages = allMessages.find((m) => m.locale.id === this.localeSettings.currentLocale.id) || undefined;
      this.defaultMessages = allMessages.find((m) => m.locale.id === this.localeSettings.defaultLocale.id) || undefined;
      this.userDefaultMessages = allMessages.find((m) => m.locale.id === this.localeSettings?.userDefaultLocale?.id) || undefined;
    },
    async addNewLocale(iLocaleMessages: ILocaleMessages): Promise<void> {
      this.isLoading = true;
      const allMessages: ILocaleMessages[] = await utils.data.fetchList(constants.storage.FG_LOCALES_MESSAGES);
      if (allMessages.some((m) => m.locale.id === iLocaleMessages.locale.id && m.locale.name === iLocaleMessages.locale.name)) {
        this.isLoading = false;
        return;
      }
      allMessages.push(iLocaleMessages);
      await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, allMessages);
      this.localeSettings.userLocales.push(iLocaleMessages.locale);
      await utils.data.saveEntry(constants.storage.FG_LOCALES_SETTINGS, this.localeSettings);
      this.isLoading = false;
    },
    async switchLocale(newLocaleId: string): Promise<void> {
      this.isLoading = true;
      this.localeSettings.currentLocale =
        this.localeSettings.builtInLocales.find((l) => l.id === newLocaleId) ||
        this.localeSettings.userLocales.find((l) => l.id === newLocaleId) ||
        this.localeSettings.defaultLocale;
      await utils.data.saveEntry(constants.storage.FG_LOCALES_SETTINGS, this.localeSettings);
      const allMessages: ILocaleMessages[] = await utils.data.fetchList(constants.storage.FG_LOCALES_MESSAGES);
      this.messages = allMessages.find((m) => m.locale.id === this.localeSettings.currentLocale.id) || undefined;
      this.isLoading = false;
    }
  }
});
