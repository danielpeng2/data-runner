import { SET_LOGGED_IN_USER, REMOVE_LOGGED_IN_USER } from '../actions/types'

const initialState = null

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_LOGGED_IN_USER:
      return action.data
    case REMOVE_LOGGED_IN_USER:
      return null
    default:
      return state
  }
}

export default loginReducer
