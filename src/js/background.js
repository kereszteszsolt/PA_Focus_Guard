import * as constants from "./utils/constants";
import * as dataAccess from "./utils/scripts/dataAccess.js";
import * as defaults from "./utils/defaults";
import { blockOrAllow } from "./background/blockAndRedirect";

//load default values when extension is loaded
let fgActive = false;
let fgBlockedWebsitesByDomain = [];
let fgBlockedWebsitesByUrl = [];

//when installed, set default values
chrome.runtime.onInstalled.addListener(async function () {
  await setDefaultValues();
});

async function setDefaultValues() {
  try {
    await dataAccess.saveData(constants.localStorage.FG_ACTIVE, false);
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

async function readData() {
  try {
    fgActive = await dataAccess.loadData(constants.localStorage.FG_ACTIVE);
    fgBlockedWebsitesByDomain = await dataAccess.loadData(
      constants.localStorage.FG_BLOCKED_WEBSITES_BY_DOMAIN,
    );
    fgBlockedWebsitesByUrl = await dataAccess.loadData(
      constants.localStorage.FG_BLOCKED_WEBSITES_BY_URL,
    );
  } catch (error) {
    console.error("Error reading data:", error);
  }
}

// any time a storage item is updated, update global variables and run block_or_allow
chrome.storage.onChanged.addListener(async function (changes, namespace) {
  if (namespace === "sync") {
    if (constants.localStorage.FG_ACTIVE in changes) {
      fgActive = changes[constants.localStorage.FG_ACTIVE].newValue;
      console.log("fired: fgActive", fgActive);
    }
    if (constants.localStorage.FG_BLOCKED_WEBSITES_BY_DOMAIN in changes) {
      fgBlockedWebsitesByDomain = JSON.parse(
        changes[constants.localStorage.FG_BLOCKED_WEBSITES_BY_DOMAIN].newValue,
      );
      console.log(
        "fired: fgBlockedWebsitesByDomain",
        fgBlockedWebsitesByDomain,
      );
    }
    if (constants.localStorage.FG_BLOCKED_WEBSITES_BY_URL in changes) {
      fgBlockedWebsitesByUrl = JSON.parse(
        changes[constants.localStorage.FG_BLOCKED_WEBSITES_BY_URL].newValue,
      );
      console.log("fired: fgBlockedWebsitesByUrl", fgBlockedWebsitesByUrl);
    }

    await blockOrAllow(
      fgActive,
      fgBlockedWebsitesByDomain,
      fgBlockedWebsitesByUrl,
    );
  }
});
