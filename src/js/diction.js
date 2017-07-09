import firebase, { initAuth } from './auth.js';
import { goToLearn } from './helpers/navigation.js';
import { gcService } from './helpers/gcservice.js';

function init () {
    initAuth();

    const learnBtn = document.querySelector('#learn');

    learnBtn.addEventListener('click', goToLearn);

    // eslint-disable-next-line no-undef
    chrome.runtime.getBackgroundPage(() => {});

    const basicStore = gcService.createStore('esk');
    gcService.getStore()
    .then(data => console.log(data));
    gcService.updateStore(basicStore);
    // setTimeout(() => {
    //     gcService.getStore()
    //     .then(data => console.log(data));
    // }, 10000);
}

document.addEventListener('DOMContentLoaded', init);
