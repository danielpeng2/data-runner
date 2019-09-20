import { message } from 'antd'

import authUtils from '../utils/authUtils'
import localStorageUtils from '../utils/localStorageUtils'
import loginService from '../services/login'
import userService from '../services/user'

import { initActivities } from './activityActions'
import { setLoading } from './loadingActions'

import { SET_LOGGED_IN_USER, REMOVE_LOGGED_IN_USER } from './types'

const setUser = (user) => ({
  type: SET_LOGGED_IN_USER,
  data: user,
})

const removeUser = () => ({
  type: REMOVE_LOGGED_IN_USER,
  data: null,
})

export const setUserAndGetData = (user) => {
  return async(dispatch) => {
    dispatch(setLoading(true))
    dispatch(setUser(user))
    authUtils.setAuthHeader(user.token)
    try {
      const data = await userService.getUserData()
      dispatch(initActivities(data.activities))
    } catch(err) {
      message.error(err.message)
    }
    dispatch(setLoading(false))
  }
}

const authUser = (credentials, isRegister) => {
  return async(dispatch) => {
    dispatch(setLoading(true))
    try {
      const user = await (isRegister 
        ? loginService.register(credentials)
        : loginService.login(credentials))
      localStorageUtils.saveLoggedInUser(user)
      await dispatch(setUserAndGetData(user, dispatch))
    } catch(err) {
      message.error(err.message)
    }
    dispatch(setLoading(false))
  }
}

export const loginUser = (credentials) => {
  return authUser(credentials, false)
}

export const registerUser = (credentials) => {
  return authUser(credentials, true)
}

export const logoutUser = () => {
  return (dispatch) => {
    localStorageUtils.removeLoggedInUser()
    authUtils.removeAuthHeader()
    dispatch(initActivities(null))
    dispatch(removeUser())
  }
}
