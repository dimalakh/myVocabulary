import { firebaseSave, firebaseRemove } from '../services/firebase'
import { setLocalData, removeLocalData, getLocalData } from '../services/local'
import { Language } from './language.js'

export class Word {
  constructor(word, translation) {
    this.name = word
    this.translation = translation
    this.tries = 0
    this.correctAnswers = 0
    this.time = Date.now()
  }

  create(lang) {
    const path = `languages/${lang}/storage/${this.name}`

    return new Promise(resolve => {
      firebaseSave(path, this).then(result => {
        resolve(result)
      })
      getLocalData().then(data => {
        const date = {
          timestamp: +new Date()
        }

        const wordPath = {
          ...data,
          languages: {
            ...data.languages,
            [lang]: {
              ...data.languages[lang],
              storage: {
                ...data.languages[lang].storage,
                [this.name]: this
              }
            }
          }
        }

        firebaseSave('timestamp', date.timestamp)
        setLocalData(wordPath)
      })
    })
  }

  remove(lang) {
    const path = `languages/${lang}/storage`

    return new Promise(resolve => {
      // eslint-disable-next-line no-undef
      chrome.storage.local.get(lang, data => {
        const tempLang = data[lang]
        const word = this.name
        const laguage = new Language(lang)

        delete tempLang.storage[word]
        Object.assign(laguage, tempLang)
        setLocalData(laguage)
        console.log(laguage)
        removeLocalData(laguage.storage[word])
        firebaseRemove(this.name, path).then(result => {
          resolve(result)
        })
      })
    })
  }
}
