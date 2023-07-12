export function loadData(storageName, defaultData) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(storageName, (data) => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
            } else {
                const serializedData = data[storageName];
                if (serializedData) {
                    try {
                        const parsedData = JSON.parse(serializedData);
                        resolve(parsedData);
                    } catch (error) {
                        reject(new Error(`Error parsing data for '${storageName}': ${error.message}`));
                    }
                } else {
                    resolve(defaultData);
                }
            }
        });
    });
}

export function saveData(storageName, data) {
    return new Promise((resolve, reject) => {
        const serializedData = JSON.stringify(data);
        chrome.storage.sync.set({ [storageName]: serializedData }, () => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
            } else {
                resolve();
            }
        });
    });
}
