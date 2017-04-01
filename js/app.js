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
  StorageService.output();
}


function diction(){
  chrome.runtime.sendMessage({page: 'diction'});
}
function learn(){
  chrome.runtime.sendMessage({page: 'learn'});
}

function write(){
  let item = {};
  let word = document.querySelector('#word').value;
  let translation = document.querySelector('#translation').value;
  let obj = new Word(word, translation);
  item[word] =  obj;

  chrome.storage.local.set(item, function() {
    StorageService.output()
  });
}

document.addEventListener("DOMContentLoaded", init);
