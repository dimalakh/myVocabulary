export const goToDiction = () => {
  // eslint-disable-next-line no-undef
  chrome.runtime.sendMessage({
    page: 'diction'
  })
}

export const goToLearn = () => {
  // eslint-disable-next-line no-undef
  chrome.runtime.sendMessage({
    page: 'learn'
  })
}

export const goToAddLang = () => {
  // eslint-disable-next-line no-undef
  chrome.runtime.sendMessage({
    page: 'languages'
  })
}
