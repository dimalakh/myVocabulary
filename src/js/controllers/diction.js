import { getLocalData } from '../services/local'
import { compareStorages } from '../services/firebase'
import { htmlTableField } from '../helpers/ui-elements.js';
import { langThumbler } from './shared.js';
import { Word } from '../models/word.js';
import { Language } from '../models/language.js';

export function render () {
  compareStorages();

  getLocalData()
  .then(data => {
    Object.keys(data.languages).forEach(lang => {
      if (data.languages[lang].active === true) {
        const language = new Language(lang);
        
        spinner();

        language.load().then(langData => {
          console.log(langData)
          wordList(langData);
        });
      }
    });

    langThumbler(data.languages);
  });
}

function wordList (data) {
  const tbody = document.querySelector('tbody');
  const table = document.querySelector('table');
  const spinner = document.querySelector('.spinner-wrap');

  spinner.style.display = 'none';
  table.style.opacity = 1;
  tbody.innerHTML = '';

  Object.keys(data.storage).forEach((key, index) => {
    const word = data.storage[key];

    tbody.appendChild(htmlTableField(index + 1, word.name, word.translation));

    const field = document.querySelector(`i[data-name='${word.name}']`);

    field.addEventListener('click', removeWord);
  });
}

function spinner () {
  const table = document.querySelector('table');
  const spinner = document.querySelector('.spinner-wrap');

  table.style.opacity = 0;
  spinner.style.display = 'flex';
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
