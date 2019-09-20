import { INIT_ACTIVITIES, NEW_ACTIVITIES, DELETE_ACTIVITY } from '../actions/types'

const initialState = null

const activitiesReducer = (state = initialState, action) => {
  switch(action.type) {
    case INIT_ACTIVITIES:
      return action.data
    case NEW_ACTIVITIES:
      return state.concat(action.data)
    case DELETE_ACTIVITY:
      return state.filter((activity) => activity.id !== action.data)
    default:
      return state
  }
}

export default activitiesReducer
