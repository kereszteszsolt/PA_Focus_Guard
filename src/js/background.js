import * as constants from "./utils/constants";
import * as dataAccess from "./utils/scripts/dataAccess.js";
import * as defaults from "./utils/defaults";
import { blockOrAllow } from "./background/blockAndRedirect";
import { blockElements } from "./background/elementBlockers";

//load default values when extension is loaded
let fgAppData = {
  focusMode: false,
};
let fgBlockedWebsitesByDomain = [];
let fgBlockedWebsitesByUrl = [];
let fgBlockedElementsOnWebsites = [];

//when installed, set default values
chrome.runtime.onInstalled.addListener(async function () {
  await setDefaultValues();
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
    await dataAccess.saveData(
      constants.localStorage.FG_BLOCKED_ELEMENTS_ON_WEBSITES,
      defaults.blockElementsOnWebsitesList,
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
  console.log("fgActive", fgAppData.focusMode);
  console.log("fgBlockedWebsitesByDomain", fgBlockedWebsitesByDomain);
  console.log("fgBlockedWebsitesByUrl", fgBlockedWebsitesByUrl);
  console.log("fgBlockedElementsOnWebsites", fgBlockedElementsOnWebsites);

  await blockOrAllow(
    fgAppData.focusMode,
    fgBlockedWebsitesByDomain,
    fgBlockedWebsitesByUrl,
  );
  await blockElements(fgAppData.focusMode, fgBlockedElementsOnWebsites);
});

// any time a storage item is updated, update global variables and run block_or_allow
chrome.storage.onChanged.addListener(async function (changes, namespace) {
  if (namespace === "sync") {
    if (constants.localStorage.FG_APP_DATA in changes) {
      fgAppData = JSON.parse(
        changes[constants.localStorage.FG_APP_DATA].newValue,
      );
      console.log("fired: fgAppData", fgAppData);
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
    if (constants.localStorage.FG_BLOCKED_ELEMENTS_ON_WEBSITES in changes) {
      fgBlockedElementsOnWebsites = JSON.parse(
        changes[constants.localStorage.FG_BLOCKED_ELEMENTS_ON_WEBSITES]
          .newValue,
      );
    }

    await blockOrAllow(
      fgAppData.focusMode,
      fgBlockedWebsitesByDomain,
      fgBlockedWebsitesByUrl,
    );

    await blockElements(fgAppData.focusMode, fgBlockedElementsOnWebsites);
  }
});

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  await blockElements(fgAppData.focusMode, fgBlockedElementsOnWebsites);
  await blockOrAllow(
    fgAppData.focusMode,
    fgBlockedWebsitesByDomain,
    fgBlockedWebsitesByUrl,
  );
});
