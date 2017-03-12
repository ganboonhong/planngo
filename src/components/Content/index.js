import React, { Component } from 'react';
import './style.css';
import Password from '../Password';
import Username from '../Username';
import Email from '../Email';
import { Grid, Button, FormGroup } from 'react-bootstrap';

class Content extends Component {

  constructor(){
    super();
    this.state = {
        usernameHelpText: '',
        emailHelpText: '',
        passwordHelpText: '',
    };
  };

  handleSubmit(e) {
    e.preventDefault()
    var isValidData = true;

    for(var key = 0; key < Object.keys(this.props.validateFields).length; key++){
        var field = this.props.validateFields[key];
        if(!this.refs[field].checkValid()) {
            var obj = {};
            obj[field+'HelpText']= 'Please check this field.';
            this.setState(obj);
            isValidData = false;
            // break;
        }
    }

    console.log(isValidData)

  }

  render() {
    return (
        <Grid> 
            <form>
                <Username ref='username' usernameHelpText={`${this.state.usernameHelpText}`}/>
                <Email ref='email' emailHelpText={`${this.state.emailHelpText}`}/>
                <Password ref='password'  passwordHelpText={`${this.state.emailHelpText}`}/>

                <FormGroup>
                    <Button bsStyle="primary" type="submit" onClick={this.handleSubmit.bind(this)}>
                        Submit
                    </Button>
                </FormGroup>

            </form>
        </Grid>
    )
  }
}

Content.defaultProps = {
    validateFields :['username', 'email', 'password']
}

export default Content;