import React, { Component } from 'react';
import './style.css';
import Password from '../Password';
import Username from '../Username';
import TextCenter from '../TextCenter';
import Email from '../Email';
import RowCenter from '../RowCenter';
import { Grid, Button, FormGroup, ProgressBar, Modal } from 'react-bootstrap';
import $ from 'jquery';

export default class Content extends Component {

  constructor(){
    super();
    this.state = {
        usernameHelpText: '',
        emailHelpText:    '',
        passwordHelpText: '',
        progress: 0,
        showModal: false,
        modalMsg: '',
        msgBsStyle: 'primary',
    };
    this.checkProgress = this.checkProgress.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  };

  handleSubmit(e) {
    e.preventDefault()
    var isValidData = true;
    var dataTmp = {};

    for(var key = 0; key < Object.keys(this.props.validateFields).length; key++){
        var field = this.props.validateFields[key];
        var obj = {};

        if(!this.refs[field].checkValid().result) {
            obj[field+'HelpText'] = 'Please check this field.';
            isValidData           = false;
        }else{
            dataTmp[field] = this.refs[field].checkValid().value;
            obj[field+'HelpText']= '';
        }
        this.setState(obj);
    }

    if(isValidData) {

        var formData = {
            name: dataTmp.username,
            email: dataTmp.email,
            password: dataTmp.password,
        };

        $.ajax({
            url: 'http://localhost:9000/join',
            type: 'POST', 
            data: JSON.stringify(formData),
            dataType: 'json',
            contentType: 'application/json',
            crossDomain: true,

        }).done((result) => {
            if(result) this.setState({
                showModal: true,
                modalMsg: result.msg,
                msgBsStyle: result.msgBsStyle
            })

            if(result.success){
                setTimeout(() => {
                    window.location.href = "http://localhost:3000/order"
                }, 3000);
            }
        });

    }

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

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  render() {
    return (

            <Grid> 

                <form>
                    <Username checkFunc={this.checkProgress} ref='username' usernameHelpText={`${this.state.usernameHelpText}`}/>
                    <Email checkFunc={this.checkProgress} ref='email' emailHelpText={`${this.state.emailHelpText}`}/>
                    <Password checkFunc={this.checkProgress} ref='password'  passwordHelpText={`${this.state.emailHelpText}`}/>
                    <RowCenter>
                        <ProgressBar bsStyle="info" now={this.state.progress} />
                    </RowCenter>
                    <RowCenter>
                        <FormGroup>
                            <Button id='for' bsStyle="primary" type="submit" onClick={this.handleSubmit.bind(this)}>
                                Submit
                            </Button>
                        </FormGroup>
                    </RowCenter>
                </form>

                <Modal show={this.state.showModal} onHide={this.close}>
                      <Modal.Header closeButton>
                            <Modal.Title>
                                <Grid>
                                      <TextCenter bsStyle={this.state.msgBsStyle} >Message</TextCenter>
                                </Grid>
                            </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                            <h4>{this.state.modalMsg}</h4>
                      </Modal.Body>
                      <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                      </Modal.Footer>
                </Modal>

            </Grid>
    )
  }
}

Content.defaultProps = {
    validateFields :['username', 'email', 'password']
}