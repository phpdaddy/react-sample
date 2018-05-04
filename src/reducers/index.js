import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import quote from './quote'
import env from './env'

const rootReducer = combineReducers({form: formReducer, quote, env})

export default rootReducer