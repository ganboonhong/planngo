import React, { Component } from 'react';
import ContentLogin from '../ContentLogin';
import Footer from '../Footer';
import { Label, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
const tooltip = (
  <Tooltip id="tooltip"><strong>Create New Account</strong></Tooltip>
);

export default class Login extends Component {
  render () {
    return (
      <div>
        <h1 style={{'textAlign': 'center'}}>
            <Label bsStyle="primary">Sign In</Label>
            <a href="/join">
                <OverlayTrigger placement="right" overlay={tooltip}>
                      <Glyphicon 
                      glyph="plus" 
                      style={{"marginLeft" : '30px'}}
                      onClick={this.logout}
                      />
                </OverlayTrigger>
            </a>
        </h1>
        <ContentLogin />
        <Footer />
      </div>
    );
  }
}
