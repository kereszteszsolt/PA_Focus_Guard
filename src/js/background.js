import * as utils from './scripts/utils';
import * as defaultComponentData from './defaults/defaultData';
import {defaultComponents} from './defaults/defaultComponents';

// when the extension is first installed, set default values
chrome.runtime.onInstalled.addListener(function () {
    utils.dataAccess.saveData('fbBlockedSitesActive', true);
    utils.dataAccess.saveData('fgAppFunctionalities', defaultComponents);
    defaultComponents.forEach(component => {
        utils.dataAccess.saveData(component.storageName, component.defaultData);
    });
});

// set up initial chrome storage values
var fbBlockedSitesActive = true;
var fgTemporarilyBlockedWebsites = defaultComponentData.domains4Temp;
var fgPermanentlyBlockedWebsites = defaultComponentData.domains4Perm;

const readStorage = () => {
    fbBlockedSitesActive = utils.dataAccess.loadData('fbBlockedSitesActive', true);
    fgTemporarilyBlockedWebsites = utils.dataAccess.loadData('fgTemporarilyBlockedWebsites', defaultComponentData.domains4Temp);
    fgPermanentlyBlockedWebsites = utils.dataAccess.loadData('fgPermanentlyBlockedWebsites', defaultComponentData.domains4Perm);
};
readStorage();


const hide = () => {
    if (fbBlockedSitesActive) {
        const rules = [...fgTemporarilyBlockedWebsites].filter(site => site.checked).map((site, index) => {
            return {
                'id': index + 1,
                'priority': 1,
                'action': {'type': 'redirect', 'redirect': {'extensionPath': '/message.html'}},
                'condition': {'urlFilter': site.name, 'resourceTypes': ['main_frame', 'sub_frame']}
            };
        });

        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: Array.from({length: 10000}, (_, index) => index + 1),
            addRules: rules
        });
    }
    if (!fbBlockedSitesActive) {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: Array.from({length: 10000}, (_, index) => index + 1),
            addRules: []
        });
    }
};
hide();


const hidePermanently = () => {
    const rules = [...fgPermanentlyBlockedWebsites].filter(site => site.checked).map((site, index) => {
        return {
            'id': index + 10001,
            'priority': 1,
            'action': {'type': 'redirect', 'redirect': {'extensionPath': '/message.html'}},
            'condition': {'urlFilter': site.name, 'resourceTypes': ['main_frame', 'sub_frame']}
        };
    });

    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: Array.from({length: 10000}, (_, index) => index + 10001),
        addRules: rules
    });
};
hidePermanently();

// any time a storage item is updated, update global variables
chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'sync') {
        if (changes.fbBlockedSitesActive) {
            fbBlockedSitesActive = changes.fbBlockedSitesActive.newValue;
            hide();
        }

        if (changes.fgTemporarilyBlockedWebsites) {
            fgTemporarilyBlockedWebsites = JSON.parse(changes.fgTemporarilyBlockedWebsites.newValue);
            hide();
        }

        if (changes.fgPermanentlyBlockedWebsites) {
            fgPermanentlyBlockedWebsites = JSON.parse(changes.fgPermanentlyBlockedWebsites.newValue);
            hidePermanently();
        }

        chrome.tabs.query({}, function (tabs) {

            tabs.forEach(function (tab) {
                if (fbBlockedSitesActive) {
                    [...fgTemporarilyBlockedWebsites].filter(site => site.checked).forEach(site => {
                        if (tab.url.includes(site.name)) {
                            chrome.tabs.remove(tab.id);
                        }
                    });
                }

                [...fgPermanentlyBlockedWebsites].filter(site => site.checked).forEach(site => {
                    if (tab.url.includes(site.name)) {
                        chrome.tabs.remove(tab.id);
                    }
                });
            });
        });
    }
});
