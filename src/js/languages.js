import { render, addLanguage } from './controllers/languages.js';

function init () {
  const addBtn = document.querySelector('button');

  addBtn.addEventListener('click', addLanguage);

  render();

  /* eslint-disable no-undef */
  chrome.storage.onChanged.addListener(render);
  chrome.runtime.getBackgroundPage(() => {});
  /* eslint-enable no-undef */
}

document.addEventListener('DOMContentLoaded', init);
