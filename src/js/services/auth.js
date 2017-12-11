const config = require('../../../config')
import firebase from 'firebase'

firebase.initializeApp(config)

export function initAuth () {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve(user.uid);

        return;
      }

      startSignIn();
    });
  });
}

function startSignIn () {
  /* eslint-disable curly */
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    startAuth(true);
  }
  /* eslint-enable curly */
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

export default firebase;
