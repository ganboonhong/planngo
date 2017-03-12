import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import RowCenter from '../RowCenter';

export default class Password extends Component {

    constructor(props) {
      super(props);
      this.state = {
          password: '',
          passwordConfirm: '',
          validPassword: '',
          validPasswordConfirm: ''
      };
    }
  
    getValidationState = () => {

      const length = this.state.password.length;
      if (length > this.props.minimumLength) {
        return 'success'
      }else if (length > 0) {
        return 'error'
      };
    };

    checkValid = () => {
        return (this.state.validPassword && this.state.validPasswordConfirm);
    };
  
    handlePassword = (e) => {
        var password = e.target.value;
      this.setState({
        password: password,
        validPassword: (password.length > this.props.minimumLength)
      });
    };

    handlePasswordConfirm = (e) => {
        var passwordConfirm = e.target.value
        this.setState({
            passwordConfirm: passwordConfirm,
            validPasswordConfirm: (this.state.password === passwordConfirm)
        });
    };

    getPasswordConfirmState = () => {
        const length = this.state.passwordConfirm.length;
        if (length === 0)
            return;
        else if(this.state.password === this.state.passwordConfirm) 
            return 'success';
        else
            return 'error';
    };


    render() {

        return (
            <div>
                <RowCenter>
                    <FormGroup
                      controlId="formBasicText"
                      validationState={this.getValidationState()}
                    > 
                        <ControlLabel>Password*</ControlLabel>
                          <FormControl
                            required={true}
                            type="password"
                            value={this.state.password}
                            placeholder={`At least ${this.props.minimumLength} characters`}
                            onChange={this.handlePassword}
                          />
                          <HelpBlock>{`${this.props.passwordHelpText}`}</HelpBlock>
                          <FormControl.Feedback />
                    </FormGroup>
                </RowCenter>

                <RowCenter>
                    <FormGroup
                      controlId="formBasicText"
                      validationState={this.getPasswordConfirmState()}
                    > 
                        <ControlLabel>Confirm Password*</ControlLabel>
                          <FormControl
                            required={true}
                            type="password"
                            value={this.state.passwordConfirm}
                            placeholder="Confirm Your Password"
                            onChange={this.handlePasswordConfirm}
                          />
                          <HelpBlock>{`${this.props.passwordHelpText}`}</HelpBlock>
                          <FormControl.Feedback />
                    </FormGroup>
                </RowCenter>
            </div>
        );
    }
}

Password.defaultProps = {
    minimumLength: 8
};