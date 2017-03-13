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
          validPasswordConfirm: '',
          showHelpTextP:'',
          showHelpTextPC:'',
      }
    }
  
    getValidationState = () => {

      const length = this.state.password.length;
      if (length >= this.props.minimumLength) {
        return 'success'
      }else if (length > 0) {
        return 'error'
      };
    }

    checkValid = () => {
        var obj       = {
            result: false,
            score:  0,
        };

        if (this.state.validPassword && this.state.validPasswordConfirm) obj['result'] = true;
        if (this.state.validPassword) obj.score++;
        if (this.state.validPasswordConfirm) obj.score++;

        return obj;

    }
  
    handlePassword = (e) => {
      var password = e.target.value;
      this.setState({
        password: password,
        validPassword: (password.length >= this.props.minimumLength),
        showHelpTextP: (password.length >= this.props.minimumLength) ? 'hide' : '',
      });
      this._checkFunc();
    }

    _checkFunc = () =>{
        setTimeout(() => {
            this.props.checkFunc();
        }, 500)
    }

    handlePasswordConfirm = (e) => {
        var passwordConfirm = e.target.value
        this.setState({
            passwordConfirm: passwordConfirm,
            validPasswordConfirm: (this.state.password === passwordConfirm 
                && passwordConfirm.length >= this.props.minimumLength),
            showHelpTextPC: (this.state.password === passwordConfirm  && 
                passwordConfirm.length >= this.props.minimumLength) ? 'hide' : '',
        });
        this._checkFunc();
    }

    getPasswordConfirmState = () => {
        const length = this.state.passwordConfirm.length;
        if (length === 0)
            return;
        else if(this.state.password === this.state.passwordConfirm && length >-  this.props.minimumLength)
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
                          <HelpBlock className={this.state.showHelpTextP}>{`${this.props.passwordHelpText}`}</HelpBlock>
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
                          <HelpBlock className={this.state.showHelpTextPC}>{`${this.props.passwordHelpText}`}</HelpBlock>
                          <FormControl.Feedback />
                    </FormGroup>
                </RowCenter>
            </div>
        );
    }
}

Password.propTypes = {
  checkValid: React.PropTypes.func,
  checkFunc: React.PropTypes.func,
}

Password.defaultProps = {
    minimumLength: 8
};