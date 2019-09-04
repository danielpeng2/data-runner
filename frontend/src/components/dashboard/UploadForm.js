import React, { useState } from 'react'
import { Button } from 'antd'

const UploadForm = ({
  handleUpload
}) => {
  const [files, setFiles] = useState(null)

  const onSubmit = (event) => {
    event.preventDefault()
    handleUpload(files)
  }

  return (
    <form onSubmit={onSubmit}>
      <input type='file' multiple onChange={({ target }) => setFiles(Array.from(target.files))} />
      <Button type='primary' htmlType='submit'>
        Upload
      </Button>
    </form>
  )
}

export default UploadForm
