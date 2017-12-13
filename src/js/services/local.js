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
