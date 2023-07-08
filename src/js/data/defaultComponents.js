import * as constants from '../constants';

export const defaultComponents = [
    {
        name: constants.componentNames.TEMPORARILY_BLOCKED_WEBSITES,
        title: constants.componentTitles.TEMPORARILY_BLOCKED_WEBSITES,
        storageName: constants.storageNames.TEMPORARILY_BLOCKED_WEBSITES,
        containerComponent: constants.containerComponents.BLOCKED_WEBSITES_BY_DOMAIN,
        data: [],
        defaultData: []
    },
    {
        name: constants.componentNames.PERMANENTLY_BLOCKED_WEBSITES,
        title: constants.componentTitles.PERMANENTLY_BLOCKED_WEBSITES,
        storageName: constants.storageNames.PERMANENTLY_BLOCKED_WEBSITES,
        containerComponent: constants.containerComponents.BLOCKED_WEBSITES_BY_DOMAIN,
        data: [],
        defaultData: []
    },
    {
        name: constants.componentNames.YOUTUBE_DISTRACTION_BLOCKER,
        title: constants.componentTitles.YOUTUBE_DISTRACTION_BLOCKER,
        storageName: constants.storageNames.YOUTUBE_DISTRACTION_BLOCKER,
        containerComponent: constants.containerComponents.WEBSITE_ELEMENT_BLOCKER,
        data: [],
        defaultData: []
    },
    {
        name: constants.componentNames.FACEBOOK_DISTRACTION_BLOCKER,
        title: constants.componentTitles.FACEBOOK_DISTRACTION_BLOCKER,
        storageName: constants.storageNames.FACEBOOK_DISTRACTION_BLOCKER,
        containerComponent: constants.containerComponents.WEBSITE_ELEMENT_BLOCKER,
        data: [],
        defaultData: []
    }
]
