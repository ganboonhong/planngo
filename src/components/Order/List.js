import React, { Component } from 'react';
import Pagination from '../Pagination';
import $ from 'jquery';
import { Table } from 'react-bootstrap';
import Title from './Title';

export default class List extends Component {
    constructor() {
        super();

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
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.pageOfItems.map((item, key) =>
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.sequence}</td>
                            <td>{item.price}</td>
                            <td>{item.remarks}</td>
                          </tr>
                        )}
                    </tbody>
                </Table>

                <div className="text-center">
                    <Pagination items={this.state.orders} onChangePage={this.onChangePage} />
                </div>
            </div>
        );
    }
}
