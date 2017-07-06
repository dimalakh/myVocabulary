import { Store } from '../models/store.js';

/* eslint-disable no-undef */
export const gcService = {
    createStore: basicLang => new Store(basicLang),

    getStore: () => {
        return new Promise(resolved => {
            chrome.storage.sync.get(data => {
                resolved(data);
            });
        });
    },

    updateStore: nextStore => {
        gcService.getStore()
        .then(prevStore => {
            const newStore = Object.assign(prevStore, nextStore);

            chrome.storage.sync.set(newStore);
        });
    }
};
/* eslint-enable no-undef */
