const getAndRemoveOldDynamicRules = () => {
    return new Promise((resolve) => {
        chrome.declarativeNetRequest.getDynamicRules(null, (oldRules) => {
            const ruleIds = oldRules.map(rule => rule.id);
            chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: ruleIds}, resolve);
        });
    });
};

const createFGRule = (siteName, index) => ({
    id: index,
    priority: 1,
    action: {
        type: 'redirect',
        redirect: {extensionPath: '/message.html'}
    },
    condition: {
        urlFilter: siteName,
        resourceTypes: ['main_frame', 'sub_frame']
    }
});

const calculateNewDynamicRules = (pFgFocusModeActive, pFgTemporarilyBlockedWebsites, pFgPermanentlyBlockedWebsites) => {
    console.log('calculateNewDynamicRules');
    const rules = [];
    let rulesIndex = 1;

    if (pFgFocusModeActive === true) {
        let tempRules = pFgTemporarilyBlockedWebsites
            .filter((site) => site.checked)
            .map((site) => createFGRule(site.name, rulesIndex++));
        rules.push(...tempRules);
    }

    let permRules = pFgPermanentlyBlockedWebsites
        .filter((site) => site.checked)
        .map((site) => createFGRule(site.name, rulesIndex++));
    rules.push(...permRules);

    return rules;
};

const applyNewDynamicRules = (rules) => {
    return new Promise((resolve) => {
        chrome.declarativeNetRequest.updateDynamicRules({addRules: rules}, resolve);
    });
};

function closeBlockedTabs(pFgFocusModeActive, pFgTemporarilyBlockedWebsites, pFgPermanentlyBlockedWebsites) {
    return new Promise((resolve) => {
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
                if (pFgFocusModeActive === true) {
                    pFgTemporarilyBlockedWebsites.filter(site => site.checked).forEach(site => {
                        if (tab.url.includes(site.name)) {
                            chrome.tabs.remove(tab.id);
                        }
                    });
                }

                pFgPermanentlyBlockedWebsites.filter(site => site.checked).forEach(site => {
                    if (tab.url.includes(site.name)) {
                        chrome.tabs.remove(tab.id);
                    }
                });
            });

            resolve(); // Resolve the promise when the tabs have been processed
        });
    });
}

export const blockOrAllow = async (pFgFocusModeActive, pFgTemporarilyBlockedWebsites, pFgPermanentlyBlockedWebsites) => {
    console.log('blockOrAllow');
    console.log('fgFocusModeActive', pFgFocusModeActive);

    await getAndRemoveOldDynamicRules();
    const newRules = calculateNewDynamicRules(pFgFocusModeActive, pFgTemporarilyBlockedWebsites, pFgPermanentlyBlockedWebsites);
    await applyNewDynamicRules(newRules);
    await closeBlockedTabs(pFgFocusModeActive, pFgTemporarilyBlockedWebsites, pFgPermanentlyBlockedWebsites);

    chrome.declarativeNetRequest.getDynamicRules(null, (myRules) => {
        console.log('new rules: ', myRules);
    });
};
