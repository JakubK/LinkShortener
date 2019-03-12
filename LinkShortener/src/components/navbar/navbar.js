
import React from 'react'
import './navbar.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {http_client} from '../../http/http_client'

import {Link} from 'react-router-dom'
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
        { !this.tokenIsAvailable() &&      
        <Link to="/sign/in" className="nav-button">Sign in / up</Link>
        }
        {
          this.tokenIsAvailable() &&
          <Link to="/panel" className="nav-button">Account</Link>
        }
        { this.tokenIsAvailable() && 
          <button onClick={() => this.handleLogout()} className="nav-button">Log out</button>
        }
      </div>
    </nav>
    )
  }
  
  tokenIsAvailable()
  {
    if(this.props.token === undefined || this.props.token === 'undefined' || this.props.token === null || this.props.token === 'null')
      return false;
      
    return true;
  }

  async handleLogout()
  {
    let data = {
      action: 'logUserOut',
      token: this.props.token
    };

    try
    {
      const response = await http_client.post(data);
      if(response)
      {
        this.props.dispatch({
          type: TOKEN_FORGOT
        });
        this.props.history.push('/sign/in');
      }
    }
    catch(error)
    {
      this.props.dispatch({
        type: TOKEN_FORGOT
      });
      this.props.history.push('/sign/in');
    }
  }
}

const mapStateToProps = ({token}) => {
  return {
    token: token.token
  };
};

const Navbar = connect(mapStateToProps)(NavbarStub);

export default withRouter(Navbar);