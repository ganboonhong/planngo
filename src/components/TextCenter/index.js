import React, { Component } from 'react';
import { Col, Row, Label, FormGroup } from 'react-bootstrap';

class TextCenter extends Component {
    render() {
        return (
            <FormGroup>
                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <h1>
                        <Label bsStyle={this.props.bsStyle}>
                            { this.props.children}
                        </Label>
                        </h1>
                    </Col>
                    <Col md={3}></Col>
                </Row>
            </FormGroup>
        );
    }
}

export default TextCenter;