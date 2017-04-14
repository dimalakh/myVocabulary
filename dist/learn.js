(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _storageService = require('./storage.service.js');

function init() {
    displayWord();
    chrome.runtime.getBackgroundPage(function (bg) {
        if (bg.entryToLoad) loadEntry(bg.entryToLoad);
    });
}

function displayWord() {
    var skipBtn = document.querySelector('#skip-btn');
    var checkBtn = document.querySelector('#check-btn');

    _storageService.StorageService.getRandomWord().then(function (word) {
        document.querySelector('#word-display').innerHTML = word.translation;
        skipBtn.addEventListener('click', displayWord);
        checkBtn.addEventListener('click', function cheking() {
            if (checkWord(word) == true) {
                checkBtn.removeEventListener('click', cheking);
            }
        });
    });
}

function checkWord(word) {
    var item = {};
    var checkInpt = document.querySelector('#check-input');
    item[word.name] = word;
    item[word.name].tries += 1;

    if (word.name == checkInpt.value) {
        item[word.name].correctAnswers += 1;
        chrome.storage.sync.set(item, function () {
            clearInput();
            showResult(true);
        });
        setTimeout(function () {
            displayWord();
        }, 1200);
        return true;
    } else {
        chrome.storage.sync.set(item, function () {
            showResult('negative');
        });
        return false;
    }
    console.log(item[word.name]);
}

// clear value of all inputs on the page
function clearInput() {
    document.querySelectorAll('input').forEach(function (inpt) {
        inpt.value = '';
    });
}

//show result of words checking (change body bg-color)
function showResult(state) {
    var body = document.querySelector('body');
    var inputOuter = document.querySelector('.input');
    var wordDisplay = document.querySelector('#word-display');

    if (state == true) {
        inputOuter.classList.remove('error');
        body.classList.add('correct');
    } else {
        inputOuter.classList.add('error');
        wordDisplay.classList.add('shake', 'animated');
    }

    setTimeout(function () {
        body.classList.remove('correct');
        wordDisplay.classList.remove('shake', 'animated');
    }, 1200);
}

document.addEventListener("DOMContentLoaded", init);
},{"./storage.service.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StorageService = undefined;

var _word = require('./word.js');

var StorageService = exports.StorageService = {
    get: function get() {
        return new Promise(function (resolved, rejected) {
            chrome.storage.sync.get(function (data) {
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
        chrome.storage.sync.remove(name);
    },
    getRandomInt: function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
};
},{"./word.js":3}],3:[function(require,module,exports){
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
},{}]},{},[1])