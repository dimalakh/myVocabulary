export function setLocalStore (data) {
    /* eslint-disable no-undef */
    return new Promise(resolve => {
        chrome.storage.local.set(data, () => {
            resolve(data);
        });
    });
    /* eslint-enable no-undef */
}

export function getLocalStore (key) {
    /* eslint-disable no-undef */
    return new Promise(resolve => {
        chrome.storage.local.get(key, data => {
            resolve(data);
        });
    });
    /* eslint-enable no-undef */
}

export function compareStores (remoteStore) {
    return new Promise(resolve => {
        getLocalStore().then(localStore => {
            const local = JSON.stringify(localStore);
            const remote = JSON.stringify(remoteStore);

            if (local !== remote)
                resolve(true);
        });
    });
}
