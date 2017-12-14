const requestBuilder = (type, field, callback) => {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    chrome.storage.local[type](field, data => callback(resolve))
  })
}

export const getLocalData = () => new Promise(resolve => {
  // eslint-disable-next-line no-undef
  return chrome.storage.local.get(data => resolve(data))
})

export const setLocalData = field => {
  const { name } = field
  const dataToSave = {}
  dataToSave[name] = field

  return requestBuilder('set', dataToSave, resolve => resolve(true))
}

export const removeLocalData = field =>
  requestBuilder('remove', field, resolve => resolve(true))
