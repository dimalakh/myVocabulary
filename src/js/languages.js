import { htmlTableField } from './helpers/ui-elements.js'
import { getLocalData, setLocalData } from './services/local'
import store from './store'
import { addLanguage, loadLanguages, removeLanguage, setActiveLanguage } from './store/actions/languages'

function init() {
  const addBtn = document.querySelector('button')
  const input = document.querySelector('#language')

  getLocalData().then(localStorage => {
    store.dispatch(loadLanguages(localStorage.languages))
    store.dispatch(setActiveLanguage(localStorage.activeLanguage))
  })

  const onClickAdd = () => {
    store.dispatch(
      addLanguage({
        name: input.value,
        storage: {}
      }
    ))
  
    input.value = ''
  }

  store.subscribe(() => {
    render()
    setLocalData(store.getState())
  })

  const render = () => {
    const languages = store.getState().languages
    const languagesArr = Object.keys(languages).map(name => languages[name])
    const tbody = document.querySelector('tbody')
  
    tbody.innerHTML = ''
    languagesArr.forEach((lang, index) => {
      tbody.appendChild(htmlTableField(index + 1, lang.name))
      const field = document.querySelector(`i[data-name='${lang.name}']`)

      field.addEventListener('click', remove)
    })
  }

  function remove() {
    const name = this.getAttribute('data-name')
    store.dispatch(removeLanguage(name))
  }
  

  addBtn.addEventListener('click', onClickAdd)

  /* eslint-disable no-undef */
  chrome.storage.onChanged.addListener(() => {
    getLocalData().then(localStorage => {
      store.dispatch(setActiveLanguage(localStorage.activeLanguage))
      store.dispatch(loadLanguages(localStorage.languages))
    })
  })
  chrome.runtime.getBackgroundPage(() => {})
  /* eslint-enable no-undef */
}

document.addEventListener('DOMContentLoaded', init)
