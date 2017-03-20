import React, { Component } from 'react';
import Pagination from '../Pagination';
import TextCenter from '../TextCenter';
import $ from 'jquery';
import { Table, Button, Glyphicon, Modal, Grid } from 'react-bootstrap';
import Title from './Title';

export default class List extends Component {
    constructor() {
        super();

        var orders = this.getOrders();

        this.state = {
            orders: orders,
            pageOfItems: [],
            showModal: false,
            idToDelete: '',
        };
 
        // bind function in constructor instead of render
        this.onChangePage = this.onChangePage.bind(this);
    }
 
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    getOrders = () => {
        var orders = (() => {
            var tmp = null;

            $.ajax({
                async: false,
                url: 'http://localhost:9000/orders',
                type: 'GET',
                dataType: 'json',
            }).done((result) => {
                tmp = result;
            });
            
            return tmp;
        })();

        return orders;
    }

    reloadOrderList = () => {
        var orders      = this.getOrders();
        var currentPage = parseInt($(".pagination").find(".active").find("a").text(), 10);
        this.setState({orders: orders, pageOfItems: this.state.pageOfItems});
        this.refs['pagination'].setPage(currentPage);
    }

    confirmDelete = (id) => {
        this.setState({
                idToDelete: id,
                showModal: true
            });
    }

    handleDelete = () => {
        var obj = {id: this.state.idToDelete};

        $.ajax({
            url: 'http://localhost:9000/order',
            type: 'DELETE',
            dataType: 'json',
            data: obj
        }).done((result) => {
            this.close();
            this.reloadOrderList();
        });
    }

    close = () => {
      this.setState({ showModal: false });
    }
  
    open = () => {
      this.setState({ showModal: true });
    }
 
    render() {
        return (
            <div>
                <Title title="Order List" />
                <Table striped bordered condensed hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Sequence</th>
                        <th>Price</th>
                        <th>Remarks</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.pageOfItems.map((item, key) =>
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.sequence}</td>
                            <td>{item.price}</td>
                            <td>{item.remarks}</td>
                            <td style={{"width": "10px"}}>
                                <Button 
                                    bsSize="xsmall" 
                                    bsStyle="danger" 
                                    onClick={() => this.confirmDelete(item.id)}
                                >
                                    <Glyphicon glyph="trash" />
                                </Button>
                            </td>
                          </tr>
                        )}
                    </tbody>
                </Table>

                <div className="text-center">
                    <Pagination ref="pagination" items={this.state.orders} onChangePage={this.onChangePage} />
                </div>

                <Modal show={this.state.showModal} onHide={this.close}>
                      <Modal.Header closeButton>
                            <Modal.Title>
                                <Grid>
                                      <TextCenter bsStyle="danger" >Message</TextCenter>
                                </Grid>
                            </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                            <h4>Confirm Delete?</h4>
                      </Modal.Body>
                      <Modal.Footer>
                            <Button onClick={this.handleDelete}>Delete</Button>
                            <Button onClick={this.close}>Cancel</Button>
                      </Modal.Footer>
                </Modal>
            </div>
        );
    }
}