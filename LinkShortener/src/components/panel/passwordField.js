import React from 'react'
import './passwordField.css'
import { connect } from 'react-redux';
import {PASSWORD_FINISH_SET, PASSWORD_NOT_SET, TOKEN_FORGOT} from '../../actions/actions'
import { http_client } from '../../http/http_client'
import {withRouter} from 'react-router'


class PasswordFieldStub extends React.Component
{
  constructor()
  {
    super();

    this.state ={
      password: ''
    }
  
    this.handleInputChange = this.handleInputChange.bind(this);
    this.enterFunction = this.enterFunction.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.enterFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.enterFunction, false);
  }

  enterFunction(event){
    if(event.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleInputChange(event)
  {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  async handleSubmit()
  {
    let modifiedTable = [...this.props.linksTable];
    modifiedTable[this.props.modifiedRecord].password = this.state.password;
   
    let data = {
      action: 'modifyPassword',
      token: this.props.token,
      shortLink: modifiedTable[this.props.modifiedRecord].shortLink,
      newPassword: this.state.password
    };

    try
    {
      await http_client.post(data);
      this.props.dispatch({
        type: PASSWORD_FINISH_SET,
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

  handleClose()
  {
    this.props.dispatch({
      type: PASSWORD_NOT_SET
    });
  }

  render()
  {
    return (
      <div className="modal-frame">
        <div className="modal-panel">
          <div className="panel-heading">
            <button className="modal-close" onClick={() => this.handleClose()}>
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"></path></svg>
            </button>
          </div>
          <div className="panel-body">
            <h4>Set a Password for your link</h4>
            <input name="password" onChange={this.handleInputChange} type="password"/>
            <br/>
            <button className="btn-continue" onClick={() => this.handleSubmit()}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({links, token}) => {
  return {
    modifiedRecord: links.modifiedRecord,
    linksTable: links.linksTable,
    token: token.token
  };
};

const PasswordField = connect(mapStateToProps)(PasswordFieldStub);

export default withRouter(PasswordField);