import { goToDiction, goToAddLang } from './helpers/navigation.js';
import { render, addToDictionary } from './controllers/popup.js';

function init () {
    const dictionBtn = document.querySelector('#diction');
    const addLangBtn = document.querySelector('#addLang');
    const addWord = document.querySelector('#addWord');

    addLangBtn.addEventListener('click', goToAddLang);
    dictionBtn.addEventListener('click', goToDiction);
    addWord.addEventListener('click', addToDictionary);

    render();

    // eslint-disable-next-line no-undef
    chrome.runtime.getBackgroundPage(() => {});
}

document.addEventListener('DOMContentLoaded', init);


