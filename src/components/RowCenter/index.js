import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

class RowCenter extends Component {
    render() {
        return (
            <Row>
                <Col md={3}></Col>
                <Col md={6}>{ this.props.children}</Col>
                <Col md={3}></Col>
            </Row>
        );
    }
}

export default RowCenter;