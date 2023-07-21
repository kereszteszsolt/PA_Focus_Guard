import * as constants from "../../utils/constants";

export const blockYouTubeElements = (focusMode, elementRules) => {
  console.log("blockYouTubeElements inside fgYouTube.js");
  let timeout = null;
  let delay = 100;

  blockElements(focusMode, elementRules);
  document.addEventListener("scroll", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      blockElements(focusMode, elementRules);
    }, delay);
  });
};

const blockElements = (focusMode, elementRules) => {
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
  let customTitle = "Focus Guard";
  //hide the title in the main page and sidebar
  let videoTitles = document.querySelectorAll("#video-title");
  for (let i = 0; i < videoTitles.length; i++) {
    videoTitles[i].innerHTML = customTitle;
  }

  //hide the title in the video player
  let videoPlayerTitle = document.querySelector(
    ".style-scope .ytd-watch-metadata h1 yt-formatted-string",
  );
  //change the title of the video player and add tooltip with original title
  if (videoPlayerTitle) {
    videoPlayerTitle.innerHTML = customTitle;
    videoPlayerTitle.title = videoPlayerTitle.innerText;
  }
}

function replaceYouTubeChannelName() {
  console.log("Replacing YouTube channel name");
  let customChannelName = "Focus Guard";

  //hide the channel name in the video player and main page
  let channelNames = document.querySelectorAll(
    "ytd-channel-name .style-scope .ytd-channel-name .yt-formatted-string",
  );
  for (let i = 0; i < channelNames.length; i++) {
    channelNames[i].innerHTML = customChannelName;
  }

  //hide the channel name in the sidebar
  let channelNames2 = document.querySelectorAll(
    "ytd-channel-name .style-scope .ytd-channel-name yt-formatted-string",
  );
  for (let i = 0; i < channelNames2.length; i++) {
    channelNames2[i].innerHTML = customChannelName;
  }
}
