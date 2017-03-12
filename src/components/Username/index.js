import React, { Component } from 'react';
import { FormGroup, FormControl,ControlLabel, HelpBlock } from 'react-bootstrap';
import RowCenter from '../RowCenter';

class Username extends Component {

    constructor(props) {
      super(props);
      this.state = {
          username: '',
          validUsername: false
      }
    };
    
    checkValid = () => {
        return this.state.validUsername;
    };
  
    getValidationState = () => {
      const length = this.state.username.length;
      if (length > 2) return 'success';
      else if (length > 0) return 'error';
    };
  
    handleChange = (e) => {
        var username = e.target.value;
        this.setState({
            username: username,
            validUsername: username.length > 2
        });
    };

    render() {
        return (
                <RowCenter>
                    <FormGroup
                      controlId="formBasicText"
                      validationState={this.getValidationState()}
                    > 
                        <ControlLabel>Username*</ControlLabel>
                          <FormControl
                            type="text"
                            required={true}
                            value={this.state.username}
                            placeholder="Your Username"
                            onChange={this.handleChange}
                          />
                          <HelpBlock>{`${this.props.usernameHelpText}`}</HelpBlock>
                          <FormControl.Feedback />
                    </FormGroup>
                </RowCenter>
        );
    }
}

Username.propTypes = {
  checkValid: React.PropTypes.func,
};

export default Username;