import { htmlTableField } from '../helpers/ui-elements.js';
import { getData } from '../helpers/firebase.service.js';
import { Language } from '../models/language.js';

export function render () {
    getLanguageNames().then(languages => {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
        languages.forEach((lang, index) => {
            tbody.appendChild(htmlTableField(index + 1, lang));

            const field = document.querySelector(`i[data-name='${lang}']`);

            field.addEventListener('click', remove);
        });
    });
}

export function addLanguage () {
    const tbody = document.querySelector('tbody');
    const input = document.querySelector('#language');
    const okIndicator = document.querySelector('#ok');
    const language = new Language(input.value);

    language.create().then(result => {
        if (result === true) {
            tbody.appendChild(htmlTableField(0, language.name));
            okIndicator.classList.add('active');

            const field = document.querySelector(`i[data-name='${language.name}']`);

            field.addEventListener('click', remove);

            setTimeout(() => {
                okIndicator.classList.remove('active');
            }, 1000);
        } else {
            okIndicator.innerHTML = 'Error, min length 1 symbol';
        }
    });
}

function getLanguageNames () {
    return new Promise(resolve => {
        getData().then(data => {
            const tempArr = [];
            Object.keys(data).forEach(key => {
                tempArr.push(key);
            });

            resolve(tempArr);
        });
    });
}

function remove() {
    const name = this.getAttribute('data-name');
    const language = new Language(name);
        
    language.remove();
}