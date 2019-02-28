
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
        {(!this.props.token || this.props.token === 'undefined') &&      
        <Link to="/sign/in" className="nav-button">Sign in / up</Link>
        }
        {
          (this.props.token && this.props.token !== 'undefined') &&
          <Link to="/panel" className="nav-button">Account</Link>
        }
        { (this.props.token && this.props.token !== 'undefined') && 
          <button onClick={() => this.handleLogout()} className="nav-button">Log out</button>
        }
      </div>
    </nav>
    )
  }

  handleLogout()
  {
    let data = {
      action: 'logUserOut',
      token: this.props.token
    };

    http_client.post(data, this.props).then(() => 
    {
      this.props.dispatch({
        type: TOKEN_FORGOT
      });

      this.props.history.push('/sign/in');
    });
  }
}

const mapStateToProps = ({token}) => {
  return {
    token: token.token
  };
};

const Navbar = connect(mapStateToProps)(NavbarStub);

export default withRouter(Navbar);