import { 
  LOAD_LANGUAGES, 
  ADD_LANGUAGE, 
  SET_ACTIVE_LANGUAGE,
  REMOVE_LANGUAGE,
  ADD_WORD,  
  REMOVE_WORD
} from '../actionTypes'
import { getLocalData } from '../../services/local'

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
  getLocalData().then(localStorage => {
    dispatch(loadLanguages(localStorage.languages))
    dispatch(setActiveLanguage(localStorage.activeLanguage))
  })
}