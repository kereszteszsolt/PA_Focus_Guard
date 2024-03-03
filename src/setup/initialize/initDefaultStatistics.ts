import { IDistractionAttempt } from '@/interfaces';
import * as constants from '@/constants';
import * as utils from '@/utils';

export const initDefaultStatistics = async () => {
  let distractionAttempts: IDistractionAttempt[] = [];
  await utils.data.saveList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS, distractionAttempts);
};
