import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.css';
import Content from '../Content';
import Footer from '../Footer';
import { Label, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
const tooltip = (
  <Tooltip id="tooltip"><strong>Log In</strong></Tooltip>
);

class Join extends Component {
  render () {
    return (
      <div>
        <h1 style={{'textAlign': 'center'}}>
            <Label bsStyle="primary">Join Us</Label>
            <Link to="/login">
                <OverlayTrigger placement="right" overlay={tooltip}>
                      <Glyphicon 
                      glyph="log-in" 
                      style={{"marginLeft" : '30px'}}
                      onClick={this.logout}
                      />
                </OverlayTrigger>
            </Link>
        </h1>
        <Content />
        <Footer />
      </div>
    );
  }
}

export default Join;
