import * as utils from './scripts/utils';
import * as defaultComponentData from './defaults/defaultData';
import {defaultComponents} from './defaults/defaultComponents';
import * as constants from './constants';

// when the extension is first installed, set default values
chrome.runtime.onInstalled.addListener(function () {
    utils.dataAccess.savePrimitiveData(constants.storageNames.FG_FOCUS_MODE_ACTIVE);
    //  chrome.storage.sync.set({
    //          fgFocusModeActive: false
    //      }, () => {
    //      });
    defaultComponents.forEach(component => {
        utils.dataAccess.saveData(component.storageName, component.defaultData);
    });
});

// set up initial chrome storage values
var fgFocusModeActive = false;
var fgTemporarilyBlockedWebsites = defaultComponentData.domains4Temp;
var fgPermanentlyBlockedWebsites = defaultComponentData.domains4Perm;

const readStorage = () => {
    fgFocusModeActive = utils.dataAccess.loadPrimitiveData(constants.storageNames.FG_FOCUS_MODE_ACTIVE);
    //  chrome.storage.sync.get(['fgFocusModeActive'], (result) => {
    //      fgFocusModeActive = result.fgFocusModeActive;});
    fgTemporarilyBlockedWebsites = utils.dataAccess.loadData(constants.storageNames.TEMPORARILY_BLOCKED_WEBSITES, defaultComponentData.domains4Temp);
    fgPermanentlyBlockedWebsites = utils.dataAccess.loadData(constants.storageNames.PERMANENTLY_BLOCKED_WEBSITES, defaultComponentData.domains4Perm);
};
readStorage();
const getAndRemoveOldDynamicRules = () => {
    return new Promise((resolve) => {
        chrome.declarativeNetRequest.getDynamicRules(null, (oldRules) => {
            const ruleIds = oldRules.map(rule => rule.id);
            chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: ruleIds }, resolve);
        });
    });
};

const createFGRule = (siteName, index) => ({
    id: index,
    priority: 1,
    action: {
        type: 'redirect',
        redirect: { extensionPath: '/message.html' },
    },
    condition: {
        urlFilter: siteName,
        resourceTypes: ['main_frame', 'sub_frame'],
    },
});

const calculateNewDynamicRules = () => {
    console.log('calculateNewDynamicRules');
    const rules = [];
    let rulesIndex = 1;

    if (fgFocusModeActive === true) {
        let tempRules = fgTemporarilyBlockedWebsites
            .filter((site) => site.checked)
            .map((site) => createFGRule(site.name, rulesIndex++));
        rules.push(...tempRules);
    }

    let permRules = fgPermanentlyBlockedWebsites
        .filter((site) => site.checked)
        .map((site) => createFGRule(site.name, rulesIndex++));
    rules.push(...permRules);

    return rules;
};

const applyNewDynamicRules = (rules) => {
    return new Promise((resolve) => {
        chrome.declarativeNetRequest.updateDynamicRules({ addRules: rules }, resolve);
    });
};

const blockOrAllow = async () => {
    console.log('blockOrAllow');
    console.log('fgFocusModeActive', fgFocusModeActive);

    await getAndRemoveOldDynamicRules();
    const newRules = calculateNewDynamicRules();
    await applyNewDynamicRules(newRules);

    chrome.declarativeNetRequest.getDynamicRules(null, (myRules) => {
        console.log('new rules: ', myRules);
    });
};


// any time a storage item is updated, update global variables
chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'sync') {
        if (changes.fgFocusModeActive) {
            fgFocusModeActive = changes.fgFocusModeActive.newValue;
        }

        if (changes.fgTemporarilyBlockedWebsites) {
            fgTemporarilyBlockedWebsites = JSON.parse(changes.fgTemporarilyBlockedWebsites.newValue);
        }

        if (changes.fgPermanentlyBlockedWebsites) {
            fgPermanentlyBlockedWebsites = JSON.parse(changes.fgPermanentlyBlockedWebsites.newValue);
        }

        blockOrAllow();

        chrome.tabs.query({}, function (tabs) {
            // loop through all tabs and close any that are on the blocked list
            tabs.forEach(function (tab) {
                if (fgFocusModeActive === true) {
                    fgTemporarilyBlockedWebsites.filter(site => site.checked).forEach(site => {
                        if (tab.url.includes(site.name)) {
                            chrome.tabs.remove(tab.id);
                        }
                    });
                }

                fgPermanentlyBlockedWebsites.filter(site => site.checked).forEach(site => {
                    if (tab.url.includes(site.name)) {
                        chrome.tabs.remove(tab.id);
                    }
                });
            });
        });
    }
});
