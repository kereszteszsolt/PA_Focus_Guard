import { IAppData } from '@/interfaces';
import * as utils from '@/utils';
import * as constants from '@/constants';

export const initDefaultAppData = async () => {
  let data : IAppData = {
    focusMode: false,
    version: '0.0.0',
  };
  await utils.data.saveEntry(constants.storage.FG_APP_DATA, data);
}
