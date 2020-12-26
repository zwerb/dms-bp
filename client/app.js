import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="main-wrapper">
      <header className="header">
        <div className="header-branding">
          <img className="header-image" src="images/zwerb-z_logo-WHT_BDR.png" />DMS
        </div>
        <Navbar />
      </header>
      <hr />
      <Routes />
    </div>
  )
}

export default App
