import axios from 'axios'

const BASE_URL = '/api/user'

const getUserData = async() => {
  const res = await axios.get(BASE_URL)
  return res.data
}

export default {
  getUserData,
}
