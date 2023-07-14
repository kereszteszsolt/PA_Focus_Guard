import * as utils from './scripts/utils';
import * as defaultComponentData from './defaults/defaultData';
import {defaultComponents} from './defaults/defaultComponents';
import * as constants from './constants';
import * as backgroundScripts from './scripts/background';

// when the extension is first installed, set default values
chrome.runtime.onInstalled.addListener(function () {
    utils.dataAccess.saveData(constants.storageNames.FG_FOCUS_MODE_ACTIVE, false)
        .then(() => {
            const saveDataPromises = defaultComponents.map(component => {
                return utils.dataAccess.saveData(component.storageName, component.defaultData);
            });
            return Promise.all(saveDataPromises);
        })
        .then(() => {
            readStorage();
        })
        .catch(error => {
            console.error('Error initializing extension:', error);
        });
});

// set up initial chrome storage values
let fgFocusModeActive = false;
let fgTemporarilyBlockedWebsites = defaultComponentData.domains4Temp;
let fgPermanentlyBlockedWebsites = defaultComponentData.domains4Perm;
let fgLoading = false;

const readStorage = () => {
    fgLoading = true;

    utils.dataAccess.loadData(constants.storageNames.FG_FOCUS_MODE_ACTIVE, false)
        .then(result => {
            fgFocusModeActive = result.fgFocusModeActive;
            return utils.dataAccess.loadData(constants.storageNames.TEMPORARILY_BLOCKED_WEBSITES, defaultComponentData.domains4Temp);
        })
        .then(result => {
            fgTemporarilyBlockedWebsites = result;
            return utils.dataAccess.loadData(constants.storageNames.PERMANENTLY_BLOCKED_WEBSITES, defaultComponentData.domains4Perm);
        })
        .then(result => {
            fgPermanentlyBlockedWebsites = result;
            fgLoading = false;
        })
        .catch(error => {
            console.error('Error reading storage:', error);
            fgLoading = false;
        });
};

readStorage();

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

        backgroundScripts.blockAndRedirect.blockOrAllow(fgFocusModeActive, fgTemporarilyBlockedWebsites, fgPermanentlyBlockedWebsites);
    }
});
