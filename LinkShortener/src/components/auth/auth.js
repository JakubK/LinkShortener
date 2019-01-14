import React from 'react'
import './auth.css'
import { NavLink } from 'react-router-dom'

class Auth extends React.Component
{
  render()
  {
    return (
      <div className="auth-container">
        <main className="auth-panel">
          <div className="panel-options">
            <NavLink activeClassName="selected" to="/sign/in">Sign In</NavLink>
            <NavLink activeClassName="selected" to="/sign/up">Sign Up</NavLink>
          </div>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default Auth;