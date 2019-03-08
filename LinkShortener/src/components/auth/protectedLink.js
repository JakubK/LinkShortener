import React from 'react'
import {withRouter} from 'react-router'
import { http_client } from '../../http/http_client';
class ProtectedLink extends React.Component
{
  async componentWillMount()
  {
   await this.handleSubmit();
  }

  handleInputChange(event)
  {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  async handleSubmit(password)
  {
    //try to hit the server with translation call 
    let data = {
      action: 'translate',
      shortLink: this.props.match.params.hash,
      linkPassword: password
    };

    try
    {
      const response = await http_client.post(data);
      if(response.status === 200)
        document.location.href = response.data;
    }
    catch(error)
    {
      if(error.response.status === 401)
      {
        //bad password
        this.setState({errorText: 'Bad password'});
      }
      else if(error.response.status === 404)
      {
        //link doesn't exist
        this.props.history.push('/');
      }
    }
  }

  constructor()
  {
    super();

    this.state = {
      password: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render()
  {
    return(
    <div className="auth-container">
      <main className="auth-panel">
        <div className="protected-panel">
          <div className="protected-info">
            <h4>The link is protected by password. <br/> Please type it before proceeding</h4>
          </div>
          <svg className="icon-lock" aria-hidden="true" data-prefix="fas" data-icon="lock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
          <input name="password" onChange={(e) => this.handleInputChange(e)} className="form-input" type="password" placeholder="Password"/>
          <p className="error-text">{this.state.errorText}</p>
        </div>
        <div className="action-buttons">
          <div>
            <button onClick={ async() => await this.handleSubmit(this.state.password)} className="btn-continue">
              Continue
              <svg aria-hidden="true" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
            </button>
          </div>
        </div>
      </main>
    </div>
    )
  }
}

export default withRouter(ProtectedLink);