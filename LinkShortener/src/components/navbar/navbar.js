
import React from 'react'
import './navbar.css'

class Navbar extends React.Component
{
  render()
  {
    return (
    <nav className="navbar">
      <div>LinkShortener</div>
      <div className="navbar-buttons">
        <button>About</button>
        <button>Sign in / up</button>
      </div>
    </nav>
    )
  }
}

export default Navbar;