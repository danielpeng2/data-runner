import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

import { uploadActivities } from '../../actions/activityActions'

const UploadForm = (props) => {
  const [files, setFiles] = useState(null)

  const onSubmit = (event) => {
    event.preventDefault()
    props.uploadActivities(files)
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

export default connect(
  null,
  { uploadActivities }
)(UploadForm)
