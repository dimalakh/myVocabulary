export class Language {
    constructor (name) {
        this.name = name;
        this.flag = name + '.png';
        this.storage = [];
    }

    addWord (word) {
        this.storage.push(word);
    }
}
