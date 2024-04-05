declare const chrome: any;
export const fetchList = <T>(storageName: string): Promise<T[]> => {
  return new Promise<T[]>((resolve) => {
    chrome.storage.local.get([storageName], (result: any) => {
      // Check if the storage item is undefined and resolve with an empty array if so
      if (result[storageName] === undefined) {
        resolve([]);
        return;
      }

      try {
        // Attempt to parse the stored JSON string
        const parsedResult = JSON.parse(result[storageName]);
        // Ensure the parsed result is an array before resolving
        if (Array.isArray(parsedResult)) {
          resolve(parsedResult);
        } else {
          console.error(`Expected an array for "${storageName}", but received a different type.`);
          resolve([]); // Resolve with an empty array if the parsed result is not an array
        }
      } catch (error) {
        // Log parsing errors and resolve with an empty array
        console.error(`Error parsing storage entry "${storageName}":`, error);
        resolve([]);
      }
    });
  });
};

export const saveList = <T>(storageName: string, data: T[]): Promise<void> => {
    return new Promise<void>((resolve) => {
        chrome.storage.local.set({ [storageName]: JSON.stringify(data)}, () => {
            resolve();
        });
    });
}

export const fetchEntry = <T>(storageName: string, defaultValue: T = {} as T): Promise<T> => {
  return new Promise<T>((resolve) => {
    chrome.storage.local.get([storageName], (result: any) => {
      if (result[storageName] === undefined) {
        resolve(defaultValue);
        return;
      }

      try {
        const parsedResult = JSON.parse(result[storageName]);
        resolve(parsedResult);
      } catch (error) {
        console.error(`Error parsing storage entry "${storageName}":`, error);
        resolve(defaultValue); // Resolve with the default value in case of error
      }
    });
  });
};

export const saveEntry = <T>(storageName: string, data: T): Promise<void> => {
    return new Promise<void>((resolve) => {
        chrome.storage.local.set({ [storageName]: JSON.stringify(data)}, () => {
            resolve();
        });
    });
}

export const readSize = (storageName: string): Promise<number> => {
  return new Promise<number>((resolve) => {
    chrome.storage.local.get([storageName], (result: {[key: string]: any}) => {
      // Check if the item exists in storage
      if (result[storageName] !== undefined) {
        // Proceed if the data exists
        try {
          const dataString = result[storageName];
          const size = new Blob([dataString]).size; // Calculate the size of the data
          resolve(size); // Resolve with the size
        } catch (error) {
          console.error(`Error calculating size for storage item "${storageName}":`, error);
          resolve(0); // Resolve with 0 in case of an error
        }
      } else {
        // If the item doesn't exist, resolve with 0
        console.log(`No data found for "${storageName}", returning size 0.`);
        resolve(0);
      }
    });
  });
};
