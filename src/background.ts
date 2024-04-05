import * as utils from '@/utils';
import * as constants from '@/constants';
import { IAppData } from '@/interfaces/IAppData';
import { IWebsiteRule, ITaskQueue, IDistractionAttempt, IWebsiteRuleList } from '@/interfaces';
import { install } from '@/setup/install';
import { update } from '@/setup/update';

let taskQueue: ITaskQueue[] = [];

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
      await applyRulesOnOpenTabs();
      utils.runtimeMessages.sendMessage('appDataUpdated', (response: string) => {
        // console.log(response);
      });
    }
    if (constants.storage.FG_WEBSITE_RULES in changes) {
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

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  await redirectOrAllow(details.tabId, details.url);
}, { url: [{ schemes: ['http', 'https'] }] });

chrome.webNavigation.onHistoryStateUpdated.addListener(async (details) => {
  await redirectOrAllow(details.tabId, details.url);
}, { url: [{ schemes: ['http', 'https'] }] });

const redirectOrAllow = async (tabId: number, url: string): Promise<void> => {
  if (url && tabId) {
    let fgAppData: IAppData = await utils.data.fetchEntry((constants.storage.FG_APP_DATA));

    let contextRules = await getContextRules(url);

    if (contextRules.length > 0) {

      taskQueue.push({
        id: utils.unique.generateUniqueListId(taskQueue),
        tabId: tabId,
        url: url,
        tabUpdatedTime: Date.now()
      });

      await saveDistractionAttempt(contextRules, fgAppData);
      await chrome.tabs.update(tabId, { url: '/options.html#/focus-message' });
    }
  }
};

export const applyRulesOnOpenTabs = async (): Promise<void> => {
  let fgWebsiteRules: IWebsiteRule[] = await utils.data.fetchList(constants.storage.FG_WEBSITE_RULES);
  let fgAppData: IAppData = await utils.data.fetchEntry((constants.storage.FG_APP_DATA));

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab: chrome.tabs.Tab) => {
      const itemsToBlock = fgWebsiteRules.filter((wr) => !wr.temporarilyInactive && (wr.permanentlyActive || fgAppData.focusMode));
      const extensionId = chrome.runtime.id;
      const extensionOptionsPath = `chrome-extension://${extensionId}/options.html#/`;
      itemsToBlock.forEach((item) => {
        if (tab.url && tab.url.includes(item.urlFilter) && tab.id && !tab.url.includes(extensionOptionsPath)) {
          chrome.tabs.update(tab.id, { url: '/options.html#/focus-message' });
        }
      });
    });
  });
};

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
