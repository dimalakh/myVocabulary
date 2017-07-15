import firebase, { initAuth } from './auth.js';

export function getUserData () {
    return new Promise(resolve => {
        initAuth().then(userId => {
            firebase.database().ref('/users/' + userId).once('value').then(data => {
                resolve(data.val());
            });
        });
    });
}

export function setUserData (data) {
    return new Promise(resolve => {
        initAuth().then(userId => {
            firebase.database().ref('users/' + userId).set(data);
            resolve(true);
        });
    });
}

export function saveWord (lang, word) {
    return new Promise(resolve => {
        initAuth().then(userId => {
            firebase.database().ref(`users/${userId}/${lang}/storage/${word.name}`).set(word);
            resolve(true);
        });
    });
}

export function updateLang (lang) {
    initAuth().then(userId => {
        firebase.database().ref().child(`/users/${userId}/lang.name`).update(lang);
    });
}

export function saveLang (lang) {
    return new Promise(resolve => {
        initAuth().then(userId => {
            firebase.database().ref(`users/${userId}/${lang.name}`).set(lang);
            resolve(true);
        });
    });
}


