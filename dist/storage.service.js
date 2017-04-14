'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StorageService = undefined;

var _word = require('./word.js');

var StorageService = exports.StorageService = {
    get: function get() {
        return new Promise(function (resolved, rejected) {
            chrome.storage.local.get(function (data) {
                resolved(data);
            });
        }).then(function (data) {
            var tempArr = [];
            for (var prop in data) {
                tempArr.push(data[prop]);
            }
            tempArr.sort(function (a, b) {
                return b.time - a.time;
            });
            return tempArr;
        });
    },
    getRandomWord: function getRandomWord() {
        var _this = this;

        return this.get().then(function (arr) {
            var randomNumber = _this.getRandomInt(0, arr.length);
            var randomWord = arr[randomNumber];
            return randomWord;
        });
    },
    removeWord: function removeWord(name) {
        chrome.storage.local.remove(name);
    },
    getRandomInt: function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
};