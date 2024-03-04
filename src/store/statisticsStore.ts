import { defineStore } from 'pinia';
import { IDistractionAttempt } from '@/interfaces';
import * as constants from '@/constants';
import * as utils from '@/utils';

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
    getNrOfDistractionAttempts: (state): number => {
      return state.distractionAttempts.length;
    },
    getNewUniqueFocusSessionId: (state): string => {
      return utils.unique.generateUniqueUUIDByField(state.distractionAttempts, 'focusModeSessionId');
    }
  },
  actions: {
    async fetchDistractionAttempts(): Promise<void> {
      this.isLoading = true;
      this.distractionAttempts = await utils.data.fetchEntry(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS) as IDistractionAttempt[];
      this.isLoading = false;
    },
    // async addNewDistractionAttempt(distractionAttempt: IDistractionAttempt): Promise<void> {
    //   console.log('Adding new distraction attempt');
    //   this.isLoading = true;
    //   distractionAttempt.id = utils.unique.generateUniqueListId(this.distractionAttempts);
    //   console.log(distractionAttempt);
    //  // this.distractionAttempts = await utils.data.fetchList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS) as IDistractionAttempt[];
    //   this.distractionAttempts.push(distractionAttempt);
    //   console.log(this.distractionAttempts);
    //   await utils.data.saveList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS, this.distractionAttempts);
    //   console.log('Distraction attempts saved');
    //   this.isLoading = false;
    // },
  }
});
