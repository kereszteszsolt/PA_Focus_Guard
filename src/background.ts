import * as utils from '@/utils';
import * as constants from '@/constants';
import { IAppData } from '@/interfaces/IAppData';
import { IWebsiteRule, ITaskQueue } from '@/interfaces';
import * as scripts from '@/scripts';

let fgAppData: IAppData = {
  focusMode: false,
  version: chrome.runtime.getManifest().version
};
let fgWebsiteRules: IWebsiteRule[] = [];
let taskQueue: ITaskQueue[] = [];

chrome.runtime.onInstalled.addListener(async (details) => {
  switch (details.reason) {
    case 'install':
      await utils.initialize.initLocaleSettingsAndMessages();
      await utils.initializeWebsite.initDefaultWebsites();
      break;
    case 'update':
      await utils.initialize.initLocaleSettingsAndMessages();
      await utils.initializeWebsite.initDefaultWebsites();
      break;
    case 'chrome_update':
      await utils.initialize.initLocaleSettingsAndMessages();
      await utils.initializeWebsite.initDefaultWebsites();
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

    await scripts.background.applyRulesOnOpenTabs(fgAppData, fgWebsiteRules);
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!tab.url?.includes('chrome-extension://') && !tab.url?.includes('chrome://newtab/')) {

    const taskQueIndex = taskQueue.findIndex((tq) => tq.tabId === tabId);
    if (taskQueIndex === -1 && tab.url) {
      taskQueue.push({ tabId: tabId, url: tab.url });
      await scripts.background.applyRuleOnSpecificTab(tabId, tab.url, fgAppData, fgWebsiteRules, taskQueue);
    } else {
      if ((taskQueIndex > -1 && taskQueIndex < taskQueue.length && tab.url) && (tab.url !== taskQueue[taskQueIndex].url)) {
        taskQueue.push({ tabId: tabId, url: tab.url });
        await scripts.background.applyRuleOnSpecificTab(tabId, tab.url, fgAppData, fgWebsiteRules, taskQueue);
      }
    }
  }
});

chrome.tabs.onCreated.addListener(async (tab) => {
  //await scripts.background.applyRulesOnOpenTabs(fgAppData, fgWebsiteRules);
  console.log('Tab created');
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  //await scripts.background.applyRulesOnOpenTabs(fgAppData, fgWebsiteRules);
  console.log('Tab activated');
});
