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
                return a.time - b.time;
            })
            return tempArr;
        });
    },

    removeWord(name) {
        chrome.storage.local.remove(name);
    }

}