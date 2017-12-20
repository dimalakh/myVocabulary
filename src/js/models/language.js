import { getLocalData, setLocalData, removeLocalData } from '../services/local'
import { 
  firebaseSave,
  firebaseRemove,
  firebaseGet,
  firebaseUpdate,
} from '../services/firebase'

export class Language {
  constructor(name) {
    this.name = name
    this.time = Date.now()
    this.active = false
    this.flag = name + '.png'
    this.storage = {}
  }

  create() {
    return new Promise(resolve => {
      const name = this.name
      const path = `languages/${this.name}`

      if (this.name.length >= 1) {
        getLocalData().then(localData => {
          const local = {
            languages: {
              ...localData.languages,
              [name]: this
            }
          }
          setLocalData(local)
        })
        firebaseSave(path, this).then(result => {
          resolve(result)
        })
      } else {
        resolve(false)
      }
    })
  }

  load() {
    const path = `languages/${this.name}`
    console.log(path)
    return new Promise(resolve => {
      firebaseGet(path).then(data => {
        Object.assign(this, data)
        resolve(this)
      })
    })
  }

  update() {
    const data = this
    console.log(this)
    const path = `languages/${this.name}`
    getLocalData().then(dataLocal => {
      const localData = {
        languages: {
          ...dataLocal.languages,
          [this.name]: {
            ...this,
            storage: {
              ...dataLocal.languages[this.name].storage
            }
          }
        }
      }
      console.log('localdata:', localData)
      setLocalData(localData)
    })

    return new Promise(resolve => {
      firebaseUpdate(path, data).then(data => {
        Object.assign(this, data)
        resolve(this)
      })
    })
  }

  remove() {
    const path = ''

    return new Promise(resolve => {
      removeLocalData(this.name)
      firebaseRemove(this.name, path).then(result => {
        resolve(result)
      })
    })
  }

  changeActiveSatus(status) {
    this.active = status
  }
}
