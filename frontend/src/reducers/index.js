import { combineReducers } from 'redux'
import activitiesReducer from './activitiesReducer'
import loadingReducer from './loadingReducer'
import loginReducer from './loginReducer'

const rootReducer = combineReducers({
  activities: activitiesReducer,
  loading: loadingReducer,
  user: loginReducer,
})

export default rootReducer
