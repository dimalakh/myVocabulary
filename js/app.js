import { Word } from './word.js';
import { StorageService } from './storage.service.js';  

var currentEntry = null;

function init(entry) {
  let writeBtn = document.querySelector('#write');
  //let dictionBtn = document.querySelector('#diction');
  let learnBtn = document.querySelector('#learn');
  
  writeBtn.addEventListener('click', write);
  //dictionBtn.addEventListener('click', diction);
  learnBtn.addEventListener('click', learn);

  chrome.runtime.getBackgroundPage(function(bg) {
    if (bg.entryToLoad)
      loadEntry(bg.entryToLoad);
  });
  output();
  StorageService.removeWord('word');
}

function write() {
  let item = {};
  let word = document.querySelector('#word').value;
  let translation = document.querySelector('#translation').value;
  item[word]  = new Word(word, translation);
  chrome.storage.local.set(item, output());
}

function deleteWord(e) {
  StorageService.removeWord(name);
}

function output() {
  StorageService.get()
  .then(data => {
      document.querySelector('tbody').innerHTML = "";
      data.forEach((el, index) => {
        index++;
        document.querySelector('tbody').innerHTML += `<tr><td>${index}</td><td> ${el.name} </td><td> ${el.translation}</td><td><button class="ui button" id="delete"><i class="large remove circle icon"></i></button></td></tr>`;
      });
  });
}

// Send messages to BackgroundPage, navigation between pages
function diction(){
  chrome.runtime.sendMessage({page: 'diction'});
}
function learn(){
  chrome.runtime.sendMessage({page: 'learn'});
}

document.addEventListener("DOMContentLoaded", init);
