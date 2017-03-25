import React, { Component } from 'react';
import { Col, Row, Label, FormGroup, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
const tooltip = (
  <Tooltip id="tooltip"><strong>Logout</strong></Tooltip>
);

export default class TitleList extends Component {

    logout = () => {
        window.location.href = './logout';
    }

    render() {
        return (
            <FormGroup>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <h1 style={{'marginLeft': '20px'}}>
                            <Label bsStyle="primary">
                                {this.props.title}
                            </Label>
                        </h1>
                    </Col>
                    <Col md={4}>
                        <h4 style={{'marginLeft': '20px'}}>
                            <span style={{'marginRight': '5px'}}>USER:</span>
                            <Label bsStyle="warning">
                                {this.props.user}
                            </Label>

                            <OverlayTrigger placement="bottom" overlay={tooltip}>
                              <Glyphicon 
                              glyph="log-out" 
                              style={{"marginLeft" : '10px'}}
                              onClick={this.logout}
                              />
                            </OverlayTrigger>
                        </h4>
                    </Col>
                </Row>
            </FormGroup>
        );
    }
}