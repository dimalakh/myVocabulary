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
  chrome.storage.local.set(item, function () {
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