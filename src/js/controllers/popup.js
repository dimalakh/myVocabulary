import { getLocalData } from '../services/local'
import { compareStorages } from '../services/firebase'
import { langThumbler } from './shared.js';
import { Word } from '../models/word.js';


export function render () {
  compareStorages();

  getLocalData().then(data => {
    langThumbler(data);
  });
}

export function addToDictionary () {
  const wordInput = document.querySelector('#word');
  const translationInput = document.querySelector('#translation');
  const errorIndicator = document.querySelector('#error');
  const okIndicator = document.querySelector('#ok');
  const activeLangName = document.querySelector('.active').innerHTML;
  const word = new Word(wordInput.value, translationInput.value);

  word.create(activeLangName).then(result => {
    if (result === true) {
      okIndicator.classList.add('active');
      wordInput.value = '';
      translationInput.value = '';
    }

    if (result === false) {
      errorIndicator.classList.add('active');
    }

    setTimeout(() => {
      okIndicator.classList.remove('active');
      errorIndicator.classList.remove('active');
    }, 1000);
  });
}
