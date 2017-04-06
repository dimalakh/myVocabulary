import { StorageService } from './storage.service.js';  

function init() {
    displayWord();
    chrome.runtime.getBackgroundPage(function(bg) {
         if (bg.entryToLoad) loadEntry(bg.entryToLoad);
    });
}

function displayWord() {
    StorageService.getRandomWord().then(word => {
        let skipBtn = document.querySelector('#skip-btn');
        let checkBtn = document.querySelector('#check-btn');
        document.querySelector('#word-display').innerHTML = word.translation;
        skipBtn.addEventListener('click', displayWord);
        checkBtn.addEventListener('click', function() {
            checkWord(word);
        });
    });
}

function checkWord(word) {
    let item = {};
    let checkInpt = document.querySelector('#check-input');
    item[word.name] = word;
    item[word.name].tries += 1;
     if(word.name === checkInpt.value) { 
         item[word.name].correctAnswers += 1;
         chrome.storage.local.set(item, function(){
             clearInput();
         });
         displayWord();
     } else {
         chrome.storage.local.set(item, function(){});
     }
     console.log(item[word.name]);
}

// clear value of all inputs on the page
function clearInput() {
  document.querySelectorAll('input').forEach(inpt => {
    inpt.value = '';
  });
}



document.addEventListener("DOMContentLoaded", init);