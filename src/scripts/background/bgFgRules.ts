import { IAppData, IWebsiteRule } from '@/interfaces';

export const applyRulesOnOpenTabs = async (fgAppData: IAppData, fgWebsiteRules: IWebsiteRule[]): Promise<void> => {
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

