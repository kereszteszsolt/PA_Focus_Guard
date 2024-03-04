import * as utils from '@/utils';
import * as setup from '@/setup';
import * as constants from '@/constants';
import { IAppData } from '@/interfaces/IAppData';
import { IWebsiteRule, ITaskQueue, IDistractionAttempt } from '@/interfaces';
import * as scripts from '@/scripts';

let fgAppData: IAppData = {
  focusMode: false,
  version: chrome.runtime.getManifest().version,
  fgTheme: 'fgLightTheme',
  focusModeSessionId: constants.common.NOT_APPLICABLE
};
let fgWebsiteRules: IWebsiteRule[] = [];
let taskQueue: ITaskQueue[] = [];
let distractionAttempts: IDistractionAttempt[] = [];

chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('Runtime installed');
  switch (details.reason) {
    case 'install':
      console.log('Extension installed');
      await setup.initialize.locales.initLocaleSettingsAndMessages();
      await setup.initialize.appData.initDefaultAppData();
      await setup.initialize.websiteRules.initDefaultWebsites();
      await setup.initialize.statistics.initDefaultStatistics();
      break;
    case 'update':
      console.log('Extension updated');
      await readData();
      // await utils.initialize.locales.initLocaleSettingsAndMessages();
      // await utils.initialize.appData.initDefaultAppData();
      // await utils.initialize.websiteRules.initDefaultWebsites();
      // await utils.initialize.statistics.initDefaultStatistics();
      break;
    case 'chrome_update':
      console.log('Chrome updated');
      // await utils.initialize.locales.initLocaleSettingsAndMessages();
      // await utils.initialize.appData.initDefaultAppData();
      // await utils.initialize.websiteRules.initDefaultWebsites();
      // await utils.initialize.statistics.initDefaultStatistics();
      break;
  }
});

chrome.storage.onChanged.addListener(async function (changes, namespace) {
  if (namespace === 'local') {
    if (constants.storage.FG_APP_DATA in changes) {
      fgAppData = JSON.parse(changes[constants.storage.FG_APP_DATA].newValue);
      await scripts.background.applyRulesOnOpenTabs(fgAppData, fgWebsiteRules);
      console.log('Active rules', calculateActiveWebsiteRules());
      await setTheBadge();
    }
    if (constants.storage.FG_WEBSITE_RULES in changes) {
      fgWebsiteRules = JSON.parse(changes[constants.storage.FG_WEBSITE_RULES].newValue);
      await scripts.background.applyRulesOnOpenTabs(fgAppData, fgWebsiteRules);
      console.log('Active rules', calculateActiveWebsiteRules());
    }
    if (constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS in changes) {
      distractionAttempts = JSON.parse(changes[constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS].newValue);
      await setTheBadge();
    }
  }
});

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  console.log('Tab updated');
  await redirectOrAllow(details.tabId, details.url);
}, { url: [{ schemes: ['http', 'https'] }] });

chrome.webNavigation.onHistoryStateUpdated.addListener(async (details) => {
  console.log('onHistoryStateUpdated');
  await redirectOrAllow(details.tabId, details.url);
}, { url: [{ schemes: ['http', 'https'] }] });

const redirectOrAllow = async (tabId: number, url: string): Promise<void> => {
  if (url && tabId) {
    console.log('url', url);
    let activeRules = calculateActiveWebsiteRules();
    let contextRules = activeRules.filter((wr) => url && url.includes(wr.url));

    if (contextRules.length > 0) {
      console.log('Relevant tab');

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

chrome.runtime.onStartup.addListener(async () => {
  console.log('Runtime started');
  await readData();
});
const saveDistractionAttempt = async (items: IWebsiteRule[], appData: IAppData): Promise<void> => {
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
        urlFilter: item.url,
        permanentlyActive: item.permanentlyActive
      };
    })
  };
  distractionAttempts.push(distractionAttempt);
  await utils.data.saveList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS, distractionAttempts);
  console.log('Distraction attempt saved', distractionAttempt);
};

const calculateActiveWebsiteRules = (): IWebsiteRule[] => {
  return fgWebsiteRules.filter((wr) => !wr.temporarilyInactive && (wr.permanentlyActive || fgAppData.focusMode)) || [];
};

const readData = async () => {
  fgAppData = await utils.data.fetchEntry((constants.storage.FG_APP_DATA));
  fgWebsiteRules = await utils.data.fetchList(constants.storage.FG_WEBSITE_RULES);
  distractionAttempts = await utils.data.fetchList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS);
};

const setTheBadge = async () => {
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
