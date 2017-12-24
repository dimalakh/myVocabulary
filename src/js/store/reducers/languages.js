import { 
  LOAD_LANGUAGES, 
  ADD_LANGUAGE, 
  ADD_WORD, 
  REMOVE_LANGUAGE, 
  REMOVE_WORD,
  SET_ACTIVE_LANGUAGE,
  LOAD_TIMESTAMP,
  SET_TIMESTAMP
} from '../actionTypes'

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
  case REMOVE_WORD:
    const { language, word } = action.payload
    const activeLanguage = state[language]

    const newStorage = Object.keys(activeLanguage.storage)
    .filter(wordKey => wordKey !== word)
    .map(name => name)
    .reduce((words, word) => {
      return { ...words, [word]: activeLanguage.storage[word] }
    }, {})

    return { 
      ...state, 
      [action.payload.language]: {
        ...state[action.payload.language],
        storage: newStorage
      }
    }
  default:
    return state
  }
}

export const activeLanguage = (state = 'English', action) => {
  switch (action.type) {
  case SET_ACTIVE_LANGUAGE:
    return action.payload 
  default:
    return state
  }
}

export const timestamp = (state = null, action) => {
  switch (action.type) {
  case LOAD_TIMESTAMP:
    return action.payload
  case SET_TIMESTAMP:
    return action.payload 
  default:
    return state
  }
}

export default languages