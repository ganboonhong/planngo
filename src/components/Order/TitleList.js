import React, { Component } from 'react';
import { Col, Row, Label, FormGroup, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class TitleList extends Component {

    logout = () => {
        window.location.href = './logout';
    }

    toolTip = (str) => {
        return  <Tooltip id="tooltip"><strong>{str}</strong></Tooltip>;
    }

    render() {
        return (
            <FormGroup>
                <Row>
                    <Col md={3} sm={3} xs={3}></Col>
                    <Col md={6} sm={6} xs={6}>
                        <h3 style={{'textAlign': 'center'}}>
                            <Label bsStyle="primary">
                                {this.props.title}
                            </Label>
                        </h3>
                    </Col>
                    <Col md={3} sm={3} xs={3}>
                        <h3 style={{'textAlign': 'right'}}>
                            <OverlayTrigger placement="bottom" overlay={this.toolTip(this.props.user)}>
                              <Glyphicon 
                              glyph="user" 
                              style={{"marginLeft" : '10px'}}
                              />
                            </OverlayTrigger>

                            <OverlayTrigger placement="bottom" overlay={this.toolTip("Log out")}>
                              <Glyphicon 
                              glyph="log-out" 
                              style={{"marginLeft" : '10px'}}
                              onClick={this.logout}
                              />
                            </OverlayTrigger>
                        </h3>
                    </Col>
                </Row>
            </FormGroup>
        );
    }
}