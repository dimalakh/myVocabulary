import { firebaseGet } from './firebase'

const requestBuilder = (type, callback) => {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    chrome.storage.local[type](data => callback(data, resolve))
  })
}

export const getLocalData = () => 
  requestBuilder('get', (data, resolve) => resolve(data))

export const setLocalData = field => 
  requestBuilder('set', (field, resolve) => resolve(true))

export const removeLocalData = field =>
  requestBuilder('remove', (field, resolve) => resolve(true))


function compareStorages () {
    return new Promise(resolve => {
        getLocalData().then(localData => {
            firebaseGet().then(remoteData => {
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

export { compareStorages };

