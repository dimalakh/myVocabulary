import { goToLearn } from './helpers/navigation.js';

function init () {
    let learnBtn = document.querySelector('#learn');

    learnBtn.addEventListener('click', goToLearn);

    // eslint-disable-next-line no-undef
    chrome.runtime.getBackgroundPage(() => {});
}

document.addEventListener('DOMContentLoaded', init);
