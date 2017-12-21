import { goToDiction, goToAddLang } from './helpers/navigation.js'
//import { render, addToDictionary } from './controllers/popup.js'
import { getLocalData, setLocalData } from './services/local'
import store from './store'
import { addLanguage, addWord, loadLanguages } from './store/actions/languages'

const render = () => {
  const dictionBtn = document.querySelector('#diction')
  const addLangBtn = document.querySelector('#addLang')
  const addWords = document.querySelector('#addWord')
  const word = document.querySelector('#word')
  const translation = document.querySelector('#translation')
  
  const addTo = () => {
    store.dispatch(
      addWord({
        language: 'English',
        key: word.value,
        translation: translation.value
      }
    ))
  }
  
  getLocalData().then(localStorage => {
    store.dispatch(loadLanguages(localStorage.languages))
  })

  store.subscribe(() => {
    setLocalData(store.getState())
    console.log(store.getState())
  })

  addLangBtn.addEventListener('click', goToAddLang)
  dictionBtn.addEventListener('click', goToDiction)
  addWords.addEventListener('click', addTo)

  // eslint-disable-next-line no-undef
  chrome.runtime.getBackgroundPage(() => {})
}

document.addEventListener('DOMContentLoaded', render)


