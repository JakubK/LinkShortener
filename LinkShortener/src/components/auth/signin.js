import React from 'react'
import './sign.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

class SignIn extends React.Component
{

  constructor()
  {
    super();
    
    this.state = {
      emailAddress: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event)
  {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  async handleSubmit()
  {
    //validation required

    let data = JSON.stringify({
      email: this.state.emailAddress,
      password: this.state.password
    });

    await axios.post("url", data, {
      headers:
      {
        'Content-Type' : 'application/json'
      }
    }).then(response =>
      {
        //if API returned a token, then store it and redirect the user to the panel 

        //if the status code is unathorized then show the message
      });  
  }

  render()
  {
    return (
      <div className="form-container">
        <div className="auth-form">
          <input name="emailAddress" value={this.state.emailAddress} onChange={this.handleInputChange} className="form-input" placeholder="Email" type="text"/>
          <input name="password" value={this.state.password} onChange={this.handleInputChange} className="form-input" placeholder="Password" type="password"/>
          <label className="password-forgot">I forgot my password</label>
        </div>
        <div className="action-buttons">
            <div>
              <button className="link-continue" onClick={this.handleSubmit}>
                Continue
                <svg aria-hidden="true" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
              </button>
              <NavLink className="link-back" to="/">
                <button type="button">
                  Go Back
                  <svg aria-hidden="true" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" ></path></svg>
                </button>
              </NavLink>
            </div>
          </div>
      </div>
    )
  }
}

export default SignIn;