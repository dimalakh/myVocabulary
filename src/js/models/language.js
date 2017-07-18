import { save, remove, getData } from '../helpers/firebase.service.js';

export class Language {
    constructor (name) {
        this.name = name;
        this.active = false;
        this.flag = name + '.png';
        this.storage = {};
    }

    create () {
        return new Promise(resolve => {
            const path = `${this.name}`;

            if (this.name.length >= 1) {
                save(path, this).then(result => {
                    resolve(result);
                });
            } else {
                resolve(false);
            }
        });
    }

    load () {
        const path = `${this.name}`;

        return new Promise(resolve => {
            getData(path).then(data => {
                Object.assign(this, data);

                resolve(this);
            });
        });
    }

    remove () {
        const path = '';

        return new Promise(resolve => {
            remove(this.name, path).then(result => {
                resolve(result);
            });
        });
    }

    addWord (word) {
        this.storage.push(word);
    }
}
