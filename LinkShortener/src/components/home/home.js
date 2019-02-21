
import React from 'react'
import './home.css'
import { connect } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import {http_config} from '../../http/http_config'

class HomeStub extends React.Component
{
  constructor()
  {
    super();

    this.state = {
      longLink: '',
      linkPassword: '',
      shortLink: ''
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

    let data = qs.stringify({
      action: 'createShortlink',
      longLink: this.state.longLink,
      linkPassword: this.state.linkPassword,
      token: this.props.token
    });
    axios.post(http_config.BASE, data, {
      headers:
      {
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).then(response =>
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

  render()
  {
    return (
    <main className="home">
      <div className="home-container">
        <input onChange={(e) => this.handleInputChange(e)} name="longLink" className="home-input" placeholder="Paste your link here..." type="text"/>
        <input onChange={(e) => this.handleInputChange(e)} name="linkPassword" className="home-input" placeholder="Set password (optional)" type="password"/>
        <button onClick={(e) => this.handleSubmit(e)} className="btn-shorten">Shorten</button>

        <svg className="output-arrow" aria-hidden="true" data-prefix="fas" data-icon="arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"></path></svg>
        <p className="output-link">{ 'http://localhost:3000/' + this.state.shortLink  }</p>
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

export default Home;