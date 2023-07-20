import * as constants from "../constants";
export const blockElementsOnWebsitesList = [
  {
    domain: "youtube.com",
    action: constants.blockElementsActions.BLOCK_YOUTUBE_ELEMENTS,
    elementRules: [
      {
        ruleName: "youtube-thumbnail",
        isMarkedForBlock: false,
        isPermanentlyBlocked: false,
      },
    ],
  },
  {
    domain: "facebook.com",
    action: constants.blockElementsActions.BLOCK_FACEBOOK_ELEMENTS,
    elementRules: [
      {
        ruleName: "facebook-watch",
        isMarkedForBlock: false,
        isPermanentlyBlocked: false,
      },
    ],
  },
];
