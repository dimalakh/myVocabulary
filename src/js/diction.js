import { getLocalData, compareStorages } from './helpers/localstorage.service.js';
import { goToLearn } from './helpers/navigation.js';
import { Language } from './models/language.js';
import { Word } from './models/word.js';

function init () {
    const learnBtn = document.querySelector('#learn');
    compareStorages();

    getLocalData()
    .then(data => {
        Object.keys(data).forEach(lang => {
            if (data[lang].active === true) {
                const language = new Language(lang);

                language.load().then(data => {
                    render(data);
                });
            }
        })
    });

    learnBtn.addEventListener('click', goToLearn);

    // eslint-disable-next-line no-undef
    chrome.runtime.getBackgroundPage(() => {});
}

function htmlField (name, translation) {
    return (
            `<tr>
                <td width="50">-</td>
                    <td>${name}</td>
                    <td>${translation}</td>
                    <td width="50">
                        <i class="remove icon delete" data-name='${name}'></i>
                    </td>
            </tr>`
    );
}

function render (data) {
    const tbody = document.querySelector('tbody');

    Object.keys(data.storage).forEach(key => {
        const word = data.storage[key];

        tbody.innerHTML += htmlField(word.name, word.translation);
        const field = document.querySelector(`i[data-name='${word.name}']`);

        field.addEventListener('click', remove);
    });
}

function remove () {
    const name = this.getAttribute('data-name');
    const word = new Word(name);
    
    word.remove('English');
}

document.addEventListener('DOMContentLoaded', init);
