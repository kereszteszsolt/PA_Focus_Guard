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
      console.log('Active rules', calculateActiveWebsiteRules());
    }
    if (constants.storage.FG_WEBSITE_RULES in changes) {
      fgWebsiteRules = JSON.parse(changes[constants.storage.FG_WEBSITE_RULES].newValue);
      await scripts.background.applyRulesOnOpenTabs(fgAppData, fgWebsiteRules);
      console.log('Active rules', calculateActiveWebsiteRules());
    }
    if (constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS in changes) {
      distractionAttempts = JSON.parse(changes[constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS].newValue);
    }
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log('Tab updated');
  if (tab.url) {

    let activeRules: IWebsiteRule[] = calculateActiveWebsiteRules().filter((wr) => tab.url && tab.url.includes(wr.url)) || [];
    if (activeRules.length > 0) {
      let taskId = utils.unique.generateUniqueListId(taskQueue);
        taskQueue.push({
          id: taskId,
          tabId: tabId,
          url: tab.url,
          tabUpdatedTime: Date.now(),
          status: constants.tSKMQueue.QUEUED
        });

      console.log('Task queue');
      console.log(taskQueue);
      await taskManager(tabId, taskId);
    }
  }
});

const taskManager = async (tabId: number, taskId: string) => {
  const interval = 333;

  const intervalId = setInterval(async () => {
    if (taskQueue.length === 0) {
      clearInterval(intervalId);
      return;
    }

    const taskForTab = taskQueue.find((tq) => tq.tabId === tabId &&
      (tq.status === constants.tSKMQueue.OBSOLETE ||
        tq.status === constants.tSKMQueue.EXTENSION ||
        tq.status === constants.tSKMQueue.COMPLETED ||
        tq.status === constants.tSKMQueue.ON_HOLD));

    if (taskForTab) {
      clearInterval(intervalId);
      return;
    }

    const taskForTabQ: ITaskQueue[] = taskQueue.filter((tq) => tq.tabId === tabId && tq.status === constants.tSKMQueue.QUEUED);
    if (taskForTabQ.length === 0) {
      clearInterval(intervalId);
      return;
    }
    const oldestTaskForTab = taskForTabQ.reduce((prev, current) => (prev.tabUpdatedTime < current.tabUpdatedTime) ? prev : current);
    oldestTaskForTab.status = constants.tSKMQueue.ON_HOLD;

    await scripts.background.applyRuleOnSpecificTab(tabId, oldestTaskForTab.url, fgAppData, fgWebsiteRules, taskQueue)
      .then((item) => {
          oldestTaskForTab.status = constants.tSKMQueue.COMPLETED;
          taskQueue.forEach((tq) => {
            if (tq.tabId === tabId && tq.status === constants.tSKMQueue.QUEUED) {
              tq.status = constants.tSKMQueue.OBSOLETE;
            }
          });
          saveDistractionAttempt(item, fgAppData);
        }
      );

    console.log('Task queue');
    console.log(taskQueue);
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

const calculateActiveWebsiteRules = (): IWebsiteRule[]  => {
  return  fgWebsiteRules.filter((wr) => !wr.temporarilyInactive && (wr.permanentlyActive || fgAppData.focusMode)) || [];
}

const readData = async () => {
  fgAppData = await utils.data.fetchEntry((constants.storage.FG_APP_DATA));
  fgWebsiteRules = await utils.data.fetchList(constants.storage.FG_WEBSITE_RULES);
  distractionAttempts = await utils.data.fetchList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS);
};
