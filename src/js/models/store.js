import { Language } from 'language';

export class Store {
    constructor (basicLang) {
        this.basicLang = new Language(basicLang);
    }

    addLanguage (language) {
        Object.defineProperty(this, language, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Language(language)
        });
    }
}
