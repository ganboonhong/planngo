import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import RowCenter from '../RowCenter';

export default class PasswordLogin extends Component {

    constructor(props) {
      super(props);
      this.state = {
          password:             '',
          validPassword:        '',
          showHelpTextP:        '',
      }
    }

    checkValid = () => {
        var obj = {
            result: false,
            value: this.state.password
        };

        if (this.state.validPassword) obj['result'] = true;

        return obj;
    }
  
    handlePassword = (e) => {
      var password = e.target.value;
      this.setState({
        password: password,
        validPassword: (password.length >= this.props.minimumLength),
        showHelpTextP: (password.length >= this.props.minimumLength) ? 'hide' : '',
      });
    }

    render() {
        return (
            <div>
                <RowCenter>
                    <FormGroup controlId="formBasicText"> 
                        <ControlLabel>Password*</ControlLabel>
                          <FormControl
                            required={true}
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePassword}
                          />
                          <HelpBlock className={this.state.showHelpTextP}>{`${this.props.passwordHelpText}`}</HelpBlock>
                          <FormControl.Feedback />
                    </FormGroup>
                </RowCenter>
            </div>
        );
    }
}

PasswordLogin.propTypes = {
  checkValid: React.PropTypes.func,
}

PasswordLogin.defaultProps = {
    minimumLength: 8
};