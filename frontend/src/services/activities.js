import axios from 'axios'

const BASE_URL = '/api/activities'

const deleteActivity = async(id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
  } catch(err) {
    throw Error(err.response.data.error)
  }
}

const upload = async(files) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('file', file)
  })
  try {
    const res = await axios.post(`${BASE_URL}/upload`, formData)
    return res.data
  } catch(err) {
    throw Error(err.response.data.error)
  }
}

export default {
  deleteActivity,
  upload,
}