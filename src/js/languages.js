import { Language } from './models/language.js';
import { getData } from './helpers/firebase.service.js';

function init () {
    const input = document.querySelector('#language');
    const addBtn = document.querySelector('button');
    const indicator = document.querySelector('#indictor');
    const tbody = document.querySelector('tbody');

    addBtn.addEventListener('click', addLanguage);

    render();

    function addLanguage () {
        const language = new Language(input.value);

        language.create().then(result => {
            if (result === true) {
                indicator.innerHTML = 'Ok';
                tbody.innerHTML += `<tr>
                    <td width="50">${language.name}</td>
                    <td>Language</th>
                    <td width="50">
                        <i class="remove icon" data-name='${language.name}'></i>
                    </td>
                </tr>`;
            } else {
                indicator.innerHTML = 'Error, min length 1 symbol';
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
            languages.forEach(lang => {
                tbody.innerHTML += `<tr>
                    <td width="50">${lang}</td>
                    <td>Language</td>
                    <td width="50">
                        <i class="remove icon" data-name='${lang}'></i>
                    </td>
                </tr>`;
            });
        });
    }

    // eslint-disable-next-line no-undef
    chrome.runtime.getBackgroundPage(() => {});
}

document.addEventListener('DOMContentLoaded', init);
