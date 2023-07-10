import * as utils from '../utils';
import * as constants  from '../../constants';
import * as defaultComponentData from '../../defaults/defaultData';

var activeRules = [];
var ruleIds = [];

// set up initial chrome storage values
var fgFocusModeActive = false;
var fgTemporarilyBlockedWebsites = defaultComponentData.domains4Temp;
var fgPermanentlyBlockedWebsites = defaultComponentData.domains4Perm;


const readStorage = () => {
    fgFocusModeActive = utils.dataAccess.loadData(constants.storageNames.FOCUS_MODE_ACTIVE, false);
    fgTemporarilyBlockedWebsites = utils.dataAccess.loadData(constants.storageNames.TEMPORARILY_BLOCKED_WEBSITES, defaultComponentData.domains4Temp);
    fgPermanentlyBlockedWebsites = utils.dataAccess.loadData(constants.storageNames.PERMANENTLY_BLOCKED_WEBSITES, defaultComponentData.domains4Perm);
};
export const blockOrRedirectWebsitesSetup = () => {
    readStorage();
    blockOrAllow();
    // any time a storage item is updated, update global variables
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        if (namespace === 'sync') {
            if (changes.fgFocusModeActive) {
                fgFocusModeActive = changes.fgFocusModeActive.newValue;
                blockOrAllow();
            }

            if (changes.fgTemporarilyBlockedWebsites) {
                fgTemporarilyBlockedWebsites = JSON.parse(changes.fgTemporarilyBlockedWebsites.newValue);
                blockOrAllow();
            }

            if (changes.fgPermanentlyBlockedWebsites) {
                fgPermanentlyBlockedWebsites = JSON.parse(changes.fgPermanentlyBlockedWebsites.newValue);
                blockOrAllow();
            }

            chrome.tabs.query({}, function (tabs) {

                // loop through all tabs and close any that are on the blocked list
                tabs.forEach(function (tab) {

                    if (fgFocusModeActive) {
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
}


const blockOrAllow = () => {

    const rules = [];
    let index = 1;

    ruleIds.push(...activeRules.map(rule => rule.id));
    console.log('ruleIds:', ruleIds);
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ruleIds,
        addRules: []
    });

    fgTemporarilyBlockedWebsites = fgTemporarilyBlockedWebsites.map((site) => ({
        ...site,
        ruleId: index++,
    }));

    fgPermanentlyBlockedWebsites = fgPermanentlyBlockedWebsites.map((site) => ({
        ...site,
        ruleId: index++,
    }));

    console.log('fgTemporarilyBlockedWebsites:', fgTemporarilyBlockedWebsites);
    console.log('fgPermanentlyBlockedWebsites:', fgPermanentlyBlockedWebsites);

    let tempRules = [];
    if (fgFocusModeActive) {
        tempRules = fgTemporarilyBlockedWebsites
            .filter((site) => site.checked)
            .map((site) => ({
                id: site.ruleId,
                priority: 1,
                action: {
                    type: 'redirect',
                    redirect: { extensionPath: '/message.html' },
                },
                condition: {
                    urlFilter: site.name,
                    resourceTypes: ['main_frame', 'sub_frame'],
                },
            }));
    }
    rules.push(...tempRules);

    let permRules = fgPermanentlyBlockedWebsites
        .filter((site) => site.checked)
        .map((site) => ({
            id: site.ruleId,
            priority: 1,
            action: {
                type: 'redirect',
                redirect: { extensionPath: '/message.html' },
            },
            condition: {
                urlFilter: site.name,
                resourceTypes: ['main_frame', 'sub_frame'],
            },
        }));
    rules.push(...permRules);

    console.log('rules:', rules);


    activeRules = [...rules]
    ruleIds = [...activeRules.map(rule => rule.id)];
    console.log('ruleIds:', ruleIds);
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ruleIds,
        addRules: activeRules
    });
};
