import React, { Component } from 'react';
import './style.css';
import Password from '../Password';
import Username from '../Username';
import Email from '../Email';
import ButtonSubmit from '../ButtonSubmit';
import { Grid, Button } from 'react-bootstrap';

class Content extends Component {

  constructor(){
    super();
    this.state = {

    };
  };

  handleSubmit(e) {
    e.preventDefault()
    var isValidData = true;

    for(var key in this.props.validateFields){
        var field = this.props.validateFields[key];
        if(!this.refs[field].checkValid()) {
            isValidData = false;
            break;
        }
    }

    console.log(isValidData)

  }

  render() {
    return (
        <Grid> 
            <form>
                <Username ref='username'/>
                <Email ref='email'/>
                <Password ref='password'/>
                <Button onClick={this.handleSubmit.bind(this)} />
            </form>
        </Grid>
    )
  }
}

Content.defaultProps = {
    validateFields:{
        username: 'username',
        email:    'email',
        password: 'password',
    }
}

export default Content;