import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import RowCenter from '../RowCenter';

export default class EmailLogin extends Component {

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
    }

    render() {
        return (
                <RowCenter>
                    <FormGroup controlId="email" validationState={this.getValidationState()}> 
                        <ControlLabel>Email*</ControlLabel>
                          <FormControl
                            type="email"
                            required={true}
                            value={this.state.email}
                            onChange={this.handleChange}
                            autoFocus
                          />
                          <HelpBlock className={this.state.showHelpText}>{`${this.props.emailHelpText}`}</HelpBlock>
                          <FormControl.Feedback />
                    </FormGroup>
                </RowCenter>
        );
    }
}

EmailLogin.propTypes = {
  checkValid: React.PropTypes.func,
};

EmailLogin.defaultProps = {
    re: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};