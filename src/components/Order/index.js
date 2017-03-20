import React, { Component } from 'react';
import Add from './Add';
import List from './List';
import Footer from '../Footer';
import { Col, Row, Grid } from 'react-bootstrap';

export default class Order extends Component {

  // constructor(){
  //   super();
  // }

  reloadOrderList = () => {
    console.log('reloadOrderList')
    this.refs['list'].reloadOrderList();
  }


  render () {
    return (
        <div>
            <Grid>
                <Row>
                    <Col md={4} sm={4}>
                        <Add ref="add" reloadOrderList={this.reloadOrderList}/>
                    </Col>
                    <Col md={8} sm={8}><List ref="list" /></Col>
                </Row>
            </Grid>
            <Footer />
        </div>
    );
  }
}
