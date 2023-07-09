export function loadData(storageName, defaultData) {
    let result;
    const storedData = chrome.storage.sync.get(
        storageName,
        function (data) {}
    );
    if (storedData) {
        result = JSON.parse(storedData);
    } else {
        result = defaultData;
    }
    return result;
}

export function saveData(storageName, data) {
    chrome.storage.sync.set({
            [storageName]: JSON.stringify(data)
        },
        function () {
        }
    );
}
