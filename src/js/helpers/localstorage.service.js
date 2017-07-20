function getLocalData(name) {
    return new Promise(resolve => {
        chrome.storage.local.get(data => {
            resolve(data);
        });
    });
}

function setLocalData(data, parent) {
    return new Promise (resolve => {

        if (parent) {
            parent.storage = data;
            data = parent;
        }

        const nodeName = data.name;
        const newObj = {};

        newObj[nodeName] = data;

       chrome.storage.local.set(newObj, () => {
            resolve(true);
        }); 
    });
}

function removeLocalData(key) {
    return new Promise(resolve => {
        chrome.storage.local.remove(key, (result) => {
            resolve(result);
        });
    });
}

export { getLocalData, setLocalData, removeLocalData };

