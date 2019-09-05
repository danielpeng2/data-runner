import axios from 'axios'

const login = async(credentials) => {
  try {
    const res = await axios.post('/api/login', credentials)
    return res.data
  } catch(err) {
    throw { message: err.response.data.error }
  }
}

const register = async(credentials) => {
  try {
    const res = await axios.post('/api/register', credentials)
    return res.data
  } catch(err) {
    throw { message: err.response.data.error }
  }
}

export default { login, register }
