import React from 'react'
import './sign.css'

class SignUp extends React.Component
{
  render()
  {
    return (
      <div className="form-container">
        <div className="auth-form">
          <input className="form-input" placeholder="Email" type="text"/>
          <input className="form-input" placeholder="Password" type="password"/>
          <input className="form-input" placeholder="Confirm Password" type="password"/>
        </div>
      </div>
    )  
  }
}

export default SignUp;