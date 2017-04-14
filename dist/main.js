(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _word = require('./word.js');

var _storageService = require('./storage.service.js');

var currentEntry = null;

function init(entry) {
  output();
  var writeBtn = document.querySelector('#write');
  var dictionBtn = document.querySelector('#diction');
  var learnBtn = document.querySelector('#learn');

  writeBtn.addEventListener('click', write);
  dictionBtn.addEventListener('click', diction);
  learnBtn.addEventListener('click', learn);

  chrome.runtime.getBackgroundPage(function (bg) {
    if (bg.entryToLoad) loadEntry(bg.entryToLoad);
  });
}

// delete word from storage
function deleteWord() {
  _storageService.StorageService.removeWord(this.dataset.name);
}

// clear value of all inputs on the page
function clearInput() {
  document.querySelectorAll('input').forEach(function (inpt) {
    inpt.value = '';
  });
}

// get data from input and set it in storage
function write() {
  var item = {};
  var word = document.querySelector('#word').value;
  var translation = document.querySelector('#translation').value;

  if (word.length < 2 || translation.length < 2) {
    nag('Type corect word.', 'rgba(255, 0, 0, 0.44)');
    return 0;
  }

  item[word] = new _word.Word(word, translation);
  chrome.storage.sync.set(item, function () {
    output();
    nag(word + ' is added.', 'rgba(181, 204, 24, 0.52)');
    clearInput();
  });
}

// render table
function output() {
  _storageService.StorageService.get().then(function (data) {
    document.querySelector('tbody').innerHTML = "";
    data.forEach(function (el, index) {
      index++;
      document.querySelector('tbody').innerHTML += '<tr><td>' + index + '</td><td> ' + el.name + ' </td><td> ' + el.translation + '</td><td>' + el.correctAnswers + '/' + el.tries + '</td><td><i class="icon remove delete" data-name="' + el.name + '"></i></td></tr>';
    });
    // adds EventListener for all delete buttons
    var deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach(function (el) {
      el.addEventListener('click', deleteWord);
    });
  });
}

//show/hide pop-up messages
function nag(message, color) {
  var nag = document.querySelector('.nag');
  nag.style.display = 'block';
  nag.style.backgroundColor = color;
  nag.children[0].innerHTML = message;

  setTimeout(function () {
    nag.style.display = 'none';
  }, 2000);
}

// Send messages to BackgroundPage, navigation between pages
function diction() {
  chrome.runtime.sendMessage({ page: 'diction' });
}
function learn() {
  chrome.runtime.sendMessage({ page: 'learn' });
}

document.addEventListener("DOMContentLoaded", init);
chrome.storage.onChanged.addListener(function (changes) {
  return output();
});
},{"./storage.service.js":2,"./word.js":3}],2:[function(require,module,exports){
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