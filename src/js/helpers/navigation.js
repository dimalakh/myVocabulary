export function goToDiction () {
    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage({
        page: 'diction'
    });
}

export function goToLearn () {
    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage({
        page: 'learn'
    });
}