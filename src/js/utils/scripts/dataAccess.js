export function loadData(storageName) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([storageName], function (result) {
      if (chrome.runtime.lastError) {
        reject(
          new Error(
            `Error loading data for '${storageName}': ${chrome.runtime.lastError.message}`,
          ),
        );
      } else {
        const serializedData = result[storageName];
        if (serializedData) {
          try {
            const parsedData = JSON.parse(serializedData);
            resolve(parsedData);
          } catch (error) {
            reject(
              new Error(
                `Error parsing data for '${storageName}': ${error.message}`,
              ),
            );
          }
        } else {
          resolve([]); // Return an empty array if no data found for the specified storageName
        }
      }
    });
  });
}

export function saveData(storageName, data) {
  return new Promise((resolve, reject) => {
    const serializedData = JSON.stringify(data);
    chrome.storage.sync.set({ [storageName]: serializedData }, function () {
      if (chrome.runtime.lastError) {
        reject(
          new Error(
            `Error saving data for '${storageName}': ${chrome.runtime.lastError.message}`,
          ),
        );
      } else {
        resolve();
      }
    });
  });
}
