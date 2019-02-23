
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
        {(!this.props.token || this.props.token === 'undefined') &&      
        <Link to="/sign/in" className="nav-button">Sign in / up</Link>
        }
        {
          (this.props.token && this.props.token !== 'undefined') &&
          <Link to="/panel" className="nav-button">Account</Link>
        }
        { (this.props.token && this.props.token !== 'undefined') && 
          <Link to="/sign/in" onClick={() => this.handleLogout()} className="nav-button">Log out</Link>
        }
      </div>
    </nav>
    )
  }

  handleLogout()
  {
    let data = qs.stringify({
      action: 'logUserOut',
      token: this.props.token
    });

    axios.post(http_config.BASE,data, {
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    })

    this.props.dispatch({
      type: TOKEN_FORGOT
    });
  }
}

const mapStateToProps = ({token}) => {
  return {
    token: token.token
  };
};

const Navbar = connect(mapStateToProps)(NavbarStub);

export default Navbar;