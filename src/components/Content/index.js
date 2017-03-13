import React, { Component } from 'react';
import './style.css';
import Password from '../Password';
import Username from '../Username';
import Email from '../Email';
import RowCenter from '../RowCenter';
import { Grid, Button, FormGroup, ProgressBar } from 'react-bootstrap';

class Content extends Component {

  constructor(){
    super();
    this.state = {
        usernameHelpText: '',
        emailHelpText:    '',
        passwordHelpText: '',
        progress: 0,
    };
    this.checkProgress = this.checkProgress.bind(this)
  };

  handleSubmit(e) {
    e.preventDefault()
    var isValidData = true;

    for(var key = 0; key < Object.keys(this.props.validateFields).length; key++){
        var field = this.props.validateFields[key];
        var obj = {};

        if(!this.refs[field].checkValid().result) {
            
            obj[field+'HelpText']= 'Please check this field.';
            
            isValidData = false;
        }else{
            obj[field+'HelpText']= '';
        }
        this.setState(obj);
    }

    console.log(isValidData)

  }

  checkProgress = () => {
        var progress = 0;

        for(var key = 0; key < Object.keys(this.props.validateFields).length; key++){
            var field = this.props.validateFields[key];
            var r = this.refs[field].checkValid();
            if(r.score) progress += r.score;
        }
        this.setState({progress: (progress/4 * 100)});
  }

  render() {
    return (
        <Grid> 
            <form>
                <Username checkFunc={this.checkProgress} ref='username' usernameHelpText={`${this.state.usernameHelpText}`}/>
                <Email checkFunc={this.checkProgress}ref='email' emailHelpText={`${this.state.emailHelpText}`}/>
                <Password checkFunc={this.checkProgress} ref='password'  passwordHelpText={`${this.state.emailHelpText}`}/>

                <RowCenter>
                    <ProgressBar bsStyle="info" now={this.state.progress} />
                </RowCenter>

                <RowCenter>
                    <FormGroup>
                        <Button bsStyle="primary" type="submit" onClick={this.handleSubmit.bind(this)}>
                            Submit
                        </Button>
                    </FormGroup>
                </RowCenter>

            </form>
        </Grid>
    )
  }
}

Content.defaultProps = {
    validateFields :['username', 'email', 'password']
}

export default Content;