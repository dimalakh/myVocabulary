import { Language } from './models/language.js';
import { getData } from './helpers/firebase.service.js';

function init () {
    const input = document.querySelector('#language');
    const addBtn = document.querySelector('button');
    const okIndicator = document.querySelector('#ok');
    const tbody = document.querySelector('tbody');

    addBtn.addEventListener('click', addLanguage);

    render();

    function addLanguage () {
        const language = new Language(input.value);

        language.create().then(result => {
            if (result === true) {
                tbody.innerHTML += htmlField(language.name);
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

    function render () {
        getLanguageNames().then(languages => {
            tbody.innerHTML = '';
            languages.forEach((lang, index) => {
                tbody.innerHTML += htmlField(lang);

                const field = document.querySelector(`i[data-name='${lang}']`);

                field.addEventListener('click', remove);
            });
        });
    }

    function remove() {
        const name = this.getAttribute('data-name');
        const language = new Language(name);
        
        language.remove().then(()=> {
            render();
        });
    }

    // eslint-disable-next-line no-undef
    chrome.runtime.getBackgroundPage(() => {});
}

document.addEventListener('DOMContentLoaded', init);

function htmlField(name) {
    return (
        `<tr>
            <td width="50"></td>
            <td>${name}</th>
            <td width="50">
                <i class="remove icon delete" data-name='${name}'></i>
            </td>
        </tr>`
    )
}