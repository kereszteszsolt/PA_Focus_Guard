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
    let focusPage = fgAppData.focusMode && tab.url.includes('chrome-extension://') && tab.url.includes('options.html#/focus-message');
    let active = calculateActiveWebsiteRules();
    let relevant = active.some((wr) => tab.url && tab.url.includes(wr.url));
    let alreadyInAndTime = taskQueue.some((tq) => tq.tabId === tabId && tq.url === tab.url && (Date.now() - tq.tabUpdatedTime) < 1500);
    console.log('alreadyInAndTime', alreadyInAndTime);
    if (relevant && !alreadyInAndTime) {
      console.log('Relevant tab');
      let taskId = utils.unique.generateUniqueListId(taskQueue);
      taskQueue.push({
        id: taskId,
        tabId: tabId,
        url: tab.url,
        tabUpdatedTime: Date.now(),
        status: constants.tSKMQueue.QUEUED
      });

      console.log('chrome.tabs.onUpdated.addListener taskQueue:');
      for (let task of taskQueue) {
        console.log(task);
      }
      await taskManager(tabId, taskId);
    }
  }
});

const taskManager = async (tabId: number, taskId: string) => {
  const interval = 333;
  let contextTask = taskQueue.find((tq) => tq.id === taskId);

  const intervalId = setInterval(async () => {
    if (taskQueue.length === 0 || !contextTask) {
      clearInterval(intervalId);
      return;
    }

    const onHoldCondition = taskQueue.some((tq) => tq.tabId === tabId &&
      (tq.status === constants.tSKMQueue.OBSOLETE ||
        tq.status === constants.tSKMQueue.EXTENSION ||
        tq.status === constants.tSKMQueue.COMPLETED));
    if (onHoldCondition) {
      contextTask.status = constants.tSKMQueue.OBSOLETE;
      clearInterval(intervalId);
      return;
    }
    contextTask.status = constants.tSKMQueue.ON_HOLD;

    await scripts.background.applyRuleOnSpecificTab(tabId, contextTask.url, fgAppData, fgWebsiteRules, taskQueue)
      .then((item) => {
          if (contextTask) {
            contextTask.status = constants.tSKMQueue.COMPLETED;
          }
          saveDistractionAttempt(item, fgAppData);
        }
      );

    console.log('chrome.tabs.onUpdated.addListener taskManager taskQueue:');
    for (let task of taskQueue) {
      console.log(task);
    }
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

const calculateActiveWebsiteRules = (): IWebsiteRule[] => {
  return fgWebsiteRules.filter((wr) => !wr.temporarilyInactive && (wr.permanentlyActive || fgAppData.focusMode)) || [];
};

const readData = async () => {
  fgAppData = await utils.data.fetchEntry((constants.storage.FG_APP_DATA));
  fgWebsiteRules = await utils.data.fetchList(constants.storage.FG_WEBSITE_RULES);
  distractionAttempts = await utils.data.fetchList(constants.storage.FG_STATISTICS_DISTRACTION_ATTEMPTS);
};
