import { 
  addLanguage,
  loadDataToStore,
  removeLanguage
} from './store/actions/languages'
import store from './store'
import { htmlTableField } from './helpers/ui-elements.js'
import { setLocalData } from './services/local'

function LanguagesComponent() {
  store.dispatch(loadDataToStore())

  const render = () => {
    const addBtn = document.querySelector('button')
    const input = document.querySelector('#language')
    const tbody = document.querySelector('tbody')

    const languages = store.getState().languages
    const languagesArr = Object.keys(languages).map(name => languages[name])
    
    tbody.innerHTML = ''
    languagesArr.forEach((lang, index) => {
      tbody.appendChild(htmlTableField(index + 1, lang.name))
      const field = document.querySelector(`i[data-name='${lang.name}']`)

      field.addEventListener('click', deleteLanguage)
    })

    function deleteLanguage() {
      const name = this.getAttribute('data-name')
      store.dispatch(removeLanguage(name))
    }
    
    function createLanguage() {
      store.dispatch(addLanguage({
        name: input.value,
        storage: {}
      }))
      input.value = ''
    }

    addBtn.addEventListener('click', createLanguage)
  }

  store.subscribe(() => {
    render()
    setLocalData(store.getState())
  })

  /* eslint-disable no-undef */
  chrome.storage.onChanged.addListener(() => store.dispatch(loadDataToStore()))
  chrome.runtime.getBackgroundPage(() => {})
  /* eslint-enable no-undef */
}

document.addEventListener('DOMContentLoaded', LanguagesComponent)
