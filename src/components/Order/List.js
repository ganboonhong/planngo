import React, { Component } from 'react';
import Pagination from '../Pagination';
import TextCenter from '../TextCenter';
import $ from 'jquery';
import moment from 'moment-timezone'
import { Table, Button, Glyphicon, Modal, Grid } from 'react-bootstrap';
import TitleList from './TitleList';
import Filter from './Filter';

const Global = require('../Global'),
production   = Global.production,
tz           = Global.tz,
domain       = (production) ? '' : Global.localDomain;

let FilterObj;

export default class List extends Component {
    constructor() {
        super();

        this.state = {
            orders: this.getOrders(),
            pageOfItems: [],
            showModal: false,
            idToDelete: '',
            idToEdit: '',
            user: ''
        };
 
        // bind function in constructor instead of render
        this.onChangePage = this.onChangePage.bind(this);
    }
 
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    getOrders = (filterObj = null) => {
        FilterObj = filterObj;
        const orders = (() => {
            let tmp = null;

            if(FilterObj){
                FilterObj = {
                    startDate: moment.tz(FilterObj.startDate._d, tz).add(1, 'hours').format("YYYY-MM-DD HH:MM"),
                    endDate: moment.tz(FilterObj.endDate._d, tz).add(1, 'hours').format("YYYY-MM-DD HH:MM"),
                    keyword: FilterObj.keyword,
                    currentFilter: FilterObj.currentFilter,
                }
            }

            $.ajax({
                async: false,
                url: domain + '/orders',
                type: 'GET',
                dataType: 'json',
                data: FilterObj
            }).done((result) => {
                if (result.message) {
                    window.location.href = './login';
                    return;
                }
                setTimeout(() => {
                    this.setState({'user': result.user})
                }, 500)
                tmp = result.list;
            });
            
            return tmp;
        })();

        return orders;
    }

    reloadOrderList = (filterObj = null) => {

        const orders = this.getOrders(filterObj),
        currentPage  = parseInt($(".pagination").find(".active").find("a").text(), 10);
        
        this.setState({orders: orders, pageOfItems: this.state.pageOfItems});
        this.refs['pagination'].setPage(currentPage);
        this.refs['filter'].toggleSearching(false);
    }

    confirmDelete = (id) => {
        this.setState({
            idToDelete: id,
            showModal: true
        });
    }

    handleDelete = () => {
        const obj = {id: this.state.idToDelete};

        $.ajax({
            url: domain + '/order',
            type: 'DELETE',
            dataType: 'json',
            data: obj
        }).done((result) => {
            this.close();
            this.reloadOrderList();
        });

        this.props.resetAllInput();
    }

    startEdit = (orderObj) => {
        this.props.getObjFromList(orderObj);
    }

    close = () => {
      this.setState({ showModal: false });
    }
  
    open = () => {
      this.setState({ showModal: true });
    }
 
    render() {
        const buttonStyle = {margin: "2px"};
        return (
            <div>
                <TitleList title="Order List" user={this.state.user}/>
                <Filter ref="filter" reloadOrderList={this.reloadOrderList}/>
                <Table striped bordered condensed hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Sequence No.</th>
                        <th>Price</th>
                        <th>Remarks</th>
                        <th>Last Update</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.pageOfItems.map((item, key) =>
                          <tr key={item.id}>
                            <td style={{"width": "30px"}}>{item.id}</td>
                            <td style={{"width": "180px"}}>{item.sequence}</td>
                            <td style={{"width": "100px"}}>{item.price}</td>
                            <td>{item.remarks}</td>
                            <td style={{"width": "160px"}}>{
                                (() => { 
                                      return moment(item.updatedAt).format("YYYY/MM/DD HH:mm");  // inline function
                                })()
                            }
                            </td>
                            <td style={{"width": "70px"}}>
                                <Button 
                                    bsSize="xsmall" 
                                    bsStyle="success" 
                                    onClick={() => this.startEdit(item)}
                                    style={buttonStyle}
                                >
                                    <Glyphicon glyph="pencil" />
                                </Button>
                                <Button 
                                    bsSize="xsmall" 
                                    bsStyle="danger" 
                                    onClick={() => this.confirmDelete(item.id)}
                                    style={buttonStyle}
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

List.propTypes = {
    resetAllInput: React.PropTypes.func
}