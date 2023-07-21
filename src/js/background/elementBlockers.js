const sendMessageToTab = (tabId, focusMode, webSite) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(
      tabId,
      {
        action: webSite.action,
        focusMode: focusMode,
        elementRules: webSite.elementRules,
      },
      (response) => {
        if (chrome.runtime.lastError) {
          reject(
            "Error in sendMessageToTab: " + chrome.runtime.lastError.message,
          );
        } else if (response && response.error) {
          reject("Error in sendMessageToTab: " + response.error);
        } else {
          resolve();
        }
      },
    );
  });
};

const isActiveRule = (focusMode, elementRule) => {
  console.log("isActiveRule called");
  console.log("elementRule", elementRule);
  console.log("focusMode", focusMode);
  console.log(
    "isActiveRule",
    elementRule.isMarkedForBlock &&
      (focusMode || elementRule.isPermanentlyBlocked),
  );
  return (
    elementRule.isMarkedForBlock &&
    (focusMode || elementRule.isPermanentlyBlocked)
  );
};

export const blockElements = (focusMode, blockElementsOnWebsitesList) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({}, (tabs) => {
      if (chrome.runtime.lastError) {
        reject("Error in blockElements: " + chrome.runtime.lastError.message);
      } else {
        const promises = [];
        tabs.forEach((tab) => {
          blockElementsOnWebsitesList.forEach((webSite) => {
            if (
              tab.url.includes(webSite.domain) &&
              webSite.elementRules.filter((r) => isActiveRule(focusMode, r))
                .length > 0
            ) {
              promises.push(sendMessageToTab(tab.id, focusMode, webSite));
            }
          });
        });
        Promise.all(promises)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject("Error in blockElements: " + error);
          });
      }
    });
  });
};
