import { SET_LOADING } from './types'

export const setLoading = (isLoading) => {
  return {
      type: SET_LOADING,
      data: isLoading,
  }
}
