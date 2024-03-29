export function loadData(storageName: string) {
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
          } catch (error: any) {
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
