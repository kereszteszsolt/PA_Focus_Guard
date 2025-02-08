import * as utils from '@/utils';
import * as constants from '@/constants';
import { IAppData } from '@/interfaces/IAppData';
import { IDistractionAttempt, ITaskQueue, IWebsiteRule } from '@/interfaces';
import { install } from '@/setup/install';
import { update } from '@/setup/update';

chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('Runtime installed');
  switch (details.reason) {
    case 'install':
      console.log('Extension installed');
      await install();
      break;
    case 'update':
      console.log('Extension updated');
      await update();
      await setTheBadge();
      break;
    case 'chrome_update':
      console.log('Chrome updated');  // Chrome updated, Do nothing
      await setTheBadge();
      break;
  }
});

chrome.storage.onChanged.addListener(async function (changes, namespace) {
  if (namespace === 'local') {
    if (constants.storage.FG_APP_DATA in changes) {
      await setTheBadge();
      //await updateDynamicRules();
      await applyRulesOnOpenTabs();
      utils.runtimeMessages.sendMessage('appDataUpdated', (response: string) => {
        // console.log(response);
      });
    }
    if (constants.storage.FG_WEBSITE_RULES in changes) {
      //await updateDynamicRules();
      await applyRulesOnOpenTabs();
      utils.runtimeMessages.sendMessage('websiteRulesUpdated', (response: string) => {
        // console.log(response);
      });
    }
    if (constants.storage.FG_WEBSITE_RULE_LISTS in changes) {
      utils.runtimeMessages.sendMessage('websiteRuleListsUpdated', (response: string) => {
        //  console.log(response);
      });
    }
    if (constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS in changes) {
      await setTheBadge();
      utils.runtimeMessages.sendMessage('distractionAttemptsUpdated', (response: string) => {
        //  console.log(response);
      });
    }
    if (constants.storage.FG_LOCALES_SETTINGS in changes) {
      utils.runtimeMessages.sendMessage('localeSettingsUpdated', (response: string) => {
        //  console.log(response);
      });
    }
    if (constants.storage.FG_LOCALES_MESSAGES in changes) {
      utils.runtimeMessages.sendMessage('localeMessagesUpdated', (response: string) => {
        // console.log(response);
      });
    }
    utils.runtimeMessages.sendMessage('storageUpdated', (response: string) => {
      //  console.log(response);
    });
  }
});

chrome.webNavigation.onCommitted.addListener(async (details) => {
  await redirectOrAllow(details);
}, { url: [{ schemes: ['http', 'https'] }] });

chrome.webNavigation.onHistoryStateUpdated.addListener(async (details) => {
  await redirectOrAllow(details);
}, { url: [{ schemes: ['http', 'https'] }] });

const redirectOrAllow = async (details: chrome.webNavigation.WebNavigationTransitionCallbackDetails): Promise<void> => {
  if (details.frameType === 'outermost_frame') {
    let fgAppData: IAppData = await utils.data.fetchEntry((constants.storage.FG_APP_DATA));
    chrome.tabs.get(details.tabId, async (tab) => {
      await applyRulesOnTab(tab, fgAppData);
    });
  }
};

export const applyRulesOnOpenTabs = async (): Promise<void> => {
  chrome.tabs.query({}, async (tabs) => {
    for (const tab of tabs) {
      await applyRulesOnTab(tab);
    }
  });
};

export const applyRulesOnTab = async (tab: chrome.tabs.Tab, fgAppData?: IAppData): Promise<void> => {
  if (tab && tab.id && tab.url && checkTabUrl(tab.url)) {
    let contextRules = await getContextRules(tab.url);
    if (contextRules.length > 0) {
      if (fgAppData) {
        await saveDistractionAttempt(contextRules, fgAppData);
      }
      await chrome.tabs.update(tab.id, { url: '/options.html#/focus-message' });
    }
  }
};

export const checkTabUrl = (url: string): boolean => {
  return utils.string.notEmpty(url) && !url.startsWith('chrome://') && !url.startsWith('chrome-extension://');
};


