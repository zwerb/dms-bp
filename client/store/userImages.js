import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

// Images are uploaded immediately upon drag-drop or selection
// The "Submit" button simply finalizes or "records" them by
// creating a new database entry for them with the image link

const GET_USER_IMAGES = 'GET_USER_IMAGES'
const CLEAR_USER_IMAGES = 'CLEAR_USER_IMAGES'
const CLEAR_ONE_USER_IMAGE = 'CLEAR_ONE_USER_IMAGE'
const ADD_ONE_USER_IMAGE = 'ADD_ONE_USER_IMAGE'

/**
 * INITIAL STATE
 */
const defaultUserImages = []

// model example:
//image = {fileUrl: "http://localhost:8080/uploads/images/image-1609018540139.jpg, name: 'image-1609018540139.jpg'}
// user

/**
 * ACTION CREATORS
 */
const getUserImages = userImages => ({type: GET_USER_IMAGES, userImages})
export const clearUserImages = userImages => ({
  type: CLEAR_USER_IMAGES,
  userImages: []
})

export const clearOneUserImage = imageId => ({
  type: CLEAR_ONE_USER_IMAGE,
  imageId
})

export const addOneUserImage = image => ({
  type: ADD_ONE_USER_IMAGE,
  image
})

/**
 * THUNK CREATORS
 */

export const fetchGetUserImages = user => {
  return async dispatch => {
    try {
      const userId = user.id

      const {data} = await axios.get(`/api/users/${userId}`)

      const {images} = data

      dispatch(getUserImages(images))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUserImages, action) {
  switch (action.type) {
    case GET_USER_IMAGES:
      return action.userImages
    case ADD_ONE_USER_IMAGE:
      const newUserImagesPlusOne = [action.image, ...state]
      return newUserImagesPlusOne
    case CLEAR_USER_IMAGES:
      return action.userImages
    case CLEAR_ONE_USER_IMAGE:
      const newUserImagesLessOne = state.filter(
        image => image.id != action.imageId
      )
      return newUserImagesLessOne
    default:
      return state
  }
}
