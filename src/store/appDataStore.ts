import { defineStore } from 'pinia';
import { IAppData } from '@/interfaces/IAppData';
import * as constants from '@/constants';
import * as utils from '@/utils';

export const useAppDataStore = defineStore('appData', {
  state: (): {
    isLoading: boolean,
    appData: IAppData,
  } => ({
    isLoading: true,
    appData: {
      focusMode: false,
      version: '0.0.0',
      fgTheme: 'fgLightTheme',
    },
  }),
  getters: {
    getAppData: (state) => {
      return state.appData;
    },
  },
  actions: {
    async fetchAppData(): Promise<void> {
      this.isLoading = true;
      this.appData = await utils.data.fetchEntry(constants.storage.FG_APP_DATA) as IAppData;
      this.isLoading = false;
    },
    async saveAppData(): Promise<void> {
      this.isLoading = true;
      await utils.data.saveEntry(constants.storage.FG_APP_DATA, this.appData);
      this.isLoading = false;
    },
    async updateFocusModeActive(value: boolean): Promise<void> {
      this.appData.focusMode = value;
      await this.saveAppData();
    },
    async updateFgTheme(theme: string): Promise<void> {
      this.appData.fgTheme = theme;
      await this.saveAppData();
    },
  },
});
