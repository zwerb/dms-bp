import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const LandingHome = props => {
  const {email, user} = props

  return (
    <div className="column-items">
      <h3>Zwerb - Data Management System</h3>
    </div>
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

export default connect(mapState)(LandingHome)
