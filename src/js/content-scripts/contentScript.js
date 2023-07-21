import * as contentScript from "./cotent-scripts-specialized";
import * as constants from "../utils/constants";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.action) {
    case constants.blockElementsActions.BLOCK_YOUTUBE_ELEMENTS:
      console.log("message", message);
      console.log("message.focusMode", message.focusMode);
      console.log("message.elementRules", message.elementRules);
      contentScript.blockYouTubeElements(
        message.focusMode,
        message.elementRules,
      );
      break;
    case constants.blockElementsActions.BLOCK_FACEBOOK_ELEMENTS:
      contentScript.blockFacebookElements(
        message.focusMode,
        message.elementRules,
      );
      break;
  }
  sendResponse();
});
