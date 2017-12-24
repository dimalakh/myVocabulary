import { setActiveLanguage } from '../store/actions/languages'

export const htmlTableField = (column0 = '', column1 = '', column2 = '') => {
  const field = document.createElement('tr')

  field.innerHTML = `
    <td width="50">${column0}</td>
    <td>${column1}</td>
    <td>${column2}</td>
    <td width="50">
      <i class="remove icon delete" data-name='${column1}'></i>
    </td>
  `

  return field
}

export function langThumbler (store) {
  const header = document.querySelector('.controls')
  const data = store.getState().languages
  const activeLang = store.getState().activeLanguage

  header.innerHTML = ''

  Object.keys(data).forEach((lang, index) => {
    const elem = document.createElement('div')

    elem.innerHTML = lang
    elem.classList.add('ui', 'horizontal', 'label', 'blue')

    if (lang === activeLang) {
      elem.classList.add('active')
    }
    
    const onLangChange = () => {
      store.dispatch(setActiveLanguage(lang))
    }
    
    header.appendChild(elem)
    elem.addEventListener('click', onLangChange)
  })
}
