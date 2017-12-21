import { LOAD_LANGUAGES, ADD_LANGUAGE, ADD_WORD } from '../actionTypes'

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
  default:
    return state
  }
}

export default languages