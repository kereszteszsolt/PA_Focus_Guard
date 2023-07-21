import * as constants from "../constants";

export const blockElementsOnWebsitesList = [
  {
    domain: "youtube.com",
    action: constants.blockElementsActions.BLOCK_YOUTUBE_ELEMENTS,
    elementRules: [
      {
        ruleName: constants.ruleNames.YOUTUBE_THUMBNAIL,
        isMarkedForBlock: false,
        isPermanentlyBlocked: false,
      },
      {
        ruleName: constants.ruleNames.YOUTUBE_VIDEO_TITLE,
        isMarkedForBlock: false,
        isPermanentlyBlocked: false,
      },
      {
        ruleName: constants.ruleNames.YOUTUBE_CHANNEL_NAME,
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
        ruleName: constants.ruleNames.FACEBOOK_REELS,
        isMarkedForBlock: false,
        isPermanentlyBlocked: false,
      },
    ],
  },
  {
    domain: "instagram.com",
    action: constants.blockElementsActions.BLOCK_INSTAGRAM_ELEMENTS,
    elementRules: [
      {
        ruleName: "instagram-reels",
        isMarkedForBlock: false,
        isPermanentlyBlocked: false,
      },
    ],
  },
  {
    domain: "twitter.com",
    action: constants.blockElementsActions.BLOCK_TWITTER_ELEMENTS,
    elementRules: [
      {
        ruleName: "twitter-trends",
        isMarkedForBlock: false,
        isPermanentlyBlocked: false,
      },
    ],
  },
  {
    domain: "linkedin.com",
    action: constants.blockElementsActions.BLOCK_LINKEDIN_ELEMENTS,
    elementRules: [
      {
        ruleName: "linkedin-trends",
        isMarkedForBlock: false,
        isPermanentlyBlocked: false,
      },
    ],
  },
];
