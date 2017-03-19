import React, { Component } from 'react';
import { FormGroup, FormControl,ControlLabel, HelpBlock } from 'react-bootstrap';
import RowCenter from '../RowCenter';

export default class Username extends Component {

    constructor(props) {
      super(props);
      this.state = {
          username: '',
          validUsername: false,
          showHelpText: '',
      }
    }
    
    checkValid = () => {
        var obj = {
            result: false,
            score: 0,
            value: this.state.username
        }
        if(this.state.validUsername) {
            obj.result = true;
            obj.score = 1;
        }
        return obj;
    }
  
    getValidationState = () => {
      const length = this.state.username.length;
      if (length > this.props.minimumCharacter) return 'success';
      else if (length > 0) return 'error';
    }
  
    handleChange = (e) => {
        var username = e.target.value;
        
        this.setState({
            username: username,
            validUsername: username.length > this.props.minimumCharacter,
            showHelpText: (username.length > this.props.minimumCharacter) ? 'hide' : '',
        });
        this._checkFunc();
    }

    _checkFunc = () => {
        setTimeout(() => {
            this.props.checkFunc();
        }, 500);
    }

    render() {
        return (
                <RowCenter>
                    <FormGroup controlId="username" validationState={this.getValidationState()}> 
                        <ControlLabel>Username*</ControlLabel>
                          <FormControl
                            type="text"
                            required={true}
                            value={this.state.username}
                            placeholder="Your Username"
                            onChange={this.handleChange}
                            autoFocus
                          />
                          <HelpBlock className={this.state.showHelpText}>{`${this.props.usernameHelpText}`}</HelpBlock>
                          <FormControl.Feedback />
                    </FormGroup>
                </RowCenter>
        );
    }
}

Username.propTypes = {
  checkValid: React.PropTypes.func,
  checkFunc: React.PropTypes.func,
};

Username.defaultProps = {
    minimumCharacter: 2
}