import { save, getData } from '../helpers/firebase.service.js';

export class Language {
    constructor (name) {
        this.name = name;
        this.flag = name + '.png';
        this.storage = {};
    }

    create () {
        return new Promise(resolve => {
            const path = `${this.name}`;

            save(path, this).then(result => {
                resolve(result);
            });
        });
    }

    load () {
        const path = `${this.name}`;

        getData(path).then(data => {
            Object.assign(this, data);
        });
    }

    addWord (word) {
        this.storage.push(word);
    }
}
