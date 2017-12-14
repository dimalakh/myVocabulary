import { setLocalData, getLocalData } from '../services/local'
import { Language } from '../models/language.js';

export function langThumbler (data) {
  const header = document.querySelector('.controls');

  header.innerHTML = '';

  Object.keys(data).forEach((lang, index) => {
    const elem = document.createElement('div');

    elem.innerHTML = lang;
    elem.classList.add('ui', 'horizontal', 'label');

    /* eslint-disable */
    switch (index) {
      case 0: 
        elem.classList.add('blue');
        break;
      case 1: 
        elem.classList.add('olive');
        break;
      case 2: 
        elem.classList.add('pink');
        break;
      default:
        elem.classList.add('olive');
        break;
    }
    /* eslint-disable */

    if (data[lang].active === true) {
      elem.classList.add('active');
    }

    header.appendChild(elem);
    elem.addEventListener('click', changeLang);
  });
}

function changeLang () {
  const languages = document.querySelectorAll('.label');
  const langName = this.innerHTML;
  const language = new Language(langName);
  let langs = {}
  languages.forEach(lang => {
    const name = lang.innerHTML
    const langObj = new Language(name);
    
    langObj.changeActiveSatus(false);
    
    Object.assign(langs, { [name]: langObj })

    lang.classList.remove('active');
  });

  const preparedLocalData = {
    languages: langs
  }

  setLocalData(preparedLocalData).then(() => {
    language.changeActiveSatus(true)
    language.update()
  })
  // eslint-disable-next-line
  this.classList.add('active');
}
