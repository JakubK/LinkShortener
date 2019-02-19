
import React from 'react'
import './navbar.css'
import { connect } from 'react-redux'
import axios from 'axios'
import qs from 'qs'

import {Link} from 'react-router-dom'
import { http_config } from '../../http/http_config'
import {TOKEN_FORGOT} from '../../actions/actions'

class NavbarStub extends React.Component
{
  render()
  {
    return (
    <nav className="navbar">
      <Link className="nav-brand" to="/">LinkShortener</Link>
      <div className="navbar-buttons">
        <Link to="/about" className="nav-button">About</Link>
        {!this.props.token && 
        
        <Link to="/sign/in" className="nav-button">Sign in / up</Link>
        }
        {this.props.token && 
        
        <button onClick={() => this.handleLogout()} className="nav-button">Log out</button>
        }
      </div>
    </nav>
    )
  }

  handleLogout()
  {
    let data = qs.stringify({
      action: 'loginUserOut',
      token: this.props.token
    });

    axios.put(http_config.BASE,data, {
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).then(response =>
      {
        this.props.dispatch({
          type: TOKEN_FORGOT
        });
      })
  }
}

const mapStateToProps = ({token}) => {
  return {
    token: token.token
  };
};

const Navbar = connect(mapStateToProps)(NavbarStub);

export default Navbar;