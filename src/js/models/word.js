import { save } from '../helpers/firebase.service.js';

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
            save(path, this).then(result => {
                resolve(result);
            });
        });
    }
}
