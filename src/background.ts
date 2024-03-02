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
      await scripts.background.applyRulesOnOpenTabs(fgAppData, fgWebsiteRules);
    }
    if (constants.storage.FG_WEBSITE_RULES in changes) {
      fgWebsiteRules = JSON.parse(changes[constants.storage.FG_WEBSITE_RULES].newValue);
      await scripts.background.applyRulesOnOpenTabs(fgAppData, fgWebsiteRules);
    }
    if (constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS in changes) {
      distractionAttempts = JSON.parse(changes[constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS].newValue);
    }
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log('Tab updated');
  if (tab.url &&
    !tab.url.includes('chrome-extension://') &&
    !tab.url.includes('chrome://newtab/') &&
    !tab.url.includes('chrome://extensions/')) {

    taskQueue.push({
      id: utils.unique.generateUniqueListId(taskQueue),
      tabId: tabId,
      url: tab.url,
      tabUpdatedTime: Date.now(),
      hold: false
    });

    // let tasksWithSameTabId = taskQueue.filter((tq) => tq.tabId === tabId);
    //
    // if (tasksWithSameTabId.length > 1) {
    //   taskQueue = taskQueue.filter((tq) => tq.tabId !== tabId);
    //   taskQueue.push({ tabId: tabId, url: tab.url, tabUpdatedTime: Date.now() });
    // }

    console.log('Task queue');
    console.log(taskQueue);

    // await scripts.background.applyRuleOnSpecificTab(tabId, tab.url, fgAppData, fgWebsiteRules, taskQueue)
    //   .then((item) => saveDistractionAttempt(item, fgAppData));
    await taskManager(tabId);
  }
});

const taskManager = async (tabId: number) => {
  const interval = 300;

  const intervalId = setInterval(async () => {

    if (taskQueue.length === 0) {
      clearInterval(intervalId);
      return;
    }

    const taskForTabOnHold = taskQueue.find((tq) => tq.tabId === tabId && tq.hold);
    if (taskForTabOnHold) {
      return;
    }


    const taskForTab: ITaskQueue[] = taskQueue.filter((tq) => tq.tabId === tabId);
    const oldestTaskForTab = taskForTab.reduce((prev, current) => (prev.tabUpdatedTime < current.tabUpdatedTime) ? prev : current);
    oldestTaskForTab.hold = true;

    await scripts.background.applyRuleOnSpecificTab(tabId, oldestTaskForTab.url, fgAppData, fgWebsiteRules, taskQueue)
      .then((item) => {
          taskQueue = taskQueue.filter((tq) => tq.tabId !== tabId);
          saveDistractionAttempt(item, fgAppData);
        }
      );

  }, interval);
};

chrome.runtime.onStartup.addListener(async () => {
  console.log('Runtime started');
  await readData();
});
const saveDistractionAttempt = async (item: IWebsiteRule | undefined, appData: IAppData): Promise<void> => {
  if (!item) {
    return;
  }
  let distractionAttempt: IDistractionAttempt = {
    id: utils.unique.generateUniqueListId(distractionAttempts),
    url: item.url,
    focusMode: appData.focusMode,
    permanentlyActive: item.permanentlyActive
  };
  distractionAttempts.push(distractionAttempt);
  await utils.data.saveList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS, distractionAttempts);
};

const readData = async () => {
  fgAppData = await utils.data.fetchEntry((constants.storage.FG_APP_DATA));
  fgWebsiteRules = await utils.data.fetchList(constants.storage.FG_WEBSITE_RULES);
  distractionAttempts = await utils.data.fetchList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS);
};
