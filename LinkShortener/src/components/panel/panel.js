import React from 'react'
import './panel.css'
import PasswordField from './passwordField'
import {TOKEN_FORGOT, LINKS_LOADED,LINK_REMOVED, PASSWORD_INIT_SET, PASSWORD_REMOVED, LINK_CHANGED } from '../../actions/actions'

import { connect } from 'react-redux'
import { http_client } from '../../http/http_client'

import {withRouter} from 'react-router'

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
      newPasswordRepeat: '',

      longLink: '',
      shortLink: '',

      oldShortLink: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount()
  {
    //Fetch Links array
    let data = {
      action: 'getUserLinks',
      token: this.props.token
    };

    try
    {
      const response = await http_client.post(data);
      if(response.status === 200)
      {
        this.props.dispatch(
          {
            type: LINKS_LOADED,
            payload: response.data
          }
        );
      }
    }
    catch(error)
    {
      if(error.response.status === 401 || error.response.status === 408)
      {
        this.props.dispatch({
          action: TOKEN_FORGOT
        });
        this.props.history.push('/sign/in');
      }
    }
  }

  async handleDelete(i)
  {
    let data = {
      action: 'deleteShortlink',
      shortLink: this.props.linksTable[i].shortLink,
      token: this.props.token
    };

    try
    {
      const response = await http_client.post(data);
      if(response.status === 200)
      {
        this.props.dispatch(
          {
            type: LINK_REMOVED,
            payload: i
          }
        );
      }
    }
    catch(error)
    {
      if(error.response.status === 401 || error.response.status === 408)
      {
        this.props.dispatch({
          action: TOKEN_FORGOT
        });
        this.props.history.push('/sign/in');
      }
    }
  }

  handleCopy(i)
  {
    const el = document.createElement('textarea');
    let url = window.location;
    el.value = url.protocol + "//" + url.host + "/" + this.props.linksTable[i].shortLink;
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
        modifiedField: "longLink",
        modifiedId: i
      });
    }
  }

  handleShortLinkRename(e, i)
  {
    if(e.target.type !== 'submit')
    {
      this.setState({
        modifiedField: "shortLink",
        modifiedId: i,
        oldShortLink: this.props.linksTable[i].shortLink
      });
    }
  }

  async handleLinkRenameSubmit(e)
  {
    e.preventDefault();

    let modifiedTable = [...this.props.linksTable];
    let data;

    if(this.state.modifiedField === 'shortLink')
    {
      modifiedTable[this.state.modifiedId].shortLink = this.state.shortLink;
      data = {
        action: 'modifyShortlink',
        token: this.props.token,
        shortLink: this.state.oldShortLink,
        newShortLink: this.state.shortLink
      }
    }
    else
    {
      modifiedTable[this.state.modifiedId].longLink = this.state.longLink;
      data = {
        action: 'modifyLonglink',
        token: this.props.token,
        shortLink: modifiedTable[this.state.modifiedId].shortLink,
        newLongLink: this.state.longLink
      }
    }

    try
    {
      const response = await http_client.post(data);
      if(response.status === 200)
      {
        this.props.dispatch({
          type: LINK_CHANGED,
          payload: modifiedTable
        });
      }
      this.setState({
        modifiedId: undefined
      });
    }
    catch(error)
    {
      if(error.response.status === 401 || error.response.status === 408)
      {
        this.props.dispatch({
          action: TOKEN_FORGOT
        });
        this.props.history.push('/sign/in');
      }
    }
  }

   handleSetPassword(i){
    this.props.dispatch({
      type: PASSWORD_INIT_SET,
      payload: i
    });
  }

  async handleRemovePassword(i){
    let modifiedTable = [...this.props.linksTable];
    modifiedTable[i].password = '';

    let data = {
      action: 'modifyPassword',
      token: this.props.token,
      shortLink: modifiedTable[i].shortLink,
      newPassword: ''
    };

    try
    {
      await http_client.post(data);
      this.props.dispatch({
        type: PASSWORD_REMOVED,
        payload: modifiedTable
      });
    }
    catch(error)
    {
      if(error.response.status === 401 || error.response.status === 408)
      {
        this.props.dispatch({
          action: TOKEN_FORGOT
        });
        this.props.history.push('/sign/in');
      }
    }
  }

  handleInputChange(event)
  {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  async handleChangePassword(e)
  {
    e.preventDefault();

    if(this.state.newPassword === this.state.newPasswordRepeat)
    {
      let data = {
        action: 'changeUserPassword',
        token: this.props.token,
        newPassword: this.state.newPassword
      };
      
      try
      {
        await http_client.post(data,this.props);
      }
      catch(error)
      {
        if(error.response.status === 401 || error.response.status === 408)
        {
          this.props.dispatch({
            action: TOKEN_FORGOT
          });
          this.props.history.push('/sign/in');
        }
      }
    }

    this.setState({
      modifiedField: undefined
    });
  }
  
  async handleChangeEmail(e)
  {
    e.preventDefault();

    let data = {
      action: 'changeUserEmail',
      token: this.props.token,
      newEmail: this.state.newEmail
    };

    try
    {
      const response = await http_client.post(data);
      if(response.status === 200)
      {
        if(response.status === 200){
          this.props.dispatch({
            type: TOKEN_FORGOT
          })
          this.props.history.push("/sign/in")
        }
      }
    }
    catch(error)
    {
      if(error.response.status === 401 || error.response.status === 408)
      {
        this.props.dispatch({
          action: TOKEN_FORGOT
        });
        this.props.history.push('/sign/in');
      }
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
            {this.state.modifiedField !== 'email' &&
            <button className="btn-change" onClick={() => this.setState({modifiedField: 'email'})}>Change</button>
            }
            {this.state.modifiedField === 'email' &&
              <form onSubmit={(e) => this.handleChangeEmail(e)}>
                <label>New Email</label><br/>
                <input name="newEmail" type="text" onChange={(e) => this.handleInputChange(e)}/><br/>
                <button type="submit">Submit</button>
              </form>
            }
          </div>
          {this.state.modifiedField !== 'password' && 
          <button className="btn-reset" onClick={() => this.setState({modifiedField : 'password'})}>Reset password</button>
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

                  { (this.state.modifiedId !== i || this.state.modifiedField !== 'shortLink') &&
                  
                   element.shortLink}
                  { (this.state.modifiedId === i && this.state.modifiedField === 'shortLink') && <div><input name="shortLink" onChange={(e) => this.handleInputChange(e)} type="text"/><button onClick={(e) => this.handleLinkRenameSubmit(e)}>Submit</button></div>}

                </td>
                <td onClick={(e) => this.handleLongLinkRename(e,i)}>
                
                  { (this.state.modifiedId !== i || this.state.modifiedField !== 'longLink') && element.longLink}
                  { (this.state.modifiedId === i && this.state.modifiedField === 'longLink') && <div><input name="longLink" onChange={(e) => this.handleInputChange(e)} type="text"/><button onClick={(e) => this.handleLinkRenameSubmit(e)}>Submit</button></div>}                
                </td>
                <td>
                  <button className="action-copy" onClick={() => this.handleCopy(i)}>Copy to clipboard</button>
                  {
                    element.password !== '' && 
                    <button className="action-password" onClick={async() => await this.handleRemovePassword(i)}>Remove password</button>
                  }
                  {
                    element.password === '' && 
                    <button className="action-password" onClick={() => this.handleSetPassword(i)}>Set password</button>
                  }
                  <button className="action-delete" onClick={() => this.handleDelete(i)}>Delete</button>
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

export default withRouter(Panel);