import { StorageService } from './storage.service.js';  

function init() {
    displayWord();
    chrome.runtime.getBackgroundPage(function(bg) {
         if (bg.entryToLoad) loadEntry(bg.entryToLoad);
    });
}

function displayWord() {
    let skipBtn = document.querySelector('#skip-btn');
    let checkBtn = document.querySelector('#check-btn');

    StorageService.getRandomWord().then(word => {
        document.querySelector('#word-display').innerHTML = word.translation;
        skipBtn.addEventListener('click', displayWord);
        checkBtn.addEventListener('click', function cheking() {
            if(checkWord(word) == true) {
              checkBtn.removeEventListener('click', cheking);
            }  
        });
        console.log('display:');
        console.log(word);
    });
}

function checkWord(word) {
    let item = {};
    let checkInpt = document.querySelector('#check-input');
    item[word.name] = word;
    
     if(word.name == checkInpt.value) { 
         item[word.name].correctAnswers += 1;
         item[word.name].tries += 1;
         chrome.storage.local.set(item, function(){
             clearInput();
             showResult('positive');
         });
         setTimeout(function() {
                displayWord();
         }, 2000)
         return true;
     } else {
         item[word.name].tries += 1;
         chrome.storage.local.set(item, function() {
             showResult('negative');
         });
         return false;
     }
     console.log(item[word.name]);
}

// clear value of all inputs on the page
function clearInput() {
  document.querySelectorAll('input').forEach(inpt => {
    inpt.value = '';
  });
}

function showResult(state) {
    let bgColor = null;
    state == 'positive' ? 
    bgColor = "rgba(33, 186, 69, 0.35)" :
    bgColor =  "rgba(255, 0, 0, 0.35)";
    let body = document.querySelector('body');
    body.style.backgroundColor = bgColor;
    setTimeout(function() {
        body.style.backgroundColor = '#fff';
         }, 2000)
}



document.addEventListener("DOMContentLoaded", init);