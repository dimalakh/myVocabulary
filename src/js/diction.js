import { render } from './controllers/diction.js';

function init () {
  render();

  /* eslint-disable no-undef */
  chrome.storage.onChanged.addListener(render);
  chrome.runtime.getBackgroundPage(() => {});
  /* eslint-enable no-undef */
}

document.addEventListener('DOMContentLoaded', init);
