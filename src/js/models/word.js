export class Word {
    constructor (word, translation) {
        this.name = word;
        this.translation = translation;
        this.tries = 0;
        this.correctAnswers = 0;
        this.time = Date.now();
    }
}
