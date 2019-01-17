import React from 'react'
import './sign.css'

class SignIn extends React.Component
{
  render()
  {
    return (
      <div className="form-container">
        <div className="auth-form">
          <input className="form-input" placeholder="Email" type="text"/>
          <input className="form-input" placeholder="Password" type="password"/>
          <label className="password-forgot">I forgot my password</label>
        </div>
      </div>
    )
  }
}

export default SignIn;