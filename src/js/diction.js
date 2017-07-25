import { render } from './controllers/diction.js';

function init () {
    const learnBtn = document.querySelector('#learn');
    
    render();
    
    chrome.storage.onChanged.addListener(render);

    // eslint-disable-next-line no-undef
    chrome.runtime.getBackgroundPage(() => {});
}

document.addEventListener('DOMContentLoaded', init);
