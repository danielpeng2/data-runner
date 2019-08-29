import axios from 'axios'

const removeAuthHeader = () => {
  delete axios.defaults.headers.common['Authorization']
}

const setAuthHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = `bearer ${token}`
}

export default {
  removeAuthHeader,
  setAuthHeader,
}