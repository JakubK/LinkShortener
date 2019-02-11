import React from 'react'
import './panel.css'
import PasswordField from './passwordField'
import {INIT_PASSWORD_SET, LINKS_LOADED,LINK_REMOVED, PASSWORD_REMOVED} from '../../actions/actions'

import { connect } from 'react-redux';

class PanelStub extends React.Component
{
  componentDidMount()
  {
    //Fetch Links array;
    this.props.dispatch({
      type: LINKS_LOADED,
      payload: [{shortUrl: "x", longUrl: "D", password: "XD"},{shortUrl: "xA", longUrl: "DA"},{shortUrl: "xC", longUrl: "DC", password: "ASDASD"}]
    });
  }

  handleDelete(i)
  {
    this.props.dispatch(
      {
        type: LINK_REMOVED,
        payload: i
      }
    );

    //call the API and the modify the Store
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

  handleSetPassword(i)
  {
    let action = {
      type: INIT_PASSWORD_SET,
      payload: i     
    };

    this.props.dispatch(action)
  }

  handleRemovePassword(i)
  {
    let modifiedTable = this.props.linksTable;
    delete modifiedTable[i].password;
    let action = {
      type: PASSWORD_REMOVED,
      payload: {
        linksTable: modifiedTable,
        index: i
      }
    };

    this.props.dispatch(action)
    this.forceUpdate();
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
          <button>Reset password</button>
        </div>
        <div className="account-links">
          <h4>Your Links</h4>
          <table className="links-table">
            <thead>
              <tr><th>Short Link</th><th>Long Link</th><th>Actions</th></tr>
            </thead>
            <tbody>
              { this.TableRow(this.props.linksTable) }
            </tbody>
          </table>
        </div>
      </main>
    );
  }

   TableRow(linksTable) {
     if(linksTable !== undefined)
     {
      let arr = [];
      for(let i = 0;i < linksTable.length;i++)
      {
        arr.push(
        <tr key={i}>
          <td>{ linksTable[i].shortUrl}</td>
          <td>{ linksTable[i].longUrl}</td>
          <td>
            <button onClick={() => this.handleCopy(i)}>Copy to clipboard</button>
            {
             linksTable[i].password !== undefined && 
            <button onClick={() => this.handleRemovePassword(i)}>Remove password</button>
            }
            {
             linksTable[i].password === undefined && 
            <button onClick={() => this.handleSetPassword(i)}>Set password</button>
            }
            <button onClick={() => this.handleDelete(i)}>Delete</button>
          </td>
        </tr>
        );
      }
      return arr;
    }
  }

}

const mapStateToProps = ({panel, links}) => {
  return {
    modifiedRecord: panel.modifiedRecord,
    linksTable: links.linksTable
  };
};

const Panel = connect(mapStateToProps)(PanelStub);

export default Panel;