// export const updateDynamicRules = async (): Promise<void> => {
//   const fgWebsiteRules: IWebsiteRule[] = await utils.data.fetchList(constants.storage.FG_WEBSITE_RULES);
//   const fgAppData: IAppData = await utils.data.fetchEntry(constants.storage.FG_APP_DATA);
//
//   const tabs = await chrome.tabs.query({});
//   const itemsToBlock = fgWebsiteRules.filter((wr) => !wr.temporarilyInactive && (wr.permanentlyActive || fgAppData.focusMode));
//
//   const extensionId = chrome.runtime.id;
//
//   const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
//   const oldRuleIds = oldRules.map(rule => rule.id);
//
//   const new_rules: any[] = [];
//
//   itemsToBlock.forEach((item, index) => {
//     new_rules.push(createFGRule(item.urlFilter, index + 1, extensionId, item.urlFilterType)); // Ensuring IDs start from 1
//   });
//
//   await chrome.declarativeNetRequest.updateDynamicRules({
//     removeRuleIds: oldRuleIds,
//     addRules: new_rules
//   });
// };
//
//
// const createFGRule = (filter: string, index: number, extensionId: string, matchType: string) => {
//   let urlFilter = '';
//   switch (matchType) {
//     case constants.wsrFilter.URL:
//       urlFilter = `|${filter}`;
//       break;
//     case constants.wsrFilter.DOMAIN:
//       urlFilter = `||${filter}/`;
//       break;
//     case constants.wsrFilter.END_DOMAIN:
//       urlFilter = filter;
//       break;
//     case constants.wsrFilter.KEYWORD:
//       urlFilter = filter;
//       break;
//     default:
//       urlFilter = filter;
//   }
//   return {
//     id: index,
//     priority: 1,
//     action: {
//       type: 'redirect',
//       redirect: {
//         url: `chrome-extension://${extensionId}/options.html#/focus-message`
//       }
//     },
//     condition: {
//       urlFilter: urlFilter,
//       resourceTypes: ['main_frame']
//     }
//   }
// }

chrome.runtime.onStartup.addListener(async () => {
  console.log('Runtime started');
  await setTheBadge();
});
const saveDistractionAttempt = async (items: IWebsiteRule[], appData: IAppData): Promise<void> => {
  let distractionAttempts: IDistractionAttempt[] = await utils.data.fetchList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS);
  if (items.length === 0) {
    return;
  }
  let distractionAttempt: IDistractionAttempt = {
    id: utils.unique.generateUniqueListId(distractionAttempts),
    dateTime: Date.now(),
    focusMode: appData.focusMode,
    focusModeSessionId: appData.focusModeSessionId,
    simpleRules: items.map((item) => {
      return {
        urlFilter: item.urlFilter,
        permanentlyActive: item.permanentlyActive
      };
    })
  };
  distractionAttempts.push(distractionAttempt);
  await utils.data.saveList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS, distractionAttempts);
};

const calculateActiveWebsiteRules = (fgWebsiteRules: IWebsiteRule[], fgAppData: IAppData): IWebsiteRule[] => {
  return fgWebsiteRules.filter((wr) => !wr.temporarilyInactive && (wr.permanentlyActive || fgAppData.focusMode)) || [];
};

const setTheBadge = async () => {
  let fgAppData: IAppData = await utils.data.fetchEntry((constants.storage.FG_APP_DATA));
  let distractionAttempts: IDistractionAttempt[] = await utils.data.fetchList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS);

  let badgeText = '';
  let badgeBackgroundColor = fgAppData.fgTheme === 'fgLightTheme' ? '#574513' : '#9c7e31';

  if (fgAppData.focusMode && fgAppData.focusModeSessionId !== constants.common.NOT_APPLICABLE) {
    let nrDistractionCrrSession = distractionAttempts.filter((da) =>
      da.focusModeSessionId === fgAppData.focusModeSessionId).length;
    badgeText = nrDistractionCrrSession === 0 ? '✓' : nrDistractionCrrSession.toString();
    badgeBackgroundColor = (nrDistractionCrrSession === 0) ?
      (fgAppData.fgTheme === 'fgLightTheme' ? '#4caf50' : '#66bb6a') :
      (fgAppData.fgTheme === 'fgLightTheme' ? '#f44336' : '#ef5350');

  }
  await chrome.action.setBadgeText({ text: badgeText });
  await chrome.action.setBadgeBackgroundColor({ color: badgeBackgroundColor });
  await chrome.action.setBadgeTextColor({ color: '#f5f5f5' });
};

const getContextRules = async (crrUrl: string): Promise<IWebsiteRule[]> => {
  let fgWebsiteRules: IWebsiteRule[] = await utils.data.fetchList(constants.storage.FG_WEBSITE_RULES);
  let fgAppData: IAppData = await utils.data.fetchEntry((constants.storage.FG_APP_DATA));

  let activeRules = calculateActiveWebsiteRules(fgWebsiteRules, fgAppData);
  return activeRules.filter((wr) => {
    if (!crrUrl) return false;
    switch (wr.urlFilterType) {
      case constants.wsrFilter.URL:
        return utils.urlFilter.filterByUrl(crrUrl, wr.urlFilter);
      case constants.wsrFilter.DOMAIN:
        return utils.urlFilter.filterByDomain(crrUrl, wr.urlFilter);
      case constants.wsrFilter.END_DOMAIN:
        return utils.urlFilter.filterByEndDomain(crrUrl, wr.urlFilter);
      case constants.wsrFilter.KEYWORD:
        return utils.urlFilter.filterByKeyWord(crrUrl, wr.urlFilter);
      default:
        return false;
    }
  });
};
