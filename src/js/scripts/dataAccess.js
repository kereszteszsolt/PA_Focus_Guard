export function loadData(storageName, defaultData) {
    const data = localStorage.getItem(storageName);
    let storedData = [];
    if (data) {
        storedData = JSON.parse(data);
    } else {
        storedData = defaultData;
    }
    return storedData;
}
