import { goToDiction } from './helpers/navigation.js';

function init () {
    let dictionBtn = document.querySelector('#diction');

    dictionBtn.addEventListener('click', goToDiction);

    // eslint-disable-next-line no-undef
    chrome.runtime.getBackgroundPage(() => {});
}

document.addEventListener('DOMContentLoaded', init);
