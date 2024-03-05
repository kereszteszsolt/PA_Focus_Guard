export const createMessageListener = (message: string, action: Function) => {
  return chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === message) {
      action();
      sendResponse({status: `${message} action executed`});
    }
    return true; // will respond asynchronously
  });
};

export const createBatchMessageListenerM2O = (message: string[], action: Function) => {
  return chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (message.includes(request.message)) {
      action();
      sendResponse({status: `${message} action executed`});
    }
    return true; // will respond asynchronously
  });
}

export const sendMessage = (message: string, callback?: Function) => {
  chrome.runtime.sendMessage({ message: message }, function(response) {
    if (callback) callback(response);
  });
};
