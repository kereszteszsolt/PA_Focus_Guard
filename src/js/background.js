import * as constants from "./utils/constants";
import * as dataAccess from "./utils/scripts/dataAccess.js";
import * as defaults from "./utils/defaults";
import { blockOrAllow } from "./background/blockAndRedirect";

//load default values when extension is loaded
let fgAppData = {
  focusMode: false,
  fgLanguage: constants.languages.ENGLISH,
  fgVersion: chrome.runtime.getManifest().version,
};
let fgBlockedWebsitesByDomain = [];
let fgBlockedWebsitesByUrl = [];
let fgBlockedElementsOnWebsites = [];

//when installed, set default values
//on update, update version number
chrome.runtime.onInstalled.addListener(async function (details) {
  switch (details.reason) {
    case "install":
      await setDefaultValues();
      break;
    case "update":
      await readData(async () => {
        fgAppData.fgVersion = chrome.runtime.getManifest().version;
        await dataAccess.saveData(
          constants.localStorage.FG_APP_DATA,
          fgAppData,
        );
        fgBlockedWebsitesByUrl = fgBlockedWebsitesByUrl.map((item) => {
          item.isDisabled = item.hasOwnProperty("isMarkedForBlock")
            ? !item.isMarkedForBlock
            : false;
          return item;
        });
      });
      break;
  }
});

async function setDefaultValues() {
  try {
    await dataAccess.saveData(constants.localStorage.FG_APP_DATA, fgAppData);
    await dataAccess.saveData(
      constants.localStorage.FG_BLOCKED_WEBSITES_BY_DOMAIN,
      defaults.blockByDomainList,
    );
    await dataAccess.saveData(
      constants.localStorage.FG_BLOCKED_WEBSITES_BY_URL,
      defaults.blockByUrlList,
    );
  } catch (error) {
    console.error("Error setting default values:", error);
  }
}

async function readData(afterReadData) {
  try {
    fgAppData = await dataAccess.loadData(constants.localStorage.FG_APP_DATA);
    fgBlockedWebsitesByDomain = await dataAccess.loadData(
      constants.localStorage.FG_BLOCKED_WEBSITES_BY_DOMAIN,
    );
    fgBlockedWebsitesByUrl = await dataAccess.loadData(
      constants.localStorage.FG_BLOCKED_WEBSITES_BY_URL,
    );
    fgBlockedElementsOnWebsites = await dataAccess.loadData(
      constants.localStorage.FG_BLOCKED_ELEMENTS_ON_WEBSITES,
    );
  } catch (error) {
    console.error("Error reading data:", error);
  }
  afterReadData();
}

await readData(async () => {
  await blockOrAllow(
    fgAppData.focusMode,
    fgBlockedWebsitesByDomain,
    fgBlockedWebsitesByUrl,
  );
});

// any time a storage item is updated, update global variables and run block_or_allow
chrome.storage.onChanged.addListener(async function (changes, namespace) {
  if (namespace === "sync") {
    if (constants.localStorage.FG_APP_DATA in changes) {
      fgAppData = JSON.parse(
        changes[constants.localStorage.FG_APP_DATA].newValue,
      );
    }
    if (constants.localStorage.FG_BLOCKED_WEBSITES_BY_DOMAIN in changes) {
      fgBlockedWebsitesByDomain = JSON.parse(
        changes[constants.localStorage.FG_BLOCKED_WEBSITES_BY_DOMAIN].newValue,
      );
    }
    if (constants.localStorage.FG_BLOCKED_WEBSITES_BY_URL in changes) {
      fgBlockedWebsitesByUrl = JSON.parse(
        changes[constants.localStorage.FG_BLOCKED_WEBSITES_BY_URL].newValue,
      );
    }

    await blockOrAllow(
      fgAppData.focusMode,
      fgBlockedWebsitesByDomain,
      fgBlockedWebsitesByUrl,
    );
  }
});

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  await blockOrAllow(
    fgAppData.focusMode,
    fgBlockedWebsitesByDomain,
    fgBlockedWebsitesByUrl,
  );
});
