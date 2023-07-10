import * as constants from '../../constants';
import * as defaultData from '../../defaults/defaultData';
import * as utils from '../utils';
import {youtubeElementsBlocker} from './youtubeElementsBlocker';
import {facebookElementsBlocker} from './facebookElementsBlocker';

var fgFocusModeActive = false;
var fgFacebookDistractionBlocker = defaultData.facebook;
var fgYouTubeDistractionBlocker = defaultData.youtube;

const readStorage = () => {
    fgFocusModeActive = utils.dataAccess.loadData(constants.storageNames.FOCUS_MODE_ACTIVE, false);
    fgFacebookDistractionBlocker = utils.dataAccess.loadData(constants.storageNames.FACEBOOK_DISTRACTION_BLOCKER, defaultData.facebook);
    fgYouTubeDistractionBlocker = utils.dataAccess.loadData(constants.storageNames.YOUTUBE_DISTRACTION_BLOCKER, defaultData.youtube);
};

const jobList = [
    {
        domains: ['youtube.com'],
        //execute: () => youtubeElementsBlocker(fgFocusModeActive, fgYouTubeDistractionBlocker)
        execute: () => console.log('youtube - executed')
    },
    {
        domains: ['facebook.com'],
        //execute: () => facebookElementsBlocker(fgFocusModeActive, fgFacebookDistractionBlocker)
        execute: () => console.log('facebook - executed')
    }
];

export const websiteElementsBlockerSetup = () => {

    readStorage();

    chrome.storage.onChanged.addListener(function (changes, namespace) {
        if (namespace === 'sync') {
            if (changes.fgFocusModeActive) {
                fgFocusModeActive = changes.fgFocusModeActive.newValue;
            }
            if (changes.fgFacebookDistractionBlocker) {
                fgFacebookDistractionBlocker = JSON.parse(changes.fgFacebookDistractionBlocker.newValue);
            }

            if (changes.fgYouTubeDistractionBlocker) {
                fgYouTubeDistractionBlocker = JSON.parse(changes.fgYouTubeDistractionBlocker.newValue);
            }
        }

        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
                    jobList.forEach(job => {
                        console.log('executing job for ' + tab.url + ' on ' + job.domains);
                            if (job.domains.some(domain => tab.url.includes(domain))) {
                                console.log('mathced domain ' + tab.url + ' on ' + job.domains);
                                chrome.scripting.executeScript({
                                    target: {tabId: tab.id},
                                    func: job.execute
                                });
                            }
                        }
                    );
                }
            );
        });
    });

};

