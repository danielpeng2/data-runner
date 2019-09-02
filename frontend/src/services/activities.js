import axios from 'axios'

const BASE_URL = '/api/activities'

const deleteActivity = async(id) => {
  await axios.delete(`${BASE_URL}/${id}`)
}

const upload = async(files) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('file', file)
  })
  const res = await axios.post(`${BASE_URL}/upload`, formData)
  return res.data
}

export default {
  deleteActivity,
  upload,
}