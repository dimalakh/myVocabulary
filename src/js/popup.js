import { goToDiction, goToAddLang } from './helpers/navigation.js';
import { Word } from './models/word.js';

function init () {
    const errorIndicator = document.querySelector('#error');
    const okIndicator = document.querySelector('#ok');
    const dictionBtn = document.querySelector('#diction');
    const addLangBtn = document.querySelector('#addLang');
    const languages = document.querySelectorAll('.label');
    const addWord = document.querySelector('#addWord');
    const wordInput = document.querySelector('#word');
    const translationInput = document.querySelector('#translation');

    addLangBtn.addEventListener('click', goToAddLang);
    dictionBtn.addEventListener('click', goToDiction);
    addWord.addEventListener('click', addWordToDictionary);

    languages.forEach(lang => {
        lang.addEventListener('click', changeLang);
    });

    function changeLang () {
        languages.forEach(lang => {
            lang.classList.remove('active');
        });

        this.classList.add('active');
    }

    function addWordToDictionary () {
        const activeLangName = document.querySelector('.active').innerHTML;
        const word = new Word(wordInput.value, translationInput.value);

        word.create(activeLangName).then(result => {
            if (result === true)
                okIndicator.classList.add('active');

            if (result === false)
                errorIndicator.classList.add('active');

            setTimeout(() => {
                okIndicator.classList.remove('active');
                errorIndicator.classList.remove('active');
            }, 1000);
        });
    }

    // eslint-disable-next-line no-undef
    chrome.runtime.getBackgroundPage(() => {});
}

document.addEventListener('DOMContentLoaded', init);
