import axios from 'axios'

const login = async(credentials) => {
  const res = await axios.post('/api/login', credentials)
  return res.data
}

const register = async(credentials) => {
  const res = await axios.post('/api/register', credentials)
  return res.data
}

export default { login, register }
