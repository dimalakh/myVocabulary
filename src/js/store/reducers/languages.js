import { LOAD_LANGUAGES, ADD_LANGUAGE, ADD_WORD, SET_ACTIVE_LANGUAGE, REMOVE_LANGUAGE } from '../actionTypes'
import { filter } from 'lodash'

const languages = (state = {}, action) => {
  switch (action.type) {
  case LOAD_LANGUAGES:
    return {...state, ...action.payload}
  case ADD_LANGUAGE:
    return { ...state, [action.payload.name]: action.payload }
  case ADD_WORD:
    return { 
      ...state, 
      [action.payload.language]: {
        ...state[action.payload.language],
        storage: {
          ...state[action.payload.language].storage,
          [action.payload.key]: action.payload
        }
      }
    }
  case REMOVE_LANGUAGE:
    return Object.keys(state)
    .filter(name => name !== action.payload)
    .map(name => state[name])
    .reduce((languages, language) => {
      return { ...languages, [language.name]: language }
    }, {})
  default:
    return state
  }
}

export const activeLanguage = (state = null, action) => {
  switch (action.type) {
  case SET_ACTIVE_LANGUAGE:
    return action.payload 
  default:
    return state
  }
}

export default languages