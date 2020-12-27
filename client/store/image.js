import axios from 'axios'
import history from '../history'

import {clearOneUserImage, addOneUserImage} from '../store'

/**
 * ACTION TYPES
 */

// Images are uploaded immediately upon drag-drop or selection
// The "Submit" button simply finalizes or "records" them by
// creating a new database entry for them with the image link

const GET_IMAGE = 'GET_IMAGE'
const UPLOAD_IMAGE = 'UPLOAD_IMAGE'
const RECORD_UPLOADED_IMAGE = 'RECORD_UPLOADED_IMAGE'
const REMOVE_IMAGE = 'REMOVE_IMAGE'

/**
 * INITIAL STATE
 */
const defaultImage = {}

// model example:
//image = {fileUrl: "http://localhost:8080/uploads/images/image-1609018540139.jpg, name: 'image-1609018540139.jpg'}
// user

/**
 * ACTION CREATORS
 */
const getImage = image => ({type: GET_IMAGE, image})
const uploadImage = image => ({type: UPLOAD_IMAGE, image})
const recordUploadedImage = image => ({type: RECORD_UPLOADED_IMAGE, image})
const removeImage = imageId => ({type: REMOVE_IMAGE, imageId})

/**
 * THUNK CREATORS
 */

// expecting image {}
export const fetchRecordUploadedImage = (image, user) => async dispatch => {
  let res
  try {
    const imageToUpload = {...image, userId: user.id}

    res = await axios.post(`/api/upload/record`, imageToUpload)

    if (!res.status == 201) {
      console.error('Status 501 - could not add image to databse')
      return
    }

    dispatch(recordUploadedImage(res.data))

    // now update the list of images
    dispatch(addOneUserImage(image))
  } catch (err) {
    console.error(err)
  }
}

export const fetchUploadImage = (image, user) => async dispatch => {
  let res

  try {
    const {file, hashName} = image

    const formData = new FormData()
    formData.append('file', file)
    formData.append('hashName', hashName)

    // Post the form, just make sure to set the 'Content-Type' header
    const res = await axios.post(`/api/upload/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (!res.status == 201) {
      console.error('Status 501 - could not write file to disk')
      return
    }

    if (
      !res.data ||
      !res.data.data ||
      !res.data.data.uploadedFileUrl ||
      !res.data.data.originalName
    ) {
      console.error(
        'Status 500 - either fileUrl or fileName was not returned while writing'
      )
      return
    }

    const imageToRecord = {
      fileUrl: res.data.data.uploadedFileUrl,
      name: res.data.data.originalName
    }

    // now record the uploaded image
    dispatch(fetchRecordUploadedImage(imageToRecord, user))

    // dispatch(uploadImage(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchRemoveImage = imageId => async dispatch => {
  try {
    const res = await axios.delete(`/api/upload/remove-image/${imageId}`)

    if (!res.status == 204) {
      console.error('Status 501 - could not remove image')
      return
    }
    dispatch(clearOneUserImage(imageId))
    dispatch(removeImage(imageId))

    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultImage, action) {
  switch (action.type) {
    case GET_IMAGE:
      return action.image
    case UPLOAD_IMAGE:
      return action.image
    case RECORD_UPLOADED_IMAGE:
      return action.image
    case REMOVE_IMAGE:
      return state
    default:
      return state
  }
}
