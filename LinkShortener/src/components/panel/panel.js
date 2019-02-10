import React from 'react'
import './panel.css'

class Panel extends React.Component
{
  constructor()
  {
    super();
    this.state =
    {
      linksTable: [{shortUrl: "x", longUrl: "D"},{shortUrl: "xA", longUrl: "DA"},{shortUrl: "xC", longUrl: "DC"}]
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  handleDelete(i)
  {
    let array = [...this.state.linksTable];
    array.splice(i,1);
    this.setState({linksTable: array});

    //call the API and the modify the Store
  }

  handleCopy(i)
  {
    const el = document.createElement('textarea');
    el.value = this.state.linksTable[i].shortUrl;
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
      <main className="panel-container">
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
              { this.TableRow(this.state.linksTable) }
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
            <button  onClick={() => this.handleCopy(i)}>Copy to clipboard</button>
            <button>Set password</button>
            <button onClick={() => this.handleDelete(i)}>Delete</button>
          </td>
        </tr>
        );
      }
      return arr;
    }
  }

}


export default Panel;