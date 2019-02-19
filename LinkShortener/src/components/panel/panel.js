import React from 'react'
import './panel.css'
import PasswordField from './passwordField'
import {LINKS_LOADED,LINK_REMOVED, PASSWORD_INIT_SET, PASSWORD_REMOVED, LINK_CHANGED } from '../../actions/actions'

import { connect } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import {http_config} from '../../http/http_config'

class PanelStub extends React.Component
{
  constructor()
  {
    super();
    this.state ={
      modifiedField: '',
      modifiedId: '',
      newEmail: '',
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount()
  {
    //Fetch Links array
    let data = JSON.stringify({
      action: 'getUserLinks',
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
        if(response.status === 200)
        {
          this.props.dispatch(
            {
              type: LINKS_LOADED,
              payload: response.data
            }
          );
          this.props.history.push('/panel');
        }
      });  
  }

  handleDelete(i)
  {
    let data = {
      linkToRemove: this.props.linksTable[i],
      token: this.props.token
    }

    axios.delete(http_config.BASE, data, {
      headers:
      {
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).then(response =>
      {
        this.props.dispatch(
          {
            type: LINK_REMOVED,
            payload: i
          }
        );
      }); 
  }

  handleCopy(i)
  {
    const el = document.createElement('textarea');
    el.value = this.props.linksTable[i].shortUrl;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  handleLongLinkRename(e, i)
  {
    if(e.target.type !== 'submit')
    {
      this.setState({
        modifiedField: "longUrl",
        modifiedId: i
      });
    }
  }

  handleShortLinkRename(e, i)
  {
    if(e.target.type !== 'submit')
    {
      this.setState({
        modifiedField: "shortUrl",
        modifiedId: i
      });
    }
  }

  handleLinkRenameSubmit(e)
  {
    e.preventDefault();
    let modifiedTable = [...this.props.linksTable];
    if(this.state.modifiedField === 'shortUrl')
      modifiedTable[this.state.modifiedId].shortUrl = this.state.shortUrl;
    else
      modifiedTable[this.state.modifiedId].longUrl = this.state.longUrl;

    let data = {
      index: this.state.modifiedId,
      link: modifiedTable[this.state.modifiedId],
      token: this.props.token
    };

    axios.put(http_config.BASE, data, {
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).then(response =>{
        this.props.dispatch({
          type: LINK_CHANGED,
          payload: modifiedTable
        });
    
        this.setState({
          modifiedId: undefined
        });
      }); 
  }

  handleSetPassword(i)
  {
    this.props.dispatch({
      type: PASSWORD_INIT_SET,
      payload: i
    });
  }

  handleRemovePassword(i)
  {
    let modifiedTable = [...this.props.linksTable];
    modifiedTable[i].password = undefined;

    let data = modifiedTable[i];
    axios.put(http_config.BASE, data, {
      headers:
      {
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).then(response =>
      {
        this.props.dispatch({
          type: PASSWORD_REMOVED,
          payload: modifiedTable
        });
      }); 
  }

  handleInputChange(event)
  {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleChangePassword(e)
  {
    e.preventDefault();

    if(this.state.newPassword === this.state.newPasswordRepeat)
    {
      let data = qs.stringify({
        action: 'changeUserPassword',
        token: this.props.token,
        newPassword: this.state.newPassword
      })
      axios.post(http_config.BASE,data,{
        headers:{
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      });
    }


    this.setState({
      modifiedField: undefined
    });
  }

  render()
  {
    return (
      <main className="panel-container">
       {
          this.props.modifiedRecord !== undefined &&
         <PasswordField/>
        }
        <div className="account-settings">
          <div className="profile-frame">
            <svg className="profile-icon" aria-hidden="true" data-prefix="fas" data-icon="user-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path></svg>
          </div>
          <div>
            <label>example@example.com</label><br/>
            <button>Change</button>
          </div>
          {this.state.modifiedField !== 'password' && 
          <button onClick={() => this.setState({modifiedField : 'password'})}>Reset password</button>
          }
          {this.state.modifiedField === 'password' &&
            <form onSubmit={(e) => this.handleChangePassword(e)}>
              <label>Old Passowrd</label><br/>
              <input name="oldPassword" type="password" onChange={(e) => this.handleInputChange(e)}/><br/>
              <label>New Passowrd</label><br/>
              <input name="newPassword" type="password" onChange={(e) => this.handleInputChange(e)}/><br/>
              <label>Repeat New Passowrd</label><br/>
              <input name="newPasswordRepeat" type="password" onChange={(e) => this.handleInputChange(e)}/><br/>
              <button type="submit">Submit</button>
            </form>
          }
        </div>
        <div className="account-links">
          <h4>Your Links</h4>
          <table className="links-table">
            <thead>
              <tr><th>Short Link</th><th>Long Link</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {
              this.props.linksTable.map((element,i) => (
              <tr key={i}>
                <td onClick={(e) => this.handleShortLinkRename(e,i)}>

                  { (this.state.modifiedId !== i || this.state.modifiedField !== 'shortUrl') && element.shortUrl}
                  { (this.state.modifiedId === i && this.state.modifiedField === 'shortUrl') && <div><input name="shortUrl" onChange={(e) => this.handleInputChange(e)} type="text"/><button onClick={(e) => this.handleLinkRenameSubmit(e)}>Submit</button></div>}

                </td>
                <td onClick={(e) => this.handleLongLinkRename(e,i)}>
                
                  { (this.state.modifiedId !== i || this.state.modifiedField !== 'longUrl') && element.longUrl}
                  { (this.state.modifiedId === i && this.state.modifiedField === 'longUrl') && <div><input name="longUrl" onChange={(e) => this.handleInputChange(e)} type="text"/><button onClick={(e) => this.handleLinkRenameSubmit(e)}>Submit</button></div>}                
                </td>
                <td>
                  <button onClick={() => this.handleCopy(i)}>Copy to clipboard</button>
                  {
                    element.password !== undefined && 
                    <button onClick={() => this.handleRemovePassword(i)}>Remove password</button>
                  }
                  {
                    element.password === undefined && 
                    <button onClick={() => this.handleSetPassword(i)}>Set password</button>
                  }
                  <button onClick={() => this.handleDelete(i)}>Delete</button>
                </td>
              </tr>
               ))
              }
            </tbody>
          </table>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({token,links}) => {
  return {
    modifiedRecord: links.modifiedRecord,
    linksTable: links.linksTable,
    token: token.token
  };
};

const Panel = connect(mapStateToProps)(PanelStub);

export default Panel;