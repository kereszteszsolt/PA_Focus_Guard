const sendMessageToTab = (tabId, webSite) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(
      tabId,
      {
        action: webSite.action,
        focusMode: webSite.focusMode,
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

export const blockElements = (focusMode, blockElementsOnWebsitesList) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        reject("Error in blockElements: " + chrome.runtime.lastError.message);
      } else {
        const promises = [];
        tabs.forEach((tab) => {
          blockElementsOnWebsitesList.forEach((webSite) => {
            if (tab.url.includes(webSite.domain)) {
              promises.push(sendMessageToTab(tab.id, webSite));
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
