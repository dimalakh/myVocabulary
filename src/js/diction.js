import store from './store'
import { langThumbler } from './controllers/shared'
import { getLocalData, setLocalData } from './services/local'
import { loadLanguages, setActiveLanguage, removeWord } from './store/actions/languages'
import { htmlTableField } from './helpers/ui-elements.js'

function init() {
  getLocalData().then(localStorage => {
    store.dispatch(loadLanguages(localStorage.languages))
    store.dispatch(setActiveLanguage(localStorage.activeLanguage))
  })

  function render() {
    const activeLanguageName = store.getState().activeLanguage
    const activeLanguage = (store.getState().languages[activeLanguageName])
    console.log(activeLanguage)
    renderList(activeLanguage)
    langThumbler(store)
  }

  function renderList (data) {
    const tbody = document.querySelector('tbody')
    const table = document.querySelector('table')
    const spinner = document.querySelector('.spinner-wrap')
  
    spinner.style.display = 'none'
    table.style.opacity = 1
    tbody.innerHTML = ''
  
    Object.keys(data.storage).forEach((key, index) => {
      const word = data.storage[key]
  
      tbody.appendChild(htmlTableField(index + 1, key, word.translation))
  
      const field = document.querySelector(`i[data-name='${key}']`)
  
      field.addEventListener('click', deleteWord)
    })
  }

  function deleteWord () {
    const name = this.getAttribute('data-name')
    const { activeLanguage } = store.getState()

    store.dispatch(removeWord(name, activeLanguage))
  }
  
  store.subscribe(() => {
    render()
    setLocalData(store.getState())
  })

  /* eslint-disable no-undef */
  chrome.storage.onChanged.addListener(() => {
    getLocalData().then(localStorage => {
      store.dispatch(loadLanguages(localStorage.languages))
      store.dispatch(setActiveLanguage(localStorage.activeLanguage))
    })
  })
  chrome.runtime.getBackgroundPage(() => {})
  /* eslint-enable no-undef */
}

document.addEventListener('DOMContentLoaded', init)
