import React, { Component } from 'react';
import Add from './Add';
import List from './List';
import Footer from '../Footer';
import { Col, Row, Grid } from 'react-bootstrap';

export default class Order extends Component {

  constructor(){
    super();
    this.state = {
        objToEdit: {},
    }
  }

  reloadOrderList = () => {
    this.refs['list'].reloadOrderList();
  }

  getObjFromList = (objToEdit) => {
    this.setState({objToEdit: objToEdit});
    this.refs['add'].populateData(objToEdit)
  }


  render () {
    return (
        <div>
            <Grid>
                <Row>
                    <Col md={3} sm={3}>
                        <Add 
                            ref="add" 
                            reloadOrderList={this.reloadOrderList}
                            idToEdit={this.state.idToEdit}
                        />
                    </Col>
                    <Col md={9} sm={9}>
                        <List 
                            ref="list" 
                            getObjFromList={this.getObjFromList} 
                        />
                    </Col>
                </Row>
            </Grid>
            <Footer />
        </div>
    );
  }
}
