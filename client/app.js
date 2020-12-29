import React from 'react'

import {Navbar, UserData} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="main-wrapper">
      <header className="header">
        <div className="header-branding">
          <img
            className="header-image"
            src="/images/zwerb-z_logo-WHT_BDR.png"
          />
          DMS
        </div>
        <Navbar />
      </header>
      <content className="main">
        <Routes />
      </content>
      <aside className="aside aside-1">Aside 1</aside>
      <aside className="aside aside-2">
        <UserData />
      </aside>
      <footer className="footer">
        <a href="https://www.zwerb.com">Zwerb</a>
      </footer>
    </div>
  )
}

export default App
