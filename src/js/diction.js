import { goToLearn } from './helpers/navigation.js';
import { getUserData, setUserData, saveLang } from './helpers/firebase.service.js';
import { Store } from './models/store.js';
import { Language } from './models/language.js';

function init () {
    const learnBtn = document.querySelector('#learn');
    // const store = new Store('ukrainian');
    const newLang = new Language('Ukrainian');
    saveLang();
    // store.addLanguage(newLang);
    // console.log(store);
    // setUserData(store);
    // getUserData().then(data => {
    //     const store = new Store('ukrainian');
    //     return store.fromData(data);
    // }).then(data => {
    //     console.log(data);
    // });

    learnBtn.addEventListener('click', goToLearn);

    // eslint-disable-next-line no-undef
    chrome.runtime.getBackgroundPage(() => {});
}

document.addEventListener('DOMContentLoaded', init);
