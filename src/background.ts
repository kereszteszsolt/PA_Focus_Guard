import * as utils from '@/utils';

chrome.runtime.onInstalled.addListener(async (details) => {
  switch (details.reason) {
    case 'install':
      await utils.initialize.initLocaleSettingsAndMessages();
      break;
    case 'update':
      await utils.initialize.initLocaleSettingsAndMessages();
      break;
    case 'chrome_update':
      await utils.initialize.initLocaleSettingsAndMessages();
      break;
  }
});
