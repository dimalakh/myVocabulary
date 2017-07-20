import { goToDiction, goToAddLang } from './helpers/navigation.js';
import { getLocalData } from './helpers/localstorage.service.js';
import { Word } from './models/word.js';
import { Language } from './models/language.js';

function init () {
    const errorIndicator = document.querySelector('#error');
    const okIndicator = document.querySelector('#ok');
    const dictionBtn = document.querySelector('#diction');
    const addLangBtn = document.querySelector('#addLang');
    const addWord = document.querySelector('#addWord');
    const wordInput = document.querySelector('#word');
    const translationInput = document.querySelector('#translation');

    addLangBtn.addEventListener('click', goToAddLang);
    dictionBtn.addEventListener('click', goToDiction);
    addWord.addEventListener('click', addWordToDictionary);

    getLocalData().then(data => {
        const header = document.querySelector('.header');

        Object.keys(data).forEach(lang => {
            const elem = document.createElement("div")
            console.log(data[lang]);
            elem.innerHTML = lang;
            elem.classList.add('ui', 'red', 'horizontal', 'label');

            if (data[lang].active === true) {
                 elem.classList.add('active');
            }
            
            header.appendChild(elem);
            elem.addEventListener('click', changeLang);
        })
    });

    function changeLang () {
        const languages = document.querySelectorAll('.label');
        const langName = this.innerHTML;
        const language = new Language(langName);

        languages.forEach(lang => {
            lang.classList.remove('active');
        });
        language.update({ active: true });
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
