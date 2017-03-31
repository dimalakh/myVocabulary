import { Word } from './word.js';

export let StorageService = {
    get() {
        let tempArr = [];
        chrome.storage.local.get(data => {
            tempArr = data;
        });
        console.log(tempArr);
        return tempArr;
    }
}