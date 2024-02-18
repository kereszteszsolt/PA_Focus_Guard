import * as utils from '@/utils';
import * as constants from '@/constants';

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
      console.log('Websites changed');
    }
    if (constants.storage.FG_WEBSITES in changes) {
      console.log('Websites changed');
    }
    if (constants.storage.FG_WEBSITE_LISTS in changes) {
      console.log('Website lists changed');
    }
    if (constants.storage.FG_LOCALES_SETTINGS in changes) {
      console.log('Locale settings changed');
    }
    if (constants.storage.FG_LOCALES_MESSAGES in changes) {
      console.log('Locale messages changed');
    }
  }
});
