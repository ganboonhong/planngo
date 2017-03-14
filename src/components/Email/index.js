import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import RowCenter from '../RowCenter';

export default class Email extends Component {

    constructor(props) {
      super(props);
      this.state = {
          email: '',
          validEmail: false,
          showHelpText: ''
      };
    }

    checkValid = () => {
        var obj = {
            result: false,
            score: 0,
            value: this.state.email
        }

        if(this.state.validEmail){
            obj.result = true;
            obj.score  = 1;
        }

        return obj;
    }
  
    getValidationState = () => {
      var email = this.state.email;  
      const re = this.props.re;
      if (re.test(email)) return 'success';
      else if (!email) return;
      else if (!re.test(email)) return 'error';
    }
  
    handleChange = (e) => {
      this.setState({
        email: e.target.value,
        validEmail: this.props.re.test(e.target.value),
        showHelpText: (this.props.re.test(e.target.value)) ? 'hide' : '',
      });
      this._checkFunc();
    }

    _checkFunc = () => {
        setTimeout( () => {
            this.props.checkFunc();
        }, 500)
    }

    render() {
        return (
                <RowCenter>
                    <FormGroup controlId="formBasicText" validationState={this.getValidationState()}> 
                        <ControlLabel>Email*</ControlLabel>
                          <FormControl
                            type="email"
                            required={true}
                            value={this.state.email}
                            placeholder="Your Email"
                            onChange={this.handleChange}
                          />
                          <HelpBlock className={this.state.showHelpText}>{`${this.props.emailHelpText}`}</HelpBlock>
                          <FormControl.Feedback />
                    </FormGroup>
                </RowCenter>
        );
    }
}

Email.propTypes = {
  checkValid: React.PropTypes.func,
  checkFunc: React.PropTypes.func,
};

Email.defaultProps = {
    re: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};