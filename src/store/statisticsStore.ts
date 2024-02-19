import { defineStore } from 'pinia';
import { IDistractionAttempt } from '@/interfaces';
import * as constants from '@/constants';
import * as utils from '@/utils';
import { FG_STATISTICS_DISTRACTION_ATTEMPTS } from '@/constants/localStorage';

export const useStatisticsStore = defineStore({
  id: 'statistics',
  state: (): {
    isLoading: boolean,
    distractionAttempts: IDistractionAttempt[],
  } => ({
    isLoading: true,
    distractionAttempts: []
  }),
  getters: {
    getDistractionAttempts: (state): IDistractionAttempt[] => {
      return state.distractionAttempts;
    },
    getNrOfDistractionAttemptsByLatestHours: (state) => (hours: number): number => {
      const latestTimestamp = new Date().getTime() - hours * 60 * 60 * 1000;
      return state.distractionAttempts.filter((attempt) => attempt.dateTimestamp > latestTimestamp).length;
    },
    getNrOfDistractionAttemptsByLatestDays: (state) => (days: number): number => {
      const latestTimestamp = new Date().getTime() - days * 24 * 60 * 60 * 1000;
      return state.distractionAttempts.filter((attempt) => attempt.dateTimestamp > latestTimestamp).length;
    },
  },
  actions: {
    async fetchDistractionAttempts(): Promise<void> {
      this.isLoading = true;
      this.distractionAttempts = await utils.data.fetchEntry(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS) as IDistractionAttempt[];
      this.isLoading = false;
    },
    async addNewDistractionAttempt(distractionAttempt: IDistractionAttempt): Promise<void> {
      this.isLoading = true;
      this.distractionAttempts.push(distractionAttempt);
      await utils.data.saveEntry(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS, this.distractionAttempts);
      this.isLoading = false;
    },
  }
});
