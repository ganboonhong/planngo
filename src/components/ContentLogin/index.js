import React, { Component } from 'react';
import PasswordLogin from '../PasswordLogin';
import TextCenter from '../TextCenter';
import EmailLogin from '../EmailLogin';
import RowCenter from '../RowCenter';
import { Grid, Button, FormGroup, Modal } from 'react-bootstrap';
import $ from 'jquery';

export default class ContentLogin extends Component {

  constructor(){
    super();
    this.state = {
        emailHelpText:    '',
        passwordHelpText: '',
        showModal: false,
        modalMsg: '',
        msgBsStyle: 'primary',
    };
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
            url: '/login',
            type: 'POST', 
            data: JSON.stringify(formData),
            dataType: 'json',
            contentType: 'application/json',
            crossDomain: true,
            xhrFields: {withCredentials: true},

        }).done((result) => {
            if(result) this.setState({
                showModal: true,
                modalMsg: result.msg,
                msgBsStyle: result.msgBsStyle
            })

            if(result.success){
                setTimeout(() => {
                    // window.location.href = "http://facebook.com"
                }, 3000);
            }
        });

    }

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
                    <EmailLogin ref='email' emailHelpText={`${this.state.emailHelpText}`}/>
                    <PasswordLogin ref='password'  passwordHelpText={`${this.state.emailHelpText}`}/>
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

ContentLogin.defaultProps = {
    validateFields :['email', 'password']
}