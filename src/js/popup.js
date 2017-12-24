import { goToDiction, goToAddLang } from './helpers/navigation.js'
import { langThumbler } from './helpers/ui-elements'
import { setLocalData } from './services/local'
import { firebaseSave } from './services/firebase'
import store from './store'
import { addWord, loadDataToStore, setTimestamp } from './store/actions/languages'

const PopUpComponent = () => {
  store.dispatch(loadDataToStore())

  const dictionBtn = document.querySelector('#diction')
  const addLangBtn = document.querySelector('#addLang')
  const addWords = document.querySelector('#addWord')
  const word = document.querySelector('#word')
  const translation = document.querySelector('#translation')

  function createWord() {
    store.dispatch(addWord({
      language: store.getState().activeLanguage,
      key: word.value,
      translation: translation.value
    }))
    store.dispatch(setTimestamp())
  
    word.value = ''
    translation.value = ''
  }
  
  store.subscribe(() => {
    langThumbler(store)
    setLocalData(store.getState())
    firebaseSave('', store.getState())
  })

  addLangBtn.addEventListener('click', goToAddLang)
  dictionBtn.addEventListener('click', goToDiction)
  addWords.addEventListener('click', createWord)

  // eslint-disable-next-line no-undef
  chrome.runtime.getBackgroundPage(() => {})
}

document.addEventListener('DOMContentLoaded', PopUpComponent)


