import { StorageService } from './storage.service.js';  

function init() {
    let checkBtn = document.querySelector('#check-btn');
    checkBtn.addEventListener('click', checkWord);

    displayWord();

    chrome.runtime.getBackgroundPage(function(bg) {
    if (bg.entryToLoad)
      loadEntry(bg.entryToLoad);
  });
}

function setTaskWord() {
    return StorageService.get().then(arr => {  
             let randomNumber = getRandomInt(0, arr.length);
             let randomWord = arr[randomNumber];
             return randomWord;
           });
}

function displayWord() {
    setTaskWord().then(word => {
        document.querySelector('#word-display').innerHTML = word.translation;
        document.querySelector('#word-display').dataset.correct = word.name;
    });
}

function checkWord() {
    let wordDisplay = document.querySelector('#word-display');
    let checkInpt = document.querySelector('#check-input');
     if(wordDisplay.dataset.correct === checkInpt.value) {
         console.log('ok');
         displayWord();
     } else {
         console.log('neok');
     }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener("DOMContentLoaded", init);