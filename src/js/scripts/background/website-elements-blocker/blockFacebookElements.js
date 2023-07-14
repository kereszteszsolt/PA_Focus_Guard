// content-script-facebook.js
import * as constants from '../../../constants';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'blockFacebookElements') {
        blockFacebookElements(message.pFgFocusModeActive, message.pFgFacebookDistractionBlocker);
    }
});

function blockFacebookElements(pFgFocusModeActive, pFgFacebookDistractionBlocker) {

    pFgFacebookDistractionBlocker.forEach((element) => {
        if ((element.activeRule === true) && ((pFgFocusModeActive) || (element.permanently === true))) {
            switch (element.elementName) {
                case constants.facebookActionNames.FACEBOOK_REELS:
                    blockFromTimeLine(element);
                    break;
                case constants.facebookActionNames.FACEBOOK_STORIES:
                    break;
                case constants.facebookActionNames.FACEBOOK_PEOPLE_YOU_MAY_KNOW:
                    blockFromTimeLine(element);
                    break;
                case constants.facebookActionNames.FACEBOOK_SPONSORED:
                    blockFromTimeLine(element);
                    break;
                default:
                    break;
            }
        }
    });
}

const blockFromTimeLine = (element) => {
    for (let fbsugs of document.querySelectorAll('span[dir="auto"]')) {
        if(element.searchTerms.includes(fbsugs.innerText) || element.searchTerms.includes(fbsugs.innerText)){
            fbsugs.closest('div[aria-labelledby]').remove()
        }
    }
};
