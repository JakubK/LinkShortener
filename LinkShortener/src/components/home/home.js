
import React from 'react'
import './home.css'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import { http_client } from '../../http/http_client'

class HomeStub extends React.Component
{
  constructor()
  {
    super();

    this.state = {
      longLink: '',
      linkPassword: '',
      shortLink: '',
      preShortLink: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event)
  {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event)
  {
    event.preventDefault();

    let data = {
      action: 'createShortlink',
      longLink: this.state.longLink,
      linkPassword: this.state.linkPassword,
      shortLink: this.state.preShortLink,
      token: this.props.token
    };

    http_client.post(data, this.props).then(response =>
      {
        //if API returned a token, then store it and redirect the user to the panel 
        if(response.status === 201)
        {
          //display token from response.data
          this.setState({
            shortLink: response.data
          });
        }
      });  
    
    }

  handleCopy()
  {
    const el = document.createElement('textarea');
    let url = window.location;
    el.value = url.protocol + "//" + url.host + "/" + this.state.shortLink;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  render()
  {
    return (
    <main className="home">
      <div className="home-container">
        <input onChange={(e) => this.handleInputChange(e)} name="longLink" className="home-input" placeholder="Paste your link here..." type="text"/>
        <input onChange={(e) => this.handleInputChange(e)} name="linkPassword" className="home-input" placeholder="Set password (optional)" type="password"/>
        {
          this.props.token && 
          <div className="shortlink-frame">
            <div className="shortlink-base">{ window.location.protocol + "//" + window.location.host + "/" }</div>
            <input onChange={(e) => this.handleInputChange(e)} name="preShortLink" className="home-input" placeholder="Set shortlink (optional)" type="text"/>
          </div>
        }
        <button onClick={(e) => this.handleSubmit(e)} className="btn-shorten">Shorten</button>
        { this.state.shortLink &&
            <div className="output-group">
              <svg className="output-arrow" aria-hidden="true" data-prefix="fas" data-icon="arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"></path></svg>
              <p className="output-link">{ 'http://localhost:3000/' + this.state.shortLink  }</p>
              <button onClick={() => this.handleCopy()}>Copy to clipboard</button>
            </div>
        }
      </div>
    </main>
    )
  }
}

const mapStateToProps = ({token}) => {
  return {
    token: token.token
  };
};

const Home = connect(mapStateToProps)(HomeStub);

export default withRouter(Home);