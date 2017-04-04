import { StorageService } from './storage.service.js';  

function init() {
    let wordInpt = document.querySelector('#word-inpt');
    let CheckBtn = document.querySelector('#check-btn');

    displayTask();
    chrome.runtime.getBackgroundPage(function(bg) {
    if (bg.entryToLoad)
      loadEntry(bg.entryToLoad);
  });
}

function createTask() {
    let randomWord = {};
    StorageService.get().then(arr => {
        let randomNumber = getRandomInt(0, arr.length);
        let tempArr = arr[randomNumber];
        for(let prop in tempArr) {
            Object.defineProperty(randomWord, prop, {
                value: tempArr[prop]
            });
        }
    });
    return randomWord;
}

function displayTask() {
    let word = createTask();
    //document.querySelector('#word-display').innerHTML = word[translation];
    console.log(word);
}



function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener("DOMContentLoaded", init);