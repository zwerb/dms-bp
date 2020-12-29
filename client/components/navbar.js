import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearUserImages} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav>
    {isLoggedIn ? (
      <ul className="navigation">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/uploads">Uploads</Link>
        </li>
        <li>
          <Link to="/neurons">Neurons</Link>
        </li>

        <li>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </li>
      </ul>
    ) : (
      <ul className="navigation">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    )}
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearUserImages())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
