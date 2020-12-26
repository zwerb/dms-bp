import React from 'react'
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone-uploader'

/**
 * COMPONENT
 */

const ImageUploadForm = props => {
  let fileUrl = ''

  const getUploadParams = ({meta}) => {
    const url = 'http://localhost:8080/api/upload/image'
    return {url, meta: {fileUrl: `${url}/${encodeURIComponent(meta.name)}`}}
  }

  const handleChangeStatus = ({meta, file, xhr}, status) => {
    if (status === 'done') {
      let response = JSON.parse(xhr.response)
      console.log('completed upload: ', response)
      fileUrl = response.fileUrl
    }
    console.log(status, meta)
  }

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*"
      inputContent={(files, extra) =>
        extra.reject ? 'Image files only' : 'Drag Files'
      }
      styles={{
        dropzoneReject: {borderColor: 'red', backgroundColor: '#DAA'},
        inputLabel: (files, extra) => (extra.reject ? {color: 'red'} : {})
      }}
    />
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

// const mapDispatch = (state) => {
//   return {
//     isLoggedIn: !!state.user.id,
//   }
// }

export default connect(mapState)(ImageUploadForm)
