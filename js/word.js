export class Word {
    constructor(wordName, translationValue) {
        this.name = wordName;
        this.translation = translationValue;
        this.time = Date.now();
    }
}