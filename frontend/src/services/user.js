import axios from 'axios'

const BASE_URL = '/api/user'

const getUserData = async() => {
  try {
    const res = await axios.get(BASE_URL)
    return res.data
  } catch(err) {
    throw { message: err.response.data.error }
  }
}

export default {
  getUserData,
}
