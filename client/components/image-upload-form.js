import React from 'react'
import {connect} from 'react-redux'
import {fetchRecordUploadedImage, fetchUploadImage} from '../store'
import Dropzone from 'react-dropzone-uploader'

/**
 * COMPONENT
 */

const ImageUploadForm = props => {
  let fileUrl = ''

  const getUploadParams = ({meta}) => {
    // uncommenting this allows Dropzone to upload automatically
    // const url = 'http://localhost:8080/api/upload/image'
    const url = '/'
    return {url, meta: {tempFileUrl: `${url}/${encodeURIComponent(meta.name)}`}}
  }

  const handleChangeStatus = ({meta, file, xhr}, status) => {
    // if (status === 'done') {
    //   console.log('xhr', xhr)
    // }
    // console.log(status, meta)
  }

  const handleSubmit = (files, allFiles) => {
    const {recordUploadedImage, uploadImage, user} = props
    console.log(files.map(f => f.meta))
    files.forEach(f => {
      const imageToUpload = {
        file: f.file,
        hashName: f.meta.previewUrl
          .split('/')
          .slice(-1)
          .pop()
      }
      console.log('attempting to upload image: ', imageToUpload)
      console.log('uploading as user: ', user)

      uploadImage(imageToUpload, user)
    })
    allFiles.forEach(f => f.remove())
  }

  const {image} = props

  const {user, userImages} = props

  return (
    <div>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*"
        maxFiles={1}
        inputContent={(files, extra) =>
          extra.reject ? 'Image files only' : 'Drag Single Image'
        }
        styles={{
          dropzoneReject: {borderColor: 'red', backgroundColor: '#DAA'},
          inputLabel: (files, extra) => (extra.reject ? {color: 'red'} : {})
        }}
        submitButtonDisabled={userImages.length >= user.maxUploads}
      />
      {image && image.fileUrl && image.fileUrl.length > 0 ? (
        <div className="column-items">
          <span>{image.name}</span>
          <img className="image-small" src={image.fileUrl} />
        </div>
      ) : (
        <div className="column-items">
          {userImages.length >= user.maxUploads ? (
            <span>You've reached the max uploads.</span>
          ) : (
            <span>Please upload an image.</span>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    image: state.image,
    user: state.user,
    userImages: state.userImages
  }
}

const mapDispatch = dispatch => {
  return {
    recordUploadedImage: image => dispatch(fetchRecordUploadedImage(image)),
    uploadImage: (image, user) => dispatch(fetchUploadImage(image, user))
  }
}

export default connect(mapState, mapDispatch)(ImageUploadForm)
