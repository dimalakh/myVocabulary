import { Word } from './word.js';
import { StorageService } from './storage.service.js';  

var currentEntry = null;

function init(entry) {
  output();
  let writeBtn = document.querySelector('#write');
  let dictionBtn = document.querySelector('#diction');
  let learnBtn = document.querySelector('#learn');

  writeBtn.addEventListener('click', write);
  dictionBtn.addEventListener('click', diction);
  learnBtn.addEventListener('click', learn);
  
  chrome.runtime.getBackgroundPage(function(bg) {
    if (bg.entryToLoad)
      loadEntry(bg.entryToLoad);
  });
}

// delete word from storage
function deleteWord() {
  StorageService.removeWord(this.dataset.name);
}

// clear value of all inputs on the page
function clearInput() {
  document.querySelectorAll('input').forEach(inpt => {
    inpt.value = '';
  });
}

// get data from input and set it in storage
function write() {
  let item = {};
  let word = document.querySelector('#word').value;
  let translation = document.querySelector('#translation').value;
  
  if(word.length < 2 || translation.length < 2) {
    return 0;
  }

  item[word]  = new Word(word, translation);
  chrome.storage.local.set(item, function(){
    output();
    clearInput();
  });
}

// render table
function output() {
  StorageService.get()
  .then(data => {
      document.querySelector('tbody').innerHTML = "";
      data.forEach((el, index) => {
        index++;
        document.querySelector('tbody').innerHTML += `<tr><td>${index}</td><td> ${el.name} </td><td> ${el.translation}</td><td>${el.correctAnswers}/${el.tries}</td><td><i class="icon remove delete" data-name="${el.name}"></i></td></tr>`;
      });
      // adds EventListener for all delete buttons
      let deleteBtns = document.querySelectorAll('.delete');
      deleteBtns.forEach(el => {
        el.addEventListener('click', deleteWord);
      });
      console.log(data);
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
chrome.storage.onChanged.addListener(changes => output());