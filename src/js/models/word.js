import { saveData, removeData } from '../helpers/firebase.service.js';
import { setLocalData } from '../helpers/localstorage.service.js';

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
            removeData(this.name, path).then(result => {
                resolve(result);
            });
        });
    }
}
