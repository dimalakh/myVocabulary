import { LOAD_LANGUAGES, ADD_LANGUAGE, ADD_WORD } from '../actionTypes'

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

export const addWord = word => {
  return { 
    type: ADD_WORD,
    payload: word
  }
}