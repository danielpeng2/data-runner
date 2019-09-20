import { message } from 'antd'

import activitiesService from '../services/activities'
import { DELETE_ACTIVITY, INIT_ACTIVITIES, NEW_ACTIVITIES } from './types'
import { setLoading } from './loadingActions'

export const initActivities = (activities) => ({
  type: INIT_ACTIVITIES,
  data: activities
})

export const deleteActivity = (id) => {
  return async(dispatch) => {
    dispatch(setLoading(true))
    try {
      await activitiesService.deleteActivity(id)
      message.success('Delete successful')
      dispatch({
        type: DELETE_ACTIVITY,
        data: id,
      })
    } catch(err) {
      message.error(err.message)
    }
    dispatch(setLoading(false))
  }
}

export const uploadActivities = (files) => {
  return async(dispatch) => {
    dispatch(setLoading(true))
    try {
      if (!files || !files.length) {
        throw Error('please select files before uploading')
      }
      const newActivities = await activitiesService.upload(files)
      message.success('Upload successful')
      dispatch({
        type: NEW_ACTIVITIES,
        data: newActivities,
      })
    } catch(err) {
      message.error(err.message)
    }
    dispatch(setLoading(false))
  }
}
