import { goToLearn } from './helpers/navigation.js';
import { getUserData } from './helpers/firebase.service.js';
import { Store } from './models/store.js';

function init () {
    const learnBtn = document.querySelector('#learn');

    getUserData().then(data => {
        const store = new Store('ukrainian');
        return store.fromData(data);
    });

    learnBtn.addEventListener('click', goToLearn);

    // eslint-disable-next-line no-undef
    chrome.runtime.getBackgroundPage(() => {});
}

document.addEventListener('DOMContentLoaded', init);
