import React, { Component } from 'react';
import Add from './Add';
import Footer from '../Footer';
import { Col, Row, Grid } from 'react-bootstrap';

export default class Register extends Component {
  render () {
    return (
        <div>
            <Grid>
                <Row>
                    <Col md={4} sm={4}><Add /></Col>
                    <Col md={8} sm={8}><Add /></Col>
                </Row>
            </Grid>
            <Footer />
        </div>
    );
  }
}
