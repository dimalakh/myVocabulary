import authentificate from './auth.js'
import firebase from 'firebase'

const requestBuilder = func => {
  return new Promise((resolve, reject) => {
    authentificate().then(id => func(id, resolve))
  })
}

export const firebaseGet = (path = '') => requestBuilder((id, resolve) => {
  firebase.database()
  .ref(`/users/${id}/${path}`)
  .once('value')
  .then(data => resolve(data.val()))
})

export const firebaseSave = (path, data) => requestBuilder((id, resolve) => {
  firebase.database()
  .ref(`users/${id}/${path}`)
  .set(data)
  .then(() => resolve(true))
})

export const firebaseUpdate = (path, data) => requestBuilder((id, resolve) => {
  firebase.database()
  .ref(`users/${id}/${path}`)
  .update(data)
  .then(() => resolve(true))
})

export const firebaseRemove = (key, path) => requestBuilder((id, resolve) => {
  firebase.database()
  .ref(`users/${id}/${path}`)
  .child(key).remove()
  .then(() => resolve(true))
})
