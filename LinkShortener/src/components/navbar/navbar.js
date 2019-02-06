
import React from 'react'
import './navbar.css'

import {Link} from 'react-router-dom'

class Navbar extends React.Component
{
  render()
  {
    return (
    <nav className="navbar">
      <Link className="nav-brand" to="/">LinkShortener</Link>
      <div className="navbar-buttons">
        <Link to="/about" className="nav-button">About</Link>
        <Link to="/sign/in" className="nav-button">Sign in / up</Link>
      </div>
    </nav>
    )
  }
}

export default Navbar;