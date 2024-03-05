declare const chrome: any;
export const fetchList = <T>(storageName: string): Promise<T[]>=> {
    return new Promise<T[]>((resolve) => {
        chrome.storage.local.get([storageName], (result: any) => {
            resolve(JSON.parse(result[storageName]) || []);
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

export const fetchEntry = <T>(storageName: string): Promise<T>=> {
    return new Promise<T>((resolve) => {
        chrome.storage.local.get([storageName], (result: any) => {
            resolve(JSON.parse(result[storageName]) || {});
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
      const dataString = result[storageName];
      const size = new Blob([dataString]).size;
      resolve(size);
    });
  });
}
