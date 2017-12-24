import store from './store'
import { langThumbler } from './helpers/ui-elements'
import { setLocalData } from './services/local'
import { firebaseSave } from './services/firebase'
import { removeWord, loadDataToStore, setTimestamp } from './store/actions/languages'
import { htmlTableField } from './helpers/ui-elements.js'

const DictionComponent = () => {
  store.dispatch(loadDataToStore())

  const render = () => {
    const activeLanguageName = store.getState().activeLanguage
    const activeLanguageWords = store.getState().languages[activeLanguageName].storage

    renderWordList(activeLanguageWords)
    langThumbler(store)

    function renderWordList(wordList) {
      const tbody = document.querySelector('tbody')
      const table = document.querySelector('table')
      const spinner = document.querySelector('.spinner-wrap')
    
      spinner.style.display = 'none'
      table.style.opacity = 1
      tbody.innerHTML = ''
    
      Object.keys(wordList).forEach((key, index) => {
        const word = wordList[key]
    
        tbody.appendChild(htmlTableField(index + 1, key, word.translation))
    
        const field = document.querySelector(`i[data-name='${key}']`)
    
        field.addEventListener('click', deleteWord)
      })
    }
  
    function deleteWord() {
      const name = this.getAttribute('data-name')
      const { activeLanguage } = store.getState()
  
      store.dispatch(removeWord(name, activeLanguage))
      store.dispatch(setTimestamp())
    }
  }
  
  store.subscribe(() => {
    render()
    setLocalData(store.getState())
    firebaseSave('', store.getState())
  })
  /* eslint-disable no-undef */
  chrome.storage.onChanged.addListener(() => store.dispatch(loadDataToStore()))
  chrome.runtime.getBackgroundPage(() => {})
  /* eslint-enable no-undef */
}

document.addEventListener('DOMContentLoaded', DictionComponent)
