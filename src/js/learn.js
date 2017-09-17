import { StorageService } from './helpers/navigation.js';

function init () {
  displayWord();
  /* eslint-disable */
  chrome.runtime.getBackgroundPage(function(bg) {
    if (bg.entryToLoad) {
      loadEntry(bg.entryToLoad);
    }
  });
  /* eslint-enable */
}

function displayWord () {
  const skipBtn = document.querySelector('#skip-btn');
  const checkBtn = document.querySelector('#check-btn');

  StorageService.getRandomWord().then(word => {
    document.querySelector('#word-display').innerHTML = word.translation;
    skipBtn.addEventListener('click', displayWord);
    checkBtn.addEventListener('click', function cheking () {
      if (checkWord(word) === true) {
        checkBtn.removeEventListener('click', cheking);
      }
    });
  });
}

function checkWord (word) {
  let item = {};
  const checkInpt = document.querySelector('#check-input');

  item[word.name] = word;
  item[word.name].tries += 1;

  if (word.name === checkInpt.value) {
    item[word.name].correctAnswers += 1;

    // eslint-disable-next-line
    chrome.storage.sync.set(item, () => {
      clearInput();
      showResult(true);
    });

    setTimeout(() => {
      displayWord();
    }, 1200);

    return true;
  }

  // eslint-disable-next-line
  chrome.storage.sync.set(item, () => {
    showResult('negative');
  });

  return false;
}

// clear value of all inputs on the page
function clearInput () {
  document.querySelectorAll('input').forEach(inpt => {
    inpt.value = '';
  });
}

// show result of words checking (change body bg-color)
function showResult (state) {
  const body = document.querySelector('body');
  const inputOuter = document.querySelector('.input');
  const wordDisplay = document.querySelector('#word-display');

  if (state === true) {
    inputOuter.classList.remove('error');
    body.classList.add('correct');
  } else {
    inputOuter.classList.add('error');
    wordDisplay.classList.add('shake', 'animated');
  }

  setTimeout(() => {
    body.classList.remove('correct');
    wordDisplay.classList.remove('shake', 'animated');
  }, 1200);
}


document.addEventListener('DOMContentLoaded', init);
