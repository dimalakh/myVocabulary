import { firebaseSave, firebaseRemove, firebaseGet, firebaseUpdate } from '../services/firebase'
import { setLocalData, removeLocalData } from '../services/local'

export class Language {
  constructor (name) {
    this.name = name;
    this.time = Date.now();
    this.active = false;
    this.flag = name + '.png';
    this.storage = {};
  }

  create () {
    return new Promise(resolve => {
      const path = `${this.name}`;

      if (this.name.length >= 1) {
        setLocalData(this);
        firebaseSave(path, this).then(result => {
          resolve(result);
        });
      } else {
        resolve(false);
      }
    });
  }

  load () {
    const path = `${this.name}`;

    return new Promise(resolve => {
      firebaseGet(path).then(data => {
        Object.assign(this, data);
        resolve(this);
      });
    });
  }

  update (data) {
    const path = `${this.name}`;

    return new Promise(resolve => {
      firebaseUpdate(path, data).then(data => {
        Object.assign(this, data);
        resolve(this);
      });
    });
  }

  remove () {
    const path = '';

    return new Promise(resolve => {
      removeLocalData(this.name);
      firebaseRemove(this.name, path).then(result => {
        resolve(result);
      });
    });
  }

  changeActiveSatus (status) {
    this.active = status;
  }
}
