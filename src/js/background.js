/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.page === 'diction')
        chrome.tabs.create({ url: chrome.extension.getURL('index.html') });
    if (message.page === 'learn')
        chrome.tabs.create({ url: chrome.extension.getURL('learn.html') });
});
/* eslint-enable no-undef */
