import { saveData, removeData } from '../services/firebase'
import { setLocalData } from '../services/local'
import { Language } from './language.js';

export class Word {
  constructor (word, translation) {
    this.name = word;
    this.translation = translation;
    this.tries = 0;
    this.correctAnswers = 0;
    this.time = Date.now();
  }

  create (lang) {
    const path = `${lang}/storage/${this.name}`;

    return new Promise(resolve => {
      saveData(path, this).then(result => {
        resolve(result);
      });

      setLocalData(this, lang);
    });
  }

  remove (lang) {
    const path = `${lang}/storage`;

    return new Promise(resolve => {
      // eslint-disable-next-line no-undef
      chrome.storage.local.get(lang, data => {
        const tempLang = data[lang];
        const word = this.name;
        const laguage = new Language(lang);

        delete tempLang.storage[word];
        Object.assign(laguage, tempLang);
        setLocalData(laguage);

        removeData(this.name, path).then(result => {
          resolve(result);
        });
      });
    });
  }
}
