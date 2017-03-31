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
}


function output(){
  let wordArray = Array.from(StorageService.get());
  console.log(wordArray);
  wordArray.forEach(el => {
    document.querySelector('tbody').innerHTML += `<tr><td> 1 </td><td> ${el.name} </td><td> ${el.translation} </td></tr>`;
  });
}

function diction(){
  chrome.runtime.sendMessage({page: 'diction'});
}
function learn(){
  chrome.runtime.sendMessage({page: 'learn'});
}

function write(){
  var item = {};
  var word = document.querySelector('#word').value;
  var translation = document.querySelector('#translation').value;
  var obj = new Word(word, translation);
  item[word] =  obj;

  chrome.storage.local.set(item, function() {
    document.querySelector('tbody').innerHTML = '';
    output();
  });
}

document.addEventListener("DOMContentLoaded", init)
