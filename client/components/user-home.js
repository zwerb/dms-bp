import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {NeuronSketch} from '../components'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, user} = props

  return (
    <div className="column-items">
      <h3>Welcome, {email}</h3>
      <NeuronSketch />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
