import { getData } from './firebase.service.js';

function getLocalData () {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.get(data => {
      resolve(data);
    });
  });
}

function setLocalData (field, parent) {
  return new Promise(resolve => {
    const nodeName = field.name;
    const newObj = {};

    if (parent) {
      getLocalData(parent)
      .then(data => {
        data[parent].storage[nodeName] = field;
        // eslint-disable-next-line no-undef
        chrome.storage.local.set(data, () => {
          resolve(true);
        });
      });
    } else {
      newObj[nodeName] = field;

      // eslint-disable-next-line no-undef
      chrome.storage.local.set(newObj, () => {
        resolve(true);
      });
    }
  });
}

function removeLocalData (key) {
    return new Promise(resolve => {
        chrome.storage.local.remove(key, result => {
            resolve(result);
        });
    });
}

function compareStorages () {
    return new Promise(resolve => {
        getLocalData().then(localData => {
            getData().then(remoteData => {
                const localJSON = JSON.stringify(localData);
                const remoteJSON = JSON.stringify(remoteData);
                
                if (localJSON === remoteJSON) {
                    resolve(true);
                } else {
                    chrome.storage.local.set(remoteData, () => {
                        resolve(false);
                    });
                }
            });
        });
    });
}

export { getLocalData, setLocalData, removeLocalData, compareStorages };

