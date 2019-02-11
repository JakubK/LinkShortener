import React from 'react'
import './passwordField.css'
import { connect } from 'react-redux';
import {FINISH_PASSWORD_SET,FINISH_PASSWORD_NOT_SET} from '../../actions/actions'

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

  handleSubmit(definedPassword)
  {
    if(definedPassword)
    {
      let modifiedTable = this.props.linksTable;
      modifiedTable[this.props.modifiedRecord].password = this.state.password;
      
      this.props.dispatch({
        type: FINISH_PASSWORD_SET,
        payload: {
          payload: modifiedTable
        }
      });
    }
    else
    {
      this.props.dispatch({
        type: FINISH_PASSWORD_NOT_SET,
      });
    }
  }

  render()
  {
    return (
      <div className="modal-frame">
        <div className="modal-panel">
          <div className="panel-heading">
            <button onClick={() => this.handleSubmit(false)}></button>
          </div>
          <div className="panel-body">
            <h4>Set a Password for your link</h4>
            <input name="password" onChange={this.handleInputChange} type="password"/>
            <br/>
            <button onClick={() => this.handleSubmit(true)}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({panel, links}) => {
  return {
    modifiedRecord: panel.modifiedRecord,
    linksTable: links.linksTable
  };
};

const PasswordField = connect(mapStateToProps)(PasswordFieldStub);

export default PasswordField;