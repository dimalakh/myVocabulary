import { render, addLanguage } from './controllers/languages.js';

function init () {
    const addBtn = document.querySelector('button');
    
    render();
    
    chrome.storage.onChanged.addListener(render);
    addBtn.addEventListener('click', addLanguage);
    
    // eslint-disable-next-line no-undef
    chrome.runtime.getBackgroundPage(() => {});
}

document.addEventListener('DOMContentLoaded', init);
