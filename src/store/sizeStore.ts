import { defineStore } from 'pinia';
import * as constants from '@/constants';
import * as utils from '@/utils';

export const useSizeStore = defineStore({
  id: 'size',
  state: (): {
    isLoading: boolean,
    appDataSize: number,
    websiteRulesSize: number,
    websiteRuleListsSize: number,
    statisticsSize: number,
    localeSettingsSize: number,
    localeMessagesSize: number,
  } => ({
    isLoading: true,
    appDataSize: 0,
    websiteRulesSize: 0,
    websiteRuleListsSize: 0,
    statisticsSize: 0,
    localeSettingsSize: 0,
    localeMessagesSize: 0,
  }),
  getters: {
    getAppDataSize: (state) => {
      return state.appDataSize;
    },
    getWebsiteRulesSize: (state) => {
      return state.websiteRulesSize;
    },
    getWebsiteRuleListsSize: (state) => {
      return state.websiteRuleListsSize;
    },
    getStatisticsSize: (state) => {
      return state.statisticsSize;
    },
    getLocaleSettingsSize: (state) => {
      return state.localeSettingsSize;
    },
    getLocaleMessagesSize: (state) => {
      return state.localeMessagesSize;
    },
    getTotalSize: (state) => {
      return state.appDataSize + state.websiteRulesSize + state.websiteRuleListsSize + state.statisticsSize + state.localeSettingsSize + state.localeMessagesSize;
    }
  },
  actions: {
    async fetchAllSizes(): Promise<void> {
      await Promise.all([
        this.fetchAppDataSize(),
        this.fetchWebsiteRulesSize(),
        this.fetchWebsiteRuleListsSize(),
        this.fetchStatisticsSize(),
        this.fetchLocaleSettingsSize(),
        this.fetchLocaleMessagesSize()
      ]);
    },
    async fetchAppDataSize(): Promise<void> {
      this.isLoading = true;
      this.appDataSize = await utils.data.readSize(constants.storage.FG_APP_DATA);
      this.isLoading = false;
    },
    async fetchWebsiteRulesSize(): Promise<void> {
      this.isLoading = true;
      this.websiteRulesSize = await utils.data.readSize(constants.storage.FG_WEBSITE_RULES);
      this.isLoading = false;
    },
    async fetchWebsiteRuleListsSize(): Promise<void> {
      this.isLoading = true;
      this.websiteRuleListsSize = await utils.data.readSize(constants.storage.FG_WEBSITE_RULE_LISTS);
      this.isLoading = false;
    },
    async fetchStatisticsSize(): Promise<void> {
      this.isLoading = true;
      this.statisticsSize = await utils.data.readSize(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS);
      this.isLoading = false;
    },
    async fetchLocaleSettingsSize(): Promise<void> {
      this.isLoading = true;
      this.localeSettingsSize = await utils.data.readSize(constants.storage.FG_LOCALES_SETTINGS);
      this.isLoading = false;
    },
    async fetchLocaleMessagesSize(): Promise<void> {
      this.isLoading = true;
      this.localeMessagesSize = await utils.data.readSize(constants.storage.FG_LOCALES_MESSAGES);
      this.isLoading = false;
    },
  }
});
