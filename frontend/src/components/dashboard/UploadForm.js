import React, { useState } from 'react'

const UploadForm = ({
  handleUpload
}) => {
  const [files, setFiles] = useState(null)

  const onSubmit = (event) => {
    event.preventDefault()
    handleUpload(files)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='file' multiple onChange={({ target }) => setFiles(Array.from(target.files))} />
        <button type='submit'>upload</button>
      </form>
    </div>
  )
}

export default UploadForm
