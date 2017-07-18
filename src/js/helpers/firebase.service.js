import firebase, { initAuth } from './auth.js';

export function getData (path = '') {
    return new Promise(resolve => {
        initAuth().then(userId => {
            firebase.database().ref(`/users/${userId}/${path}`).once('value')
            .then(data => {
                resolve(data.val());
            });
        });
    });
}

export function saveData (path, data) {
    return new Promise(resolve => {
        initAuth().then(userId => {
            firebase.database().ref(`users/${userId}/${path}`).set(data);
            resolve(true);
        });
    });
}

export function removeData (key, path) {
    return new Promise(resolve => {
        initAuth().then(userId => {
            firebase.database().ref(`users/${userId}/${path}`).child(key).remove();
            resolve(true);
        });
    });
}
