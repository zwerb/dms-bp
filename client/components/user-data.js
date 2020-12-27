import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchGetUserImages, clearOneUserImage, fetchRemoveImage} from '../store'

/**
 * COMPONENT
 */

const UserData = props => {
  const {isLoggedIn, user, userImages} = props

  const {getUserImages, clearImage, removeImage} = props

  useEffect(() => {
    if (isLoggedIn) {
      getUserImages(user)
    }
  }, [])

  if (isLoggedIn) {
    return (
      <div className="column-items">
        {userImages && userImages.length > 0 ? (
          <div className="column-items">
            {userImages.sort((a, b) => b.id - a.id).map(image => (
              <div className="column-items" key={image.id}>
                <span>{image.name}</span>
                <img className="image-small" src={image.fileUrl} />
                <button
                  onClick={() => {
                    removeImage(image.id)
                  }}
                  className="remove-button"
                  type="button"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="column-items">
            <span>No Images</span>
          </div>
        )}
      </div>
    )
  } else {
    return <div className="column-items" />
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    userImages: state.userImages
  }
}

const mapDispatch = dispatch => {
  return {
    getUserImages: user => dispatch(fetchGetUserImages(user)),
    clearImage: imageId => dispatch(clearOneUserImage(imageId)),
    removeImage: imageId => dispatch(fetchRemoveImage(imageId))
  }
}

export default connect(mapState, mapDispatch)(UserData)
