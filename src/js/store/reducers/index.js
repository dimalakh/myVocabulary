import { combineReducers } from 'redux'
import languages, { activeLanguage } from './languages'

export default combineReducers({
  languages,
  activeLanguage
})