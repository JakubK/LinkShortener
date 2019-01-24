import React from 'react'
import './panel.css'

class Panel extends React.Component
{
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
              <tr>
                <td>localhost:8080/asdasxASx</td>
                <td>google.com/asdasxASx</td>
                <td>
                  <button>Copy to clipboard</button>
                  <button>Set password</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>localhost:8080/asdasxASx</td>
                <td>google.com/asdasxASx</td>
                <td>
                  <button>Copy to clipboard</button>
                  <button>Set password</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>localhost:8080/asdasxASx</td>
                <td>google.com/asdasxASx</td>
                <td>
                  <button>Copy to clipboard</button>
                  <button>Set password</button>
                  <button>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    );
  }
}

export default Panel;