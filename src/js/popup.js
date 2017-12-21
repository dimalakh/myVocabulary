import { goToDiction, goToAddLang } from './helpers/navigation.js'
import { langThumbler } from './controllers/shared'
import { getLocalData, setLocalData } from './services/local'
import store from './store'
import { addLanguage, addWord, loadLanguages } from './store/actions/languages'

const PopUpComponent = () => {
  const dictionBtn = document.querySelector('#diction')
  const addLangBtn = document.querySelector('#addLang')
  const addWords = document.querySelector('#addWord')
  const word = document.querySelector('#word')
  const translation = document.querySelector('#translation')
  const header = document.querySelector('.controls')
  
  getLocalData().then(localStorage => {
    store.dispatch(loadLanguages(localStorage.languages))
  })

  const onClickAdd = () => {
    store.dispatch(
      addWord({
        language: store.getState().activeLanguage,
        key: word.value,
        translation: translation.value
      }
    ))
  
    word.value = ''
    translation.value = ''
  }

  const renderLangThumler = (store) => {
    langThumbler(store)
  }

  store.subscribe(() => {
    setLocalData(store.getState())
    renderLangThumler(store)
  })

  addLangBtn.addEventListener('click', goToAddLang)
  dictionBtn.addEventListener('click', goToDiction)
  addWords.addEventListener('click', onClickAdd)

  // eslint-disable-next-line no-undef
  chrome.runtime.getBackgroundPage(() => {})
}

document.addEventListener('DOMContentLoaded', PopUpComponent)


