import * as constants from '../constants';

export const youtube = [
    {
        name: 'Youtube - Thumbnails',
        searchTerms: ['youtube.com'],
        customSearchTerms: [],
        actionName: constants.youtubeActionNames.YOUTUBE_THUMBNAIL,
        action: 'remove',
        activeRule: true,
        permanently: false
    },
    {
        name: 'Youtube - Shorts',
        searchTerms: ['youtube.com'],
        customSearchTerms: [],
        actionName: constants.youtubeActionNames.YOUTUBE_SHORTS,
        action: 'remove',
        activeRule: true,
        permanently: false
    },
    {
        name: 'Youtube - Video Titles',
        searchTerms: ['youtube.com'],
        customSearchTerms: [],
        actionName: constants.youtubeActionNames.YOUTUBE_VIDEO_TITLE,
        action: 'remove',
        activeRule: true,
        permanently: false
    }
];
