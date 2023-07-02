// when the extension is first installed, set default values
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        toggleSitesActive: false,
        toggleSitesList: 'facebook.com'
    }, function () {
    });
});

// set up initial chrome storage values
var toggleSitesActive = false;
var toggleSitesList = 'facebook.com';

chrome.storage.sync.get([
    'toggleSitesActive',
    'toggleSitesList'
], function (result) {
    toggleSitesActive = result.toggleSitesActive;
    toggleSitesList = result.toggleSitesList;
});



const hide = () => {
    if (toggleSitesActive) {
        const rules = toggleSitesList.split('\n').map((site, index) => {
            return {
                'id': index+1,
                'priority': 1,
                'action': {'type': 'redirect', 'redirect': {'extensionPath': '/../message.html'}},
                'condition': {'urlFilter': site, 'resourceTypes': ['main_frame']}
            };
        });

        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: Array.from({ length: 10000 }, (_, index) => index + 1),
            addRules: rules
        });
    }
    if (!toggleSitesActive) {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: Array.from({ length: 10000 }, (_, index) => index + 1),
            addRules: []
        });
    }
}
hide();

// any time a storage item is updated, update global variables
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'sync') {
        if (changes.toggleSitesActive) {
            toggleSitesActive = changes.toggleSitesActive.newValue;
            hide();
        }

        if (changes.toggleSitesList) {
            toggleSitesList = changes.toggleSitesList.newValue;
            hide();
        }
    }
});
