export class Word {
    constructor(wordName, translationValue) {
        this.name = wordName;
        this.translation = translationValue;
        this.tries = 0;
        this.correctAnswers = 0;
        this.time = Date.now();
    }
}