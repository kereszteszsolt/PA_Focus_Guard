//migration scripts from 1.0.4 to 2.0.0
import * as oldConstants from './oldContants';
import { loadData } from '@/setup/migration/oldUtils';
import { IAppData, IWebsiteRule, IWebsiteRuleList } from '@/interfaces';
import * as constants from '@/constants';
import * as utils from '@/utils';
import * as unique from '@/utils/unique';
import * as initialize from '@/setup/initialize';

export const migrate = async () => {
  //remove unusedVariables from versions 1.0.0 - 1.0.3
  await chrome.storage.sync.remove(oldConstants.FG_ACTIVE);
  await chrome.storage.sync.remove(oldConstants.FG_BLOCKED_ELEMENTS_ON_WEBSITES);

  //migrate appData and locales from versions 1.0.4 - 2.0.0
  await loadData(oldConstants.FG_APP_DATA).then(async (oldData: any) => {
    let newData: IAppData = {
      focusMode: oldData.focusMode || false,
      version: chrome.runtime.getManifest().version,
      fgTheme: 'fgLightTheme',
      itemsPerPage: 7,
      focusModeSessionId: constants.common.NOT_APPLICABLE
    };
    await utils.data.saveEntry(constants.storage.FG_APP_DATA, newData);
    await initialize.locales.initLocaleSettingsAndMessages(oldData?.fgLanguage || 'english');
  });
  //remove old appData
  await chrome.storage.sync.remove(oldConstants.FG_APP_DATA);

  //migrateWebsiteRules from versions 1.0.4 - 2.0.0
  let listOfLists: IWebsiteRuleList[] = [];
  let wsRuleList_01: IWebsiteRuleList = {
    id: unique.generateUniqueListId(listOfLists),
    name: 'By Domain',
    order: 0
  };
  listOfLists.push(wsRuleList_01);
  let wsRuleList_02: IWebsiteRuleList = {
    id: unique.generateUniqueListId(listOfLists),
    name: 'By Url',
    order: 1
  };
  listOfLists.push(wsRuleList_02);
  await utils.data.saveList<IWebsiteRuleList>(constants.storage.FG_WEBSITE_RULE_LISTS, listOfLists);

  let allWebsites: IWebsiteRule[] = [];
  let globalOrder = 0;
  //migrate blockedByDomain from versions 1.0.4 - 2.0.0
  await loadData(oldConstants.FG_BLOCKED_WEBSITES_BY_DOMAIN).then(async (oldData: any) => {
      for (let i = 0; i < oldData.length; i++) {
        let wsRule: IWebsiteRule = {
          id: unique.generateUniqueListId(allWebsites),
          urlFilter: oldData[i].urlFilter,
          listId: wsRuleList_01.id,
          permanentlyActive: oldData[i].permanentlyActive || false,
          temporarilyInactive: oldData[i].temporarilyInactive || false,
          localOrder: i,
          globalOrder: globalOrder++,
          urlFilterType: constants.wsrFilter.DOMAIN
        };
        allWebsites.push(wsRule);
      }
    }
  );
  //remove old blockedByDomain
  await chrome.storage.sync.remove(oldConstants.FG_BLOCKED_WEBSITES_BY_DOMAIN);
  //migrate blockedByUrl from versions 1.0.4 - 2.0.0
  await loadData(oldConstants.FG_BLOCKED_WEBSITES_BY_URL).then(async (oldData: any) => {
    for (let i = 0; i < oldData.length; i++) {
      let wsRule: IWebsiteRule = {
        id: unique.generateUniqueListId(allWebsites),
        urlFilter: oldData[i].urlFilter,
        listId: wsRuleList_02.id,
        permanentlyActive: oldData[i].permanentlyActive || false,
        temporarilyInactive: oldData[i].temporarilyInactive || false,
        localOrder: i,
        globalOrder: globalOrder++,
        urlFilterType: constants.wsrFilter.URL
      };
      allWebsites.push(wsRule);
    }
  });
  //remove old blockedByUrl
  await chrome.storage.sync.remove(oldConstants.FG_BLOCKED_WEBSITES_BY_URL);
  //save new website rules
  await utils.data.saveList<IWebsiteRule>(constants.storage.FG_WEBSITE_RULES, allWebsites);

  //init default statistics
  await initialize.statistics.initDefaultStatistics();
};
