import * as constants from '../constants';

export const youtube = [
    {
        name: 'Youtube - Thumbnails',
        actionDescription: 'Replace',
        action: 'replace',
        actionName: constants.youtubeActionNames.YOUTUBE_THUMBNAIL,
        activeRule: true,
        permanently: false
    },
    {
        name: 'Youtube - Shorts',
        actionDescription: 'Redirect to message',
        action: 'remove',
        actionName: constants.youtubeActionNames.YOUTUBE_SHORTS,
        activeRule: true,
        permanently: false
    },
    {
        name: 'Youtube - Video Titles',
        actionDescription: 'Redirect to message',
        action: 'remove',
        actionName: constants.youtubeActionNames.YOUTUBE_VIDEO_TITLE,
        activeRule: true,
        permanently: false
    }
];
