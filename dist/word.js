"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Word = exports.Word = function Word(wordName, translationValue) {
    _classCallCheck(this, Word);

    this.name = wordName;
    this.translation = translationValue;
    this.tries = 0;
    this.correctAnswers = 0;
    this.time = Date.now();
};