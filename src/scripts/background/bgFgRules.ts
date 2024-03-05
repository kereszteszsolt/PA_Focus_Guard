import { IAppData, IDistractionAttempt, ITaskQueue, IWebsiteRule } from '@/interfaces';
import * as utils from '@/utils';
import * as constants from '@/constants';


// import ResourceType = chrome.declarativeNetRequest.ResourceType;
// import RuleActionType = chrome.declarativeNetRequest.RuleActionType;
//
// const createDynamicRule = (index: number, wr: IWebsiteRule): chrome.declarativeNetRequest.Rule => ({
//   id: index,
//   priority: 1,
//   action: {
//     type: RuleActionType.REDIRECT,
//     redirect: {
//       extensionPath: '/options.html#/websites'
//     }
//   },
//   condition: {
//     urlFilter: wr.url,
//     resourceTypes: [ResourceType.MAIN_FRAME, ResourceType.SUB_FRAME]
//   }
// });
//
// async function calculateNewDynamicRules(fgAppData: IAppData, fgWebsiteRules: IWebsiteRule[]): Promise<chrome.declarativeNetRequest.Rule[]> {
//   return new Promise<chrome.declarativeNetRequest.Rule[]>((resolve) => {
//     const rules: chrome.declarativeNetRequest.Rule[] = [];
//     let index = 1;
//
//     fgWebsiteRules.forEach((wr) => {
//       if (!wr.temporarilyInactive && (wr.permanentlyActive || fgAppData.focusMode)) {
//         rules.push(createDynamicRule(index++, wr));
//       }
//     });
//     resolve(rules);
//   });
// }
//
// async function applyRules(newDynamicRules: chrome.declarativeNetRequest.Rule[], oldDynamicRulesIds: number[]): Promise<void> {
//   return new Promise<void>((resolve) => {
//     chrome.declarativeNetRequest.updateDynamicRules({
//       removeRuleIds: oldDynamicRulesIds,
//       addRules: newDynamicRules
//     }, () => {
//       console.log('Rules updated');
//       resolve();
//     });
//   });
// }
//
// export const blockOrAllow = async (fgAppData: IAppData, fgWebsiteRules: IWebsiteRule[]): Promise<void> => {
//   const newDynamicRules: chrome.declarativeNetRequest.Rule[] = await calculateNewDynamicRules(fgAppData, fgWebsiteRules);
//   console.log('New dynamic rules');
//   console.log(newDynamicRules);
//   const oldDynamicRules: chrome.declarativeNetRequest.Rule[] = await chrome.declarativeNetRequest.getDynamicRules();
//   console.log('Old dynamic rules');
//   console.log(oldDynamicRules);
//   const oldDynamicRulesIds: number[] = oldDynamicRules.map((dr) => dr.id);
//   console.log('Old dynamic rules ids');
//   console.log(oldDynamicRulesIds);
//   await applyRules(newDynamicRules, oldDynamicRulesIds);
//   console.log('Rules applied');
// };

// export const applyRulesOnOpenTabs = async (fgAppData: IAppData, fgWebsiteRules: IWebsiteRule[]): Promise<void> => {
//   chrome.tabs.query({}, (tabs) => {
//     console.log('applyRulesOnOpenTabs.....');
//     tabs.forEach((tab: chrome.tabs.Tab) => {
//       const itemsToBlock = fgWebsiteRules.filter((wr) => !wr.temporarilyInactive && (wr.permanentlyActive || fgAppData.focusMode));
//
//       itemsToBlock.forEach((item) => {
//         if (tab.url && tab.url.includes(item.url) && tab.id) {
//           chrome.tabs.update(tab.id, { url: '/options.html#/focus-message' });
//         }
//       });
//     });
//   });
// };

export const applyRulesOnOpenTabs = async (fgAppData: IAppData, fgWebsiteRules: IWebsiteRule[]): Promise<void> => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab: chrome.tabs.Tab) => {
      const itemsToBlock = fgWebsiteRules.filter((wr) => !wr.temporarilyInactive && (wr.permanentlyActive || fgAppData.focusMode));
      itemsToBlock.forEach((item) => {
        if (tab.url && tab.url.includes(item.urlFilter) && tab.id) {
          chrome.tabs.update(tab.id, { url: '/options.html#/focus-message' });
        }
      });
    });
  });
};

// export const applyRuleOnSpecificTab = async (tabId: number, url: string, fgAppData: IAppData, fgWebsiteRules: IWebsiteRule[], fgTaskQue: ITaskQueue[]): Promise<IWebsiteRule | undefined> => {
//   return new Promise<IWebsiteRule | undefined>((resolve) => {
//     chrome.tabs.get(tabId, (tab) => {
//       let index = fgTaskQue.findIndex((tq) => tq.tabId === tabId);
//       if (index !== -1 && fgTaskQue[index].url === url) {
//         const itemsToBlock: IWebsiteRule[] = fgWebsiteRules.filter((wr) => !wr.temporarilyInactive && (wr.permanentlyActive || fgAppData.focusMode));
//
//         let item2Resolve: IWebsiteRule | undefined = undefined;
//         itemsToBlock.forEach((item) => {
//           if (tab.url && tab.url.includes(item.url)) {
//             chrome.tabs.update(tabId, { url: '/options.html#/focus-message/' });
//             item2Resolve = item;
//           }
//         });
//         resolve(item2Resolve);
//       }
//     });
//   });
// };

