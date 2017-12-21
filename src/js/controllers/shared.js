import { setActiveLanguage } from '../store/actions/languages'

export function langThumbler (store) {
  const header = document.querySelector('.controls')
  const data = store.getState().languages
  const activeLang = store.getState().activeLanguage

  header.innerHTML = ''

  Object.keys(data).forEach((lang, index) => {
    const elem = document.createElement('div')

    elem.innerHTML = lang
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

    if (lang === activeLang) {
      elem.classList.add('active');
    }
    
    const onLangChange = () => {
      console.log(lang)
      store.dispatch(setActiveLanguage(lang))
    }
    
    
    header.appendChild(elem);
    elem.addEventListener('click', onLangChange);
  });
}
