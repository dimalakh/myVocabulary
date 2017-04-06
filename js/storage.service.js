import { Word } from './word.js';

export let StorageService = {
    get() {
        return new Promise((resolved, rejected) =>{
            chrome.storage.local.get(data => {
                    resolved(data);
            });
        }).then(data => {
            let tempArr = [];
            for(let prop in data) {
                 tempArr.push(data[prop]);
            }
            tempArr.sort((a,b) => {
                return b.time - a.time;
            })
            return tempArr;
        });
    },

    getRandomWord() {
        return this.get().then(arr => {  
             let randomNumber = this.getRandomInt(0, arr.length);
             let randomWord = arr[randomNumber];
             return randomWord;
           });
    },

    removeWord(name) {
        chrome.storage.local.remove(name);
    },

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

}