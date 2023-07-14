// content-script-youtube.js
import * as constants from '../../../constants';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'blockYoutubeElements') {
        blockYoutubeElements(message.pFgFocusModeActive, message.pFgYouTubeDistractionBlocker);
    }
});


function blockYoutubeElements(pFgFocusModeActive, pFgYouTubeDistractionBlocker) {
    let customImageURL = 'https://images.pexels.com/photos/5200285/pexels-photo-5200285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

    console.log('pFgYouTubeDistractionBlocker:', pFgYouTubeDistractionBlocker);
    // Your logic to block elements on YouTube and perform any additional actions

    pFgYouTubeDistractionBlocker.forEach((element) => {
        if ((element.activeRule === true) || (element.permanently === true)) {
            switch (element.actionName) {
                case constants.youtubeActionNames.YOUTUBE_THUMBNAIL:
                    blockYoutubeThumbnails(customImageURL);
                    break;
                case constants.youtubeActionNames.YOUTUBE_SHORTS:
                    break;
                case constants.youtubeActionNames.YOUTUBE_VIDEO_TITLE:
                    break;
                default:
                    break;
            }
        }
    });

}

// Cover all thumbnails with custom image
const blockYoutubeThumbnails = (imageUrl) => {
    let thumbnailImages = document.querySelectorAll('#thumbnail img');
    for (let i = 0; i < thumbnailImages.length; i++) {
        thumbnailImages[i].src = imageUrl;
    }
};
