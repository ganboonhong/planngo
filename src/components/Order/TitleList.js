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
                    <Col md={10} sm={10} xs={10}>
                        <h3 style={{'textAlign': 'center', 'marginLeft': '25%'}}>
                            <Label bsStyle="primary">
                                {this.props.title}
                            </Label>
                        </h3>
                    </Col>
                    <Col md={2} sm={2} xs={2}>
                        <h3 style={{'textAlign': 'right'}}>
                            <OverlayTrigger placement="left" overlay={this.toolTip("Log out " + this.props.user)}>
                              <Glyphicon 
                              glyph="log-out" 
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