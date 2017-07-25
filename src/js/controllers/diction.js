import { setLocalData, getLocalData, compareStorages } from '../helpers/localstorage.service.js';
import { htmlTableField } from '../helpers/ui-elements.js';
import { langThumbler, changeLang } from './shared.js'
import { Word } from '../models/word.js';
import { Language } from '../models/language.js';

export function render() {
    compareStorages();

    getLocalData()
    .then(data => {
        Object.keys(data).forEach(lang => {
            if (data[lang].active === true) {
                const language = new Language(lang);

                language.load().then(langData => {
                    wordList(langData);
                });
            }
        });

        langThumbler(data);
    });
}

function wordList (data) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    Object.keys(data.storage).forEach((key, index) => {
        const word = data.storage[key];

        tbody.appendChild(htmlTableField(index + 1, word.name, word.translation ));

        const field = document.querySelector(`i[data-name='${word.name}']`);

        field.addEventListener('click', removeWord);
    });
}

function removeWord () {
    const name = this.getAttribute('data-name');
    const word = new Word(name);

    getLocalData().then(data => {
        Object.keys(data).forEach(lang => {
            if (data[lang].active === true) {
                word.remove(lang).then(() => {
                    compareStorages();
                });
            }
        });
    });
}



