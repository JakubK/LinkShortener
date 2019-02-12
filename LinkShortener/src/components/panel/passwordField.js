import React from 'react'
import './passwordField.css'
import { connect } from 'react-redux';

import {PASSWORD_FINISH_SET, PASSWORD_NOT_SET} from '../../actions/actions'

class PasswordFieldStub extends React.Component
{
  constructor()
  {
    super();

    this.state ={
      password: ''
    }
  
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event)
  {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  handleSubmit()
  {
  let modifiedTable = [...this.props.linksTable];
  modifiedTable[this.props.modifiedRecord].password = this.state.password;
   this.props.dispatch({
     type: PASSWORD_FINISH_SET,
     payload: modifiedTable
   });
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
            <button onClick={() => this.handleClose()}></button>
          </div>
          <div className="panel-body">
            <h4>Set a Password for your link</h4>
            <input name="password" onChange={this.handleInputChange} type="password"/>
            <br/>
            <button onClick={() => this.handleSubmit()}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({links}) => {
  return {
    modifiedRecord: links.modifiedRecord,
    linksTable: links.linksTable
  };
};

const PasswordField = connect(mapStateToProps)(PasswordFieldStub);

export default PasswordField;