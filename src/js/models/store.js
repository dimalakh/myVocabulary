import { Language } from './language.js';

export class Store {
    constructor (basicLang) {
        this.basicLang = new Language(basicLang);
    }

    addLanguage (language) {
        Object.defineProperty(this, language.name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: language
        });
    }
}
