import * as constants from "../../utils/constants";

export const blockYouTubeElements = (focusMode, elementRules) => {
  console.log("blockYouTubeElements inside fgYouTube.js");
  let timeout = null;
  let delay = 10;
  let count = 0;
  let countLimit = 100;
  console.log("delay: ", delay);

  blockElements(focusMode, elementRules);
  document.addEventListener("scroll", function () {
    delay = 10;
    count = 0;
    countLimit = 50;
    observer.observe(document.body, observerConfig);
  });

  let observerConfig = { childList: true, subtree: true };
  let observer = new MutationObserver(function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      blockElements(focusMode, elementRules);
    }, delay);
    if (count < countLimit) {
      count++;
    } else {
      observer.disconnect();
    }
    console.log("count: ", count);
  });

  observer.observe(document.body, observerConfig);
};

const blockElements = (focusMode, elementRules) => {
  console.log("... -block- ...");
  elementRules.forEach((elementRule) => {
    if (isActiveRule(focusMode, elementRule)) {
      switch (elementRule.ruleName) {
        case constants.ruleNames.YOUTUBE_THUMBNAIL:
          replaceYouTubeThumbnail();
          break;
        case constants.ruleNames.YOUTUBE_VIDEO_TITLE:
          replaceYouTubeVideoTitle();
          break;
        case constants.ruleNames.YOUTUBE_CHANNEL_NAME:
          replaceYouTubeChannelName();
          break;
        case constants.ruleNames.YOUTUBE_ALL_IMAGES:
          replaceAllYouTubeImages();
          break;
      }
    }
  });
};

const isActiveRule = (focusMode, elementRule) => {
  return (
    elementRule.isMarkedForBlock &&
    (focusMode || elementRule.isPermanentlyBlocked)
  );
};

function replaceYouTubeThumbnail() {
  console.log("Replacing YouTube thumbnail");
  let customImageURL =
    "https://images.pexels.com/photos/5200285/pexels-photo-5200285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  let thumbnailImages = document.querySelectorAll("#thumbnail img");
  for (let i = 0; i < thumbnailImages.length; i++) {
    thumbnailImages[i].src = customImageURL;
  }
}

function replaceYouTubeVideoTitle() {
  console.log("Replacing YouTube video title");
  let customTitle = "Video Title";
  //hide the title in the main page and sidebar
  let videoTitles = document.querySelectorAll("#video-title");
  for (let i = 0; i < videoTitles.length; i++) {
    videoTitles[i].innerHTML = customTitle;
  }
}

function replaceYouTubeChannelName() {
  console.log("Replacing YouTube channel name");
  let customChannelName = "Channel Name";

  let channelNames = document.querySelectorAll(
    "ytd-channel-name .style-scope .ytd-channel-name yt-formatted-string",
  );
  for (let i = 0; i < channelNames.length; i++) {
    channelNames[i].innerHTML = customChannelName;
  }
}

function replaceAllYouTubeImages() {
  console.log("Replacing all YouTube images");
  let customImageURL =
    "https://images.pexels.com/photos/5200285/pexels-photo-5200285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  let channelImages = document.getElementsByClassName(
    "style-scope yt-img-shadow",
  );
  for (let i = 0; i < channelImages.length; i++) {
    channelImages[i].src = customImageURL;
  }
}
