import React, { Component } from 'react';
import { Col, Row, Label, FormGroup } from 'react-bootstrap';

export default class Title extends Component {
    render() {
        return (
            <FormGroup>
                <Row>
                    <Col md={3}>
                        <h1>
                            <Label bsStyle="primary">
                                {this.props.title}
                            </Label>
                        </h1>
                    </Col>
                    <Col md={9}></Col>
                </Row>
            </FormGroup>
        );
    }
}