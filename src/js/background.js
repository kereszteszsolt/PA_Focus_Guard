// when the extension is first installed, set default values
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        fbBlockedSitesActive: true,
        fgTemporarilyBlockedWebsites: JSON.stringify([
            {name: 'youtube.com', checked: true},
            {name: 'facebook.com', checked: true},
            {name: 'linkedin.com', checked: true}
        ]),
        fgPermanentlyBlockedWebsites: JSON.stringify([
            {name: 'videa.hu', checked: true},
            {name: 'dailymotion.com', checked: true}
        ])
    }, function () {
    });
});

// set up initial chrome storage values
var fbBlockedSitesActive = true;
var fgTemporarilyBlockedWebsites = [
    {name: 'youtube.com', checked: true},
    {name: 'facebook.com', checked: true},
    {name: 'linkedin.com', checked: true}
];
var fgPermanentlyBlockedWebsites = [
    {name: 'example.com', checked: true},
];

const readStorage = () => {
    chrome.storage.sync.get([
        'fbBlockedSitesActive',
        'fgTemporarilyBlockedWebsites',
        'fgPermanentlyBlockedWebsites'
    ], function (result) {
        fbBlockedSitesActive = result.fbBlockedSitesActive;
        fgTemporarilyBlockedWebsites = JSON.parse(result.fgTemporarilyBlockedWebsites || '[]') || [];
        fgPermanentlyBlockedWebsites = JSON.parse(result.fgPermanentlyBlockedWebsites || '[]') || [];
    });
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
