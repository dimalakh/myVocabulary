import { LOAD_LANGUAGES, ADD_LANGUAGE, ADD_WORD, SET_ACTIVE_LANGUAGE, REMOVE_LANGUAGE, REMOVE_WORD } from '../actionTypes'

export const setActiveLanguage = language => {
  return { 
    type: SET_ACTIVE_LANGUAGE,
    payload: language
  } 
}

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
