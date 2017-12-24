import { combineReducers } from 'redux'
import languages, { activeLanguage, timestamp } from './languages'

export default combineReducers({
  languages,
  activeLanguage,
  timestamp
})