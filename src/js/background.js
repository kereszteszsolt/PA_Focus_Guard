import * as utils from './scripts/utils';
import {defaultComponents} from './defaults/defaultComponents';
import * as scriptWebsiteElementsBlocker from './scripts/background';
import * as constants  from './constants';

// when the extension is first installed, set default values
chrome.runtime.onInstalled.addListener(function () {
    utils.dataAccess.saveData(constants.storageNames.FOCUS_MODE_ACTIVE, false);
    defaultComponents.forEach(component => {
        utils.dataAccess.saveData(component.storageName, component.defaultData);
    });
});

scriptWebsiteElementsBlocker.blockOrRedirectWebsitesSetup();



