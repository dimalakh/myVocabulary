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

    fromData (data) {
        const temp = Object.assign(this, data);
        Object.keys(temp).forEach(key => {
            this[key] = Object.assign(new Language, this[key]);
        });

        return temp;
    }
}
