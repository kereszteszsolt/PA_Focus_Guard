import { defineStore } from 'pinia';
import * as utils from '@/utils';
import { ILocaleMessages, ILocaleSettings } from '@/interfaces';
import * as constants from '@/constants';
import * as restricted from '@/_locales/restricted';
import { generateNumberForDuplicatesByField } from '@/utils/unique';
import { allFilesReady } from '@crxjs/vite-plugin';
import * as util from 'util';

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
      {
        id: '00000000-0000-000-0000-000000000001',
        localeId: 'en',
        localeName: 'English',
        text_direction: 'ltr',
        isBuiltIn: true,
        isCurrent: true,
        isFactoryDefault: true
      },
      {
        id: '00000000-0000-000-0000-000000000002',
        localeId: 'hu',
        localeName: 'Magyar',
        text_direction: 'ltr',
        isBuiltIn: true,
        isCurrent: false,
        isFactoryDefault: false
      },
      {
        id: '00000000-0000-000-0000-000000000003',
        localeId: 'de',
        localeName: 'Deutsch',
        text_direction: 'ltr',
        isBuiltIn: true,
        isCurrent: false,
        isFactoryDefault: false
      },
      {
        id: '00000000-0000-000-0000-000000000004',
        localeId: 'ro',
        localeName: 'Română',
        text_direction: 'ltr',
        isBuiltIn: true,
        isCurrent: false,
        isFactoryDefault: false
      }
    ] as ILocaleSettings[],
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
    getRestrictedTranslation: (state) => (key: string): string => {
      return restricted.t.getTranslation(key, state.fastSettings.currentLocaleId === 'hu' ? 'hu' : 'en');
    },
    getAllLocales: (state) => {
      return state.localesWithSettings;
    },
    getAllLocaleMessages: (state) => {
      return state.allLocaleMessages;
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
    getMessagesByLocaleId: (state) => (localeId: string): { [key: string]: string; } => {
      return state.allLocaleMessages.find((id) => id.locale.id === localeId)?.messages || {};
    },
    getLocaleMessagesByLocaleId: (state) => (localeId: string): ILocaleMessages => {
      return state.allLocaleMessages.find((id) => id.locale.id === localeId) || {
        id: '',
        lsId: '',
        locale: { id: '', name: '', text_direction: '' },
        messages: {}
      };
    },
    getLocaleMessagesById: (state) => (id: string): ILocaleMessages | undefined => {
      return state.allLocaleMessages.find((l) => l.lsId === id) || undefined;
    },
    checkIfLocaleExists: (state) => (localeWithMessages: ILocaleMessages): string => {
      let resultsLS = state.localesWithSettings.filter((l) => l.localeId === localeWithMessages.locale.id || l.localeName === localeWithMessages.locale.name);
      let resultsLM = state.allLocaleMessages.filter((l) => l.locale.id === localeWithMessages.locale.id || l.locale.name === localeWithMessages.locale.name);
      if (localeWithMessages?.id && localeWithMessages?.lsId) {
        resultsLS = resultsLS.filter((l) => l.id !== localeWithMessages.lsId);
        resultsLM = resultsLM.filter((l) => l.lsId !== localeWithMessages.lsId);
      }
      let results = '';
      if (resultsLS.length === resultsLM.length) {
        results = resultsLS.map((l) => l.localeId + ' - ' + l.localeName).join(', ');
      } else {
        results = resultsLS.map((l) => l.localeId + ' - ' + l.localeName).join(', ');
        results += resultsLM.map((l) => l.locale.id + ' - ' + l.locale.name).join(', ');
      }
      return results;
    },
    getDefaultLocaleMessages: (state): ILocaleMessages | undefined => {
      let result = state.allLocaleMessages.find((lm) => lm.locale.id === state.fastSettings.factoryDefault);
      return result || state.allLocaleMessages.length > 0 ? state.allLocaleMessages[0] : undefined;
    },
    getDummyLocaleMessages: (state) => {
      return { id: '', lsId: '', locale: { id: '', name: '', text_direction: '' }, messages: {} };
    }
  },
  actions: {
    async fetchLocaleSettingsAndMessages(): Promise<void> {
      this.isLoading = true;
      this.localesWithSettings = await utils.data.fetchEntry(constants.storage.FG_LOCALES_SETTINGS) as ILocaleSettings[];
      this.fastSettings = {
        currentLocaleId: this.localesWithSettings.some((l) => l.isCurrent) ? this.localesWithSettings.find((l) => l.isCurrent)?.localeId || this.fastSettings.currentLocaleId : this.fastSettings.currentLocaleId,
        buildInLocaleIds: this.localesWithSettings.filter((l) => l.isBuiltIn).map((l) => l.localeId) || this.fastSettings.buildInLocaleIds,
        factoryDefault: this.localesWithSettings.some((l) => l.isFactoryDefault) ? this.localesWithSettings.find((l) => l.isFactoryDefault)?.localeId || this.fastSettings.factoryDefault : this.fastSettings.factoryDefault,
        fallBackLocale1: this.localesWithSettings.some((l) => l.isFallback1) ? this.localesWithSettings.find((l) => l.isFallback1)?.localeId || this.fastSettings.fallBackLocale1 : this.fastSettings.fallBackLocale1,
        fallBackLocale2: this.localesWithSettings.some((l) => l.isFallback2) ? this.localesWithSettings.find((l) => l.isFallback2)?.localeId || this.fastSettings.fallBackLocale2 : this.fastSettings.fallBackLocale2
      };
      this.allLocaleMessages = await utils.data.fetchList(constants.storage.FG_LOCALES_MESSAGES);
      this.isLoading = false;
    },
    async addNewLocale(iLocaleMessages: ILocaleMessages): Promise<void> {
      this.isLoading = true;
      if (this.localesWithSettings.some((l) => l.localeId === iLocaleMessages.locale.id)) {
        this.isLoading = false;
        return;
      }
      let newLSUUID = utils.unique.generateUniqueListId(this.localesWithSettings);
      this.localesWithSettings.push({
        id: newLSUUID,
        localeId: iLocaleMessages.locale.id,
        localeName: iLocaleMessages.locale.name,
        text_direction: iLocaleMessages.locale.text_direction,
        isBuiltIn: false,
        isCurrent: false,
        isFactoryDefault: false,
        isFallback1: false,
        isFallback2: false
      });
      await this.saveLocaleSettings();
      let newLMUUID = utils.unique.generateUniqueListId(this.allLocaleMessages);
      iLocaleMessages.id = newLMUUID;
      iLocaleMessages.lsId = newLSUUID;
      this.allLocaleMessages.push(iLocaleMessages);
      await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, this.allLocaleMessages);
      this.isLoading = false;
    },
    async switchLocale(newLocaleId: string): Promise<void> {
      this.isLoading = true;
      if (!this.localesWithSettings.some((l) => l.localeId === newLocaleId)) {
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
        if (l.localeId === newLocaleId) {
          l.isCurrent = true;
        }
      });
      await this.saveLocaleSettings();
    },
    async setCurrentAndFallbacks(newCurrentLocaleId: string, newFallback1Id: string, newFallback2Id: string): Promise<void> {
      this.isLoading = true;
      let currentLocale = this.localesWithSettings.find((l) => l.localeId === newCurrentLocaleId);
      let fallback1 = this.localesWithSettings.find((l) => l.localeId === newFallback1Id);
      let fallback2 = this.localesWithSettings.find((l) => l.localeId === newFallback2Id);

      if (!currentLocale || !fallback1 || !fallback2) {
        this.isLoading = false;
        return;
      }
      this.fastSettings.currentLocaleId = currentLocale.localeId;
      currentLocale.isCurrent = true;
      this.fastSettings.fallBackLocale1 = fallback1.localeId;
      fallback1.isFallback1 = true;
      this.fastSettings.fallBackLocale2 = fallback2.localeId;
      fallback2.isFallback2 = true;
      await this.saveLocaleSettings();
    },
    async setFallback1(newFallback1Id: string): Promise<void> {
      this.isLoading = true;
      if (!this.localesWithSettings.some((l) => l.localeId === newFallback1Id)) {
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
        if (l.localeId === newFallback1Id) {
          l.isFallback1 = true;
        }
      });
      await this.saveLocaleSettings();
    },
    async setFallback2(newFallback2Id: string): Promise<void> {
      this.isLoading = true;
      if (!this.localesWithSettings.some((l) => l.localeId === newFallback2Id)) {
        this.isLoading = false;
        return;
      }
      this.localesWithSettings.forEach((l) => {
        if (l.isFallback2 = true) {
          l.isFallback2 = false;
        }
      });
      this.localesWithSettings.forEach((l) => {
        if (l.localeId === newFallback2Id) {
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
    async deleteLocale(id: string): Promise<void> {
      this.isLoading = true;

      const localeToDelete = this.localesWithSettings.find((l) => l.id === id);
      if (!localeToDelete) {
        this.isLoading = false;
        return;
      }

      switch (true) {
        case (localeToDelete.localeId === this.fastSettings.currentLocaleId) &&
        (localeToDelete.localeId === this.fastSettings.fallBackLocale1) &&
        (localeToDelete.localeId === this.fastSettings.fallBackLocale2):
          await this.setCurrentAndFallbacks(this.fastSettings.factoryDefault, this.fastSettings.factoryDefault, this.fastSettings.factoryDefault);
          break;
        case (localeToDelete.localeId === this.fastSettings.currentLocaleId) &&
        (localeToDelete.localeId === this.fastSettings.fallBackLocale1) &&
        (localeToDelete.localeId !== this.fastSettings.fallBackLocale2):
          await this.setCurrentAndFallbacks(this.fastSettings.fallBackLocale2, this.fastSettings.fallBackLocale2, this.fastSettings.fallBackLocale2);
          break;
        case (localeToDelete.localeId === this.fastSettings.currentLocaleId) &&
        (localeToDelete.localeId !== this.fastSettings.fallBackLocale1) &&
        (localeToDelete.localeId !== this.fastSettings.fallBackLocale2):
          await this.setCurrentAndFallbacks(this.fastSettings.fallBackLocale1, this.fastSettings.fallBackLocale1, this.fastSettings.fallBackLocale2);
          break;
        case (localeToDelete.localeId !== this.fastSettings.currentLocaleId) &&
        (localeToDelete.localeId === this.fastSettings.fallBackLocale1) &&
        (localeToDelete.localeId === this.fastSettings.fallBackLocale2):
          await this.setCurrentAndFallbacks(this.fastSettings.currentLocaleId, this.fastSettings.currentLocaleId, this.fastSettings.currentLocaleId);
          break;
        case (localeToDelete.localeId !== this.fastSettings.currentLocaleId) &&
        (localeToDelete.localeId !== this.fastSettings.fallBackLocale1) &&
        (localeToDelete.localeId === this.fastSettings.fallBackLocale2):
          await this.setCurrentAndFallbacks(this.fastSettings.currentLocaleId, this.fastSettings.fallBackLocale1, this.fastSettings.fallBackLocale1);
          break;
        case (localeToDelete.localeId !== this.fastSettings.currentLocaleId) &&
        (localeToDelete.localeId === this.fastSettings.fallBackLocale1) &&
        (localeToDelete.localeId !== this.fastSettings.fallBackLocale2):
          await this.setCurrentAndFallbacks(this.fastSettings.currentLocaleId, this.fastSettings.currentLocaleId, this.fastSettings.fallBackLocale2);
          break;
        case (localeToDelete.localeId === this.fastSettings.currentLocaleId) &&
        (localeToDelete.localeId !== this.fastSettings.fallBackLocale1) &&
        (localeToDelete.localeId === this.fastSettings.fallBackLocale2):
          await this.setCurrentAndFallbacks(this.fastSettings.fallBackLocale1, this.fastSettings.currentLocaleId, this.fastSettings.fallBackLocale1);
          break;
      }

      //delete
      this.localesWithSettings = this.localesWithSettings.filter((l) => l.id !== id);
      this.allLocaleMessages = this.allLocaleMessages.filter((l) => l.lsId !== id);
      await utils.data.saveList(constants.storage.FG_LOCALES_SETTINGS, this.localesWithSettings);
      await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, this.allLocaleMessages);

      this.isLoading = false;
    },
    //duplicate and rename the id and name of the locale and assing new ids and also by renaming add a number to the end of the name name (number) use the uniname lis utilities and to the id just add idnumer ex en1 en2
    async duplicateLocale(id: string): Promise<void> {
      this.isLoading = true;
      if (this.localesWithSettings.some((l) => l.id === id)) {
        const localeToDuplicate = this.localesWithSettings.find((l) => l.id === id);
        if (!localeToDuplicate) {
          this.isLoading = false;
          return;
        }
        const newLocaleId = `${localeToDuplicate.localeId}_${utils.unique.generateNumberForDuplicatesByField(this.localesWithSettings, 'localeId', localeToDuplicate.localeId)}`;
        const newLocaleName = `${localeToDuplicate.localeName} (${utils.unique.generateNumberForDuplicatesByField(this.localesWithSettings, 'localeName', localeToDuplicate.localeName)})`;
        let newLSUUID = utils.unique.generateUniqueListId(this.localesWithSettings);
        this.localesWithSettings.push({
          id: newLSUUID,
          localeId: newLocaleId,
          localeName: newLocaleName,
          text_direction: localeToDuplicate?.text_direction || 'ltr',
          isBuiltIn: false,
          isCurrent: false,
          isFactoryDefault: false,
          isFallback1: false,
          isFallback2: false
        });
        await this.saveLocaleSettings();
        const newMessages = this.allLocaleMessages.find((l) => l.lsId === id);
        if (newMessages) {
          let newLMUUID = utils.unique.generateUniqueListId(this.allLocaleMessages);
          this.allLocaleMessages.push({
            id: newLMUUID,
            lsId: newLSUUID,
            locale: {
              id: newLocaleId,
              name: newLocaleName,
              text_direction: localeToDuplicate?.text_direction || 'ltr'
            },
            messages: newMessages.messages
          });
          await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, this.allLocaleMessages);
        }
      }
      this.isLoading = false;
    },
    async updateLocaleMessages(localeMessages: ILocaleMessages): Promise<void> {
      this.isLoading = true;
      if (this.localesWithSettings.some((l) => l.id === localeMessages.lsId)) {
        this.localesWithSettings.map((l) => {
          if (l.id === localeMessages.lsId) {
            l.localeId = localeMessages.locale.id;
            l.localeName = localeMessages.locale.name;
            l.text_direction = localeMessages.locale.text_direction;
          }
          return l;
        });
        await this.saveLocaleSettings();
        this.allLocaleMessages = this.allLocaleMessages.map((l) => {
          if (l.id === localeMessages.id) {
            l = localeMessages;
          }
          return l;
        });
        await utils.data.saveList(constants.storage.FG_LOCALES_MESSAGES, this.allLocaleMessages);
      }
      this.isLoading = false;
    }
  }
});
