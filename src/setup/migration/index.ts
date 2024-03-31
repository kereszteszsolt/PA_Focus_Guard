//migration scripts from 1.0.4 to 2.0.1
import * as oldConstants from './oldContants';
import { IAppData, IWebsiteRule, IWebsiteRuleList } from '@/interfaces';
import * as constants from '@/constants';
import * as utils from '@/utils';
import * as unique from '@/utils/unique';
import * as initialize from '@/setup/initialize';

export const migrate = async () => {
  //remove unusedVariables from versions 1.0.0 - 1.0.3
  await chrome.storage.sync.remove(oldConstants.FG_ACTIVE);
  await chrome.storage.sync.remove(oldConstants.FG_BLOCKED_ELEMENTS_ON_WEBSITES);

  //migrate appData and locales from versions 1.0.4 - 2.0.1
  chrome.storage.sync.get(oldConstants.FG_APP_DATA, async (result) => {
    if (result[oldConstants.FG_APP_DATA]) {
      let oldData = JSON.parse(result[oldConstants.FG_APP_DATA]);
      console.log('oldData', oldData);
      if (oldData) {
        let newData: IAppData = {
          focusMode: oldData.focusMode || false,
          version: chrome.runtime.getManifest().version,
          fgTheme: 'fgLightTheme',
          itemsPerPage: 7,
          focusModeSessionId: oldData.focusMode ? utils.unique.generateUniqueUUIDByField([], 'focusModeSessionId') : constants.common.NOT_APPLICABLE
        };
        await utils.data.saveEntry(constants.storage.FG_APP_DATA, newData);
        await initialize.locales.initLocaleSettingsAndMessages(oldData.fgLanguage || 'english');
      }
    } else {
      await initialize.appData.initDefaultAppData();
      await initialize.locales.initLocaleSettingsAndMessages('english');
    }
  });
  //remove old appData
  await chrome.storage.sync.remove(oldConstants.FG_APP_DATA);

  //migrateWebsiteRules from versions 1.0.4 - 2.0.1
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
  //migrate blockedByDomain from versions 1.0.4 - 2.0.1
  chrome.storage.sync.get(oldConstants.FG_BLOCKED_WEBSITES_BY_DOMAIN, (result) => {
      if (result[oldConstants.FG_BLOCKED_WEBSITES_BY_DOMAIN]) {
        let oldData = JSON.parse(result[oldConstants.FG_BLOCKED_WEBSITES_BY_DOMAIN]);
        console.log('oldData', oldData);
        if (oldData) {
          for (let i = 0; i < oldData.length; i++) {
            let wsRule: IWebsiteRule = {
              id: unique.generateUniqueListId(allWebsites),
              urlFilter: oldData[i].url,
              listId: wsRuleList_01.id,
              permanentlyActive: oldData[i].isPermanentlyBlocked || false,
              temporarilyInactive: oldData[i].isDisabled || false,
              localOrder: i,
              globalOrder: globalOrder++,
              urlFilterType: constants.wsrFilter.DOMAIN
            };
            allWebsites.push(wsRule);
          }
        }
      }
    }
  );
  //remove old blockedByDomain
  await chrome.storage.sync.remove(oldConstants.FG_BLOCKED_WEBSITES_BY_DOMAIN);
  //migrate blockedByUrl from versions 1.0.4 - 2.0.1
  chrome.storage.sync.get(oldConstants.FG_BLOCKED_WEBSITES_BY_URL, (result) => {
    if (result[oldConstants.FG_BLOCKED_WEBSITES_BY_URL]) {
      let oldData = JSON.parse(result[oldConstants.FG_BLOCKED_WEBSITES_BY_URL]);
      console.log('oldData', oldData);
      if (oldData) {
        for (let i = 0; i < oldData.length; i++) {
          let wsRule: IWebsiteRule = {
            id: unique.generateUniqueListId(allWebsites),
            urlFilter: oldData[i].url,
            listId: wsRuleList_02.id,
            permanentlyActive: oldData[i].isPermanentlyBlocked || false,
            temporarilyInactive: oldData[i].isDisabled || false,
            localOrder: i,
            globalOrder: globalOrder++,
            urlFilterType: constants.wsrFilter.URL
          };
          allWebsites.push(wsRule);
        }
      }
    }
  });
  //remove old blockedByUrl
  await chrome.storage.sync.remove(oldConstants.FG_BLOCKED_WEBSITES_BY_URL);

  //save new website rules
  if (allWebsites.length !== 0) {
    await utils.data.saveList<IWebsiteRule>(constants.storage.FG_WEBSITE_RULES, allWebsites);
  } else {
    //rollback unused website rule lists
    await utils.data.saveList<IWebsiteRuleList>(constants.storage.FG_WEBSITE_RULE_LISTS, []);
    //init default website rules & lists
    await initialize.websiteRules.initDefaultWebsites();
  }

  //init default statistics
  await initialize.statistics.initDefaultStatistics();
};
