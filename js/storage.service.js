import { Word } from './word.js';

export let StorageService = {
    output() {
        chrome.storage.local.get(function(data) {
            document.querySelector('tbody').innerHTML = "";
            var counter = 0;
            for(let el in data){
                counter++;
                document.querySelector('tbody').innerHTML += `
                    <tr><td> ${counter} </td><td> ${data[el].name} </td><td> ${data[el].translation} </td></tr>`;
            }
        });
    }
}