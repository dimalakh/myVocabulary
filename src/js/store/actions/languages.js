import { 
  LOAD_LANGUAGES, 
  ADD_LANGUAGE, 
  SET_ACTIVE_LANGUAGE,
  REMOVE_LANGUAGE,
  ADD_WORD,  
  REMOVE_WORD,
  LOAD_TIMESTAMP,
  SET_TIMESTAMP
} from '../actionTypes'
import { getLocalData } from '../../services/local'
import { firebaseGet } from '../../services/firebase'

export const loadLanguages = languages => {
  return { 
    type: LOAD_LANGUAGES,
    payload: languages
  }
}

export const addLanguage = language => {
  return { 
    type: ADD_LANGUAGE,
    payload: language
  }
}

export const setActiveLanguage = language => {
  return { 
    type: SET_ACTIVE_LANGUAGE,
    payload: language
  } 
}

export const removeLanguage = languageName => {
  return {
    type: REMOVE_LANGUAGE,
    payload: languageName
  }
}

export const addWord = word => {
  return { 
    type: ADD_WORD,
    payload: word
  }
}

export const removeWord = (word, language) => {
  return {
    type: REMOVE_WORD,
    payload: {
      word,
      language
    }
  }
}

export const loadDataToStore = () => dispatch => {
  firebaseGet().then(firebaseStorage => {
    getLocalData().then(localStorage => {
      if (firebaseStorage.timestamp < localStorage.timestamp) {
        dispatch(loadLanguages(firebaseStorage.languages))
        dispatch(setActiveLanguage(firebaseStorage.activeLanguage))
        dispatch(loadTimestamp(firebaseStorage.timestamp))
      } else {
        dispatch(loadLanguages(localStorage.languages))
        dispatch(setActiveLanguage(localStorage.activeLanguage))
        dispatch(loadTimestamp(localStorage.timestamp))
      }
    })
  })
}

export const loadTimestamp = (timestamp) => {
  return {
    type: LOAD_TIMESTAMP,
    payload: timestamp
  }
}

export const setTimestamp = () => {
  return {
    type: SET_TIMESTAMP,
    payload: +new Date()
  }
}