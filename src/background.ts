import * as utils from '@/utils';
import * as constants from '@/constants';
import { IAppData } from '@/interfaces/IAppData';
import { IWebsiteRule, ITaskQueue, IDistractionAttempt } from '@/interfaces';
import * as scripts from '@/scripts';

let fgAppData: IAppData = {
  focusMode: false,
  version: chrome.runtime.getManifest().version,
  fgTheme: 'fgLightTheme'
};
let fgWebsiteRules: IWebsiteRule[] = [];
let taskQueue: ITaskQueue[] = [];
let distractionAttempts: IDistractionAttempt[] = [];

chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('Runtime installed');
  switch (details.reason) {
    case 'install':
      console.log('Extension installed');
      await utils.initialize.locales.initLocaleSettingsAndMessages();
      await utils.initialize.appData.initDefaultAppData();
      await utils.initialize.websiteRules.initDefaultWebsites();
      await utils.initialize.statistics.initDefaultStatistics();
      break;
    case 'update':
      console.log('Extension updated');
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
      console.log('App data changed');
      console.log(fgAppData);
    }
    if (constants.storage.FG_WEBSITE_RULES in changes) {
      fgWebsiteRules = JSON.parse(changes[constants.storage.FG_WEBSITE_RULES].newValue);
      console.log('Website rules changed');
      console.log(fgWebsiteRules);
    }
    if (constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS in changes) {
      distractionAttempts = JSON.parse(changes[constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS].newValue);
      console.log('Distraction attempts changed');
      console.log(distractionAttempts);
    }

    await scripts.background.applyRulesOnOpenTabs(fgAppData, fgWebsiteRules);
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log('Tab updated');
  if (tab.url &&
    !tab.url.includes('chrome-extension://') &&
    !tab.url.includes('chrome://newtab/') &&
    !tab.url.includes('chrome://extensions/')) {

    taskQueue.push({ tabId: tabId, url: tab.url, tabUpdatedTime: Date.now() });

    let tasksWithSameTabId = taskQueue.filter((tq) => tq.tabId === tabId);

    if (tasksWithSameTabId.length > 1) {
      taskQueue = taskQueue.filter((tq) => tq.tabId !== tabId);
      taskQueue.push({ tabId: tabId, url: tab.url, tabUpdatedTime: Date.now() });
    }

    await scripts.background.applyRuleOnSpecificTab(tabId, tab.url, fgAppData, fgWebsiteRules, taskQueue)
      .then((item) => saveDistractionAttempt(item, fgAppData));
  }
});

chrome.runtime.onStartup.addListener(async () => {
  console.log('Runtime started');
  await readData();
});
const saveDistractionAttempt = async (item: IWebsiteRule | undefined, appData: IAppData): Promise<void> => {
  console.log('Saving distraction attempt');
  console.log(item);
  if (!item) {
    return;
  }
  let distractionAttempt: IDistractionAttempt = {
    id: utils.unique.generateUniqueListId(distractionAttempts),
    url: item.url,
    focusMode: appData.focusMode,
    permanentlyActive: item.permanentlyActive
  };
  console.log('Distraction attempt');
  console.log(distractionAttempt);
  distractionAttempts.push(distractionAttempt);
  console.log('Distraction attempts');
  console.log(distractionAttempts);
  await utils.data.saveList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS, distractionAttempts);
};

const readData = async () => {
  fgAppData = await utils.data.fetchEntry((constants.storage.FG_APP_DATA));
  fgWebsiteRules = await utils.data.fetchList(constants.storage.FG_WEBSITE_RULES);
  distractionAttempts = await utils.data.fetchList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS);
}
