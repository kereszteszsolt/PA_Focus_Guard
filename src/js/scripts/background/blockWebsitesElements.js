import * as blockers from './website-elements-blocker';

export const blockElements = (pFgFocusModeActive, pFgYouTubeDistractionBlocker, pFgFacebookDistractionBlocker) => {
    return new Promise((resolve) => {
       //run scripts on tabs
         chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
                if (tab.url.includes('youtube.com')) {
                    chrome.tabs.sendMessage(tab.id, {
                        action: 'blockYoutubeElements',
                        pFgFocusModeActive,
                        pFgYouTubeDistractionBlocker
                    });
                }

                if (tab.url.includes('facebook.com')) {
                    chrome.tabs.sendMessage(tab.id, {
                        action: 'blockFacebookElements',
                        pFgFocusModeActive,
                        pFgFacebookDistractionBlocker
                    });
                }

                // if (tab.url.includes('facebook.com')) {
                //     chrome.scripting.executeScript({
                //         target: {tabId: tab.id},
                //         func:  blockers.blockFacebookElements(pFgFocusModeActive, pFgFacebookDistractionBlocker)
                //     });
                // }
                //
                // if (tab.url.includes('youtube.com')) {
                //     chrome.scripting.executeScript({
                //         target: {tabId: tab.id},
                //         func:  blockers.blockYoutubeElements(pFgFocusModeActive, pFgYouTubeDistractionBlocker)
                //     });
                // }
            });
         });

        resolve(); // Resolve the promise when the tabs have been processed
    });
};
