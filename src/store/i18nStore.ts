import { defineStore } from 'pinia';
import * as utils from '@/utils';
import { ILocaleMessages, ILocaleWithSettings } from '@/interfaces';
import * as constants from '@/constants';
import { generateNumberForDuplicatesByField } from '@/utils/unique';

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    isLoading: true,
    fastSettings: {
      currentLocaleId: 'en',
      buildInLocaleIds: ['en', 'hu', 'de', 'ro'],
      factoryDefault: 'en',
      fallBackLocale1: 'en',
      fallBackLocale2: 'en'
    },
    localesWithSettings: [
      { id: 'en', name: 'English', text_direction: 'ltr', isBuiltIn: true, isCurrent: true, isFactoryDefault: true },
      { id: 'hu', name: 'Magyar', text_direction: 'ltr', isBuiltIn: true, isCurrent: false, isFactoryDefault: false },
      { id: 'de', name: 'Deutsch', text_direction: 'ltr', isBuiltIn: true, isCurrent: false, isFactoryDefault: false },
      { id: 'ro', name: 'Română', text_direction: 'ltr', isBuiltIn: true, isCurrent: false, isFactoryDefault: false }
    ] as ILocaleWithSettings[],
    allLocaleMessages: [] as ILocaleMessages[]
  }),
  getters: {
    getTranslation: (state) => (key: string): string => {
      switch (true) {
        case state.allLocaleMessages && state.allLocaleMessages.some((id) => id.locale.id === state.fastSettings.currentLocaleId) &&
        state.allLocaleMessages.find((id) => id.locale.id === state.fastSettings.currentLocaleId)?.messages.hasOwnProperty(key):
          return state.allLocaleMessages.find((id) => id.locale.id === state.fastSettings.currentLocaleId)?.messages[key] || key;
        case state.allLocaleMessages && state.allLocaleMessages.some((id) => id.locale.id === state.fastSettings.fallBackLocale1) &&
        state.allLocaleMessages.find((id) => id.locale.id === state.fastSettings.fallBackLocale1)?.messages.hasOwnProperty(key):
          return state.allLocaleMessages.find((id) => id.locale.id === state.fastSettings.fallBackLocale1)?.messages[key] || key;
        case state.allLocaleMessages && state.allLocaleMessages.some((id) => id.locale.id === state.fastSettings.fallBackLocale2) &&
        state.allLocaleMessages.find((id) => id.locale.id === state.fastSettings.fallBackLocale2)?.messages.hasOwnProperty(key):
          return state.allLocaleMessages.find((id) => id.locale.id === state.fastSettings.fallBackLocale2)?.messages[key] || key;
        case state.allLocaleMessages && state.allLocaleMessages.some((id) => id.locale.id === state.fastSettings.factoryDefault) &&
        state.allLocaleMessages.find((id) => id.locale.id === state.fastSettings.factoryDefault)?.messages.hasOwnProperty(key):
          return state.allLocaleMessages.find((id) => id.locale.id === state.fastSettings.factoryDefault)?.messages[key] || key;
        default:
          return key;
      }
    },
    getAllLocales: (state) => {
      return state.localesWithSettings;
    },
    getCurrentLocaleId: (state) => {
      return state.fastSettings.currentLocaleId;
    },
    getDefaultLocaleId: (state) => {
      return state.fastSettings.factoryDefault;
    },
    getFallBackLocaleIds: (state) => {
      return [state.fastSettings.fallBackLocale1, state.fastSettings.fallBackLocale2];
    },
    getMessagesByLocaleId: (state) => (localeId: string): {[key: string]: string;} => {
      return state.allLocaleMessages.find((id) => id.locale.id === localeId)?.messages || {};
    },
    getLocaleMessagesByLocaleId: (state) => (localeId: string): ILocaleMessages => {
      return state.allLocaleMessages.find((id) => id.locale.id === localeId) || { locale: { id: '', name: '', text_direction: '' }, messages: {} };
    },
    checkIfLocaleExists: (state) => (localeWithMessages: ILocaleMessages):
    ILocaleWithSettings[] => {
      return state.localesWithSettings.filter((l) => l.id === localeWithMessages.locale.id || l.name === localeWithMessages.locale.name);
    },
    getDefaultLocaleMessages: (state) :ILocaleMessages => {
      return state.allLocaleMessages.find((id) => id.locale.id === state.fastSettings.factoryDefault) || { locale: { id: '', name: '', text_direction: '' }, messages: {} };
    },
    getDummyLocaleMessages: (state) => {
      return { locale: { id: '', name: '', text_direction: '' }, messages: {} };
    }
  },
  actions: {
    async fetchLocaleSettingsAndMessages(): Promise<void> {
      this.isLoading = true;
      this.localesWithSettings = await utils.data.fetchEntry(constants.storage.FG_LOCALES_SETTINGS) as ILocaleWithSettings[];
      this.fastSettings = {
        currentLocaleId: this.localesWithSettings.some((l) => l.isCurrent) ? this.localesWithSettings.find((l) => l.isCurrent)?.id || this.fastSettings.currentLocaleId : this.fastSettings.currentLocaleId,
        buildInLocaleIds: this.localesWithSettings.filter((l) => l.isBuiltIn).map((l) => l.id) || this.fastSettings.buildInLocaleIds,
        factoryDefault: this.localesWithSettings.some((l) => l.isFactoryDefault) ? this.localesWithSettings.find((l) => l.isFactoryDefault)?.id || this.fastSettings.factoryDefault : this.fastSettings.factoryDefault,
        fallBackLocale1: this.localesWithSettings.some((l) => l.isFallback1) ? this.localesWithSettings.find((l) => l.isFallback1)?.id || this.fastSettings.fallBackLocale1 : this.fastSettings.fallBackLocale1,
        fallBackLocale2: this.localesWithSettings.some((l) => l.isFallback2) ? this.localesWithSettings.find((l) => l.isFallback2)?.id || this.fastSettings.fallBackLocale2 : this.fastSettings.fallBackLocale2
      };
      this.allLocaleMessages = await utils.data.fetchList(constants.storage.FG_LOCALES_MESSAGES);
      this.isLoading = false;
    },
    async addNewLocale(iLocaleMessages: ILocaleMessages): Promise<void> {
      this.isLoading = true;
      if (this.localesWithSettings.some((l) => l.id === iLocaleMessages.locale.id)) {
        this.isLoading = false;
        return;
      }
      this.localesWithSettings.push({ id: iLocaleMessages.locale.id, name: iLocaleMessages.locale.name, text_direction: iLocaleMessages.locale.text_direction, isBuiltIn: false, isCurrent: false, isFactoryDefault: false, isFallback1: false, isFallback2: false });
      await this.saveLocaleSettings();
      this.allLocaleMessages.push(iLocaleMessages);
      await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, this.allLocaleMessages);
      this.isLoading = false;
    },
    async switchLocale(newLocaleId: string): Promise<void> {
      this.isLoading = true;
      if (!this.localesWithSettings.some((l) => l.id === newLocaleId)) {
        this.isLoading = false;
        return;
      }
      this.fastSettings.currentLocaleId = newLocaleId;
      this.localesWithSettings.forEach((l) => {
        if (l.isCurrent = true) {
          l.isCurrent = false;
        }
      });
      this.localesWithSettings.forEach((l) => {
        if (l.id === newLocaleId) {
          l.isCurrent = true;
        }
      });
      await this.saveLocaleSettings();
    },
    async setFallback1(newFallback1Id: string): Promise<void> {
      this.isLoading = true;
      if (!this.localesWithSettings.some((l) => l.id === newFallback1Id)) {
        this.isLoading = false;
        return;
      }
      this.fastSettings.fallBackLocale1 = newFallback1Id;
      this.localesWithSettings.forEach((l) => {
        if (l.isFallback1 = true) {
          l.isFallback1 = false;
        }
      });
      this.localesWithSettings.forEach((l) => {
        if (l.id === newFallback1Id) {
          l.isFallback1 = true;
        }
      });
      await this.saveLocaleSettings();
    },
    async setFallback2(newFallback2Id: string): Promise<void> {
      this.isLoading = true;
      if (!this.localesWithSettings.some((l) => l.id === newFallback2Id)) {
        this.isLoading = false;
        return;
      }
      this.localesWithSettings.forEach((l) => {
        if (l.isFallback2 = true) {
          l.isFallback2 = false;
        }
      });
      this.localesWithSettings.forEach((l) => {
        if (l.id === newFallback2Id) {
          l.isFallback2 = true;
        }
      });
      await this.saveLocaleSettings();
    },
    async resetBackToFactoryDefault(): Promise<void> {
      await this.switchLocale(this.fastSettings.factoryDefault);
      await this.setFallback1(this.fastSettings.factoryDefault);
      await this.setFallback2(this.fastSettings.factoryDefault);
    },
    async saveLocaleSettings(): Promise<void> {
      this.isLoading = true;
      await utils.data.saveList(constants.storage.FG_LOCALES_SETTINGS, this.localesWithSettings);
      this.isLoading = false;
    },
    async deleteLocale(localeId: string): Promise<void> {
      this.isLoading = true;
      if (this.localesWithSettings.some((l) => l.id === localeId)) {
        this.localesWithSettings = this.localesWithSettings.filter((l) => l.id !== localeId);
        await this.saveLocaleSettings();
      }
      if (this.allLocaleMessages.some((l) => l.locale.id === localeId)) {
        this.allLocaleMessages = this.allLocaleMessages.filter((l) => l.locale.id !== localeId);
        await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, this.allLocaleMessages);
      }
      this.isLoading = false;
    },
    //duplicate and rename the id and name of the locale and assing new ids and also by renaming add a number to the end of the name name (number) use the uniname lis utilities and to the id just add idnumer ex en1 en2
    async duplicateLocale(localeId: string): Promise<void> {
      this.isLoading = true;
      if (this.localesWithSettings.some((l) => l.id === localeId)) {
        const localeToDuplicate = this.localesWithSettings.find((l) => l.id === localeId);
        if (!localeToDuplicate) {
          this.isLoading = false;
          return;
        }
        const newLocaleId = `${localeToDuplicate.id}_${utils.unique.generateNumberForDuplicatesByField(this.localesWithSettings, 'id', localeToDuplicate.id)}`;
        const newLocaleName = `${localeToDuplicate.name} (${utils.unique.generateNumberForDuplicatesByField(this.localesWithSettings, 'name', localeToDuplicate.name)})`;
        this.localesWithSettings.push({ id: newLocaleId, name: newLocaleName, text_direction: localeToDuplicate?.text_direction || 'ltr', isBuiltIn: false, isCurrent: false, isFactoryDefault: false, isFallback1: false, isFallback2: false });
        await this.saveLocaleSettings();
        const newMessages = this.allLocaleMessages.find((l) => l.locale.id === localeId);
        if (newMessages) {
          this.allLocaleMessages.push({ locale: { id: newLocaleId, name: newLocaleName, text_direction: localeToDuplicate?.text_direction || 'ltr' }, messages: newMessages.messages });
          await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, this.allLocaleMessages);
        }
      }
      this.isLoading = false;
    },
    async updateLocaleMessages(localeId: string, localeName: string, localeMessages: ILocaleMessages): Promise<void> {
      this.isLoading = true;
      if (this.localesWithSettings.some((l) => l.id === localeId && l.name === localeName)) {
        this.allLocaleMessages = this.allLocaleMessages.map((l) => {
          if (l.locale.id === localeId && l.locale.name === localeName) {
            l.locale = localeMessages.locale;
            l.messages = localeMessages.messages;
          }
          return l;
        });
        await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, this.allLocaleMessages);
      }
      this.isLoading = false;
    }
  }
});
