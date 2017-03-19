import React, { Component } from 'react';
import Pagination from '../Pagination';
import $ from 'jquery';
import { Table, Button, Glyphicon } from 'react-bootstrap';
import Title from './Title';

export default class List extends Component {
    constructor() {
        super();

        var orders = this.getOrders();

        this.state = {
            orders: orders,
            pageOfItems: []
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
                url: 'http://localhost:9000/order',
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
        var currentPage = parseInt($(".pagination").find(".active").find("a").text())
        this.setState({orders: orders, pageOfItems: this.state.pageOfItems});
        this.refs['pagination'].setPage(currentPage);
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
                                <Button bsSize="xsmall" bsStyle="danger">
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
            </div>
        );
    }
}
