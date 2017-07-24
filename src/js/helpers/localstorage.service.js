function getLocalData(name) {
    return new Promise(resolve => {
        chrome.storage.local.get(data => {
            resolve(data);
        });
    });
}

function setLocalData(field, parent) {
    return new Promise (resolve => {
        
        const nodeName = field.name;
        const newObj = {};


        if (parent) {
            getLocalData(parent)
            .then(data => {
                data[parent].storage[nodeName] = field 
                chrome.storage.local.set(data, () => {
                    resolve(true);
                }); 
            });
        } else {
            newObj[nodeName] = field;

            chrome.storage.local.set(newObj, () => {
                resolve(true);
            }); 
        }
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

