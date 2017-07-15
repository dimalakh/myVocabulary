import { goToDiction, goToAddLang } from './helpers/navigation.js';

function init () {
    const dictionBtn = document.querySelector('#diction');
    const addLangBtn = document.querySelector('#addLang');
    const languages = document.querySelectorAll('.label');

    addLangBtn.addEventListener('click', goToAddLang);
    dictionBtn.addEventListener('click', goToDiction);

    languages.forEach(lang => {
        lang.addEventListener('click', changeLang);
    });

    function changeLang () {
        languages.forEach(lang => {
            lang.classList.remove('active');
        });
        this.classList.add('active');
    }

    

    // eslint-disable-next-line no-undef
    chrome.runtime.getBackgroundPage(() => {});
}

document.addEventListener('DOMContentLoaded', init);
