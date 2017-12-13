const config = require('../../../config')
import firebase from 'firebase'

firebase.initializeApp(config)

const authentificate = () => new Promise(resolve => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) return resolve(user.uid)

    return signIn()
  })
})

const signIn = () => {
  const fireAuth = firebase.auth()
  
  if (fireAuth.currentUser) return fireAuth.signOut()

  return startAuth(true)
}

function startAuth (interactive) {
  /* eslint-disable no-undef, curly */
  chrome.identity.getAuthToken({interactive: !!interactive}, token => {
    if (chrome.runtime.lastError && !interactive) {
      console.log('It was not possible to get a token programmatically.');
    } else if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else if (token) {
      const credential = firebase.auth.GoogleAuthProvider.credential(null, token);

      firebase.auth().signInWithCredential(credential).catch(error => {
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({token}, () => {
            startAuth(interactive);
          });
        }
      });
    } else {
      console.error('The OAuth Token was null');
    }
  });
}

export default authentificate
