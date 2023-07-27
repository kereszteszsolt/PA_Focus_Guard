import * as fgObserver from "./fgObserver.js";
import * as constants from "../../utils/constants";

export const blockFacebookElements = (focusMode, elementRules) => {
  let timeout = null;
  let delay = 10;
  let count = 0;
  let countLimit = 100;

  blockElements(focusMode, elementRules);

  document.addEventListener("scroll", function () {
    delay = 10;
    count = 0;
    countLimit = 50;
    fgObserver
      .observer(
        count,
        countLimit,
        timeout,
        delay,
        blockElements(focusMode, elementRules),
      )
      .observe(document.body, fgObserver.observerConfig);
  });

  fgObserver
    .observer(
      count,
      countLimit,
      timeout,
      delay,
      blockElements(focusMode, elementRules),
    )
    .observe(document.body, fgObserver.observerConfig);
};

const blockElements = (focusMode, elementRules) => {
  console.log("... -block- ...");
  elementRules.forEach((elementRule) => {
    if (isActiveRule(focusMode, elementRule)) {
      switch (elementRule.ruleName) {
        case constants.ruleNames.FACEBOOK_REELS:
          blockFacebookReels();
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

const blockFacebookReels = () => {
  let searchTerms = [
    "Reels and short videos",
    "Reel-videók és rövid videók",
    "Reel-uri şi videoclipuri scurte",
    "Reels und kurzvideos",
    "Reels y videos cortos",
    "Reels et vidéos courtes",
  ];
  for (let fbsugs of document.querySelectorAll('span[dir="auto"]')) {
    if (
      searchTerms.includes(fbsugs.innerText) ||
      searchTerms.includes(fbsugs.innerText)
    ) {
      fbsugs.closest("div[aria-labelledby]").remove();
    }
  }
};
