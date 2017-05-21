import React, { Component } from 'react';
import Pagination from '../../Pagination/';
import TextCenter from '../../TextCenter';
import $ from 'jquery';
import moment from 'moment'
import { Table, Button, Glyphicon, Modal, Grid, OverlayTrigger, Tooltip } from 'react-bootstrap';
import TitleList from '../TitleList';
import Filter from '../Filter';
import './index.scss';
import foo from 'window-or-global';

const Global = require('../../Global'),
production   = Global.production,
domain       = (production) ? '' : Global.localDomain,
ajaxLoaderGiF = Global.ajaxLoaderGiF;

let currentUrl = foo.location.href.replace('https', 'http');
const lastSlashIndex = currentUrl.lastIndexOf('/');
// const domain = (production) ? currentUrl.slice(0, lastSlashIndex) + ':9000' : Global.localDomain;

let FilterObj;

export default class List extends Component {
    constructor() {
        super();

        const orders = [{"id":0,"sequence":"Loading","price":'Loading',"remarks":"Loading","updatedAt":"2017-04-19T07:49:36.000Z"}];
        this.state = {
            orders: orders,
            pageOfItems: [],
            showModal: false,
            idToDelete: '',
            idToEdit: '',
            user: '',
            isInitializing: true
        };
 
        // bind function in constructor instead of render
        this.onChangePage = this.onChangePage.bind(this);
    }
 
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    toolTip = (str) => {
        return  <Tooltip id="tooltip"><strong>{str}</strong></Tooltip>;
    }

    getOrders = (filterObj = null) => {
        FilterObj = filterObj;
        const orders = (() => {
            let tmp = null;

            if(FilterObj){
                FilterObj = {
                    startDate: moment(FilterObj.startDate._d).format("YYYY-MM-DD"),
                    endDate: moment(FilterObj.endDate._d).add(1, 'days').format("YYYY-MM-DD"),
                    keyword: FilterObj.keyword,
                    currentFilter: FilterObj.currentFilter,
                }
            }

            $.ajax({
                async: true,
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

                    let currentPage  = parseInt($(".pagination").find(".active").find("a").text(), 10);
                    
                    this.setState({
                        orders: result.list, 
                        pageOfItems: this.state.pageOfItems,
                        user: result.user,
                        isInitializing: false
                    });

                    this.refs['pagination'].setPage(currentPage, true);
                    this.refs['filter'].toggleSearching(false);

                }, 500)
                tmp = result.list;
            });
            
            return tmp;
        })();

        return orders;
    }

    componentDidMount = () => {
        this.reloadOrderList()
    }

    reloadOrderList = (filterObj = null) => {
        this.getOrders(filterObj);
    }

    confirmDelete = (id) => {
        this.setState({
            idToDelete: id,
            showModal: true
        });
    }

    downloadReceipt = (id) => {
        window.open(domain + '/receipt/' + id,)
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
        return (
            <div>
                <TitleList title="Order List" user={this.state.user}/>
                <Filter ref="filter" reloadOrderList={this.reloadOrderList}/>
                <Table striped bordered condensed hover>
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Sequence No.</th>
                        <th className="text-center">Price</th>
                        <th className="remarks text-center">Remarks</th>
                        <th className="lastUpdate text-center">Last Update</th>
                        <th className="actions text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.pageOfItems.map((item, key) =>
                          <tr key={key + 1}>
                            <td className="tdContent">
                                {
                                    this.state.isInitializing 
                                    ? <img src={ajaxLoaderGiF} alt="loading"/>
                                    : key + 1
                                }
                            </td>
                            <td className="tdContent">
                                {
                                    this.state.isInitializing 
                                    ? <img src={ajaxLoaderGiF} alt="loading"/>
                                    : item.sequence
                                }
                            </td>
                            <td className="tdContent">
                                {
                                    this.state.isInitializing 
                                    ? <img src={ajaxLoaderGiF} alt="loading"/>
                                    : item.price
                                }
                            </td>
                            <td className="remarks tdContent">
                                {
                                    this.state.isInitializing 
                                    ? <img src={ajaxLoaderGiF} alt="loading"/>
                                    : item.remarks
                                }
                            </td>
                            <td className="lastUpdate tdContent">
                                {
                                    this.state.isInitializing 
                                    ? <img src={ajaxLoaderGiF} alt="loading"/>
                                    : (() => { 
                                          return moment(item.updatedAt).format("YYYY/MM/DD HH:mm");  // inline function
                                    })()
                                }
                            </td>
                            <td className="actions tdContent">
                                <OverlayTrigger placement="top" overlay={this.toolTip('Edit')}>
                                    <Button 
                                        bsSize="xsmall" 
                                        bsStyle="success" 
                                        onClick={() => this.startEdit(item)}
                                        className="actionBtn"
                                    >
                                        <Glyphicon glyph="pencil" />
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={this.toolTip('Delete')}>
                                    <Button 
                                        bsSize="xsmall" 
                                        bsStyle="danger" 
                                        onClick={() => this.confirmDelete(item._id)}
                                        className="actionBtn"
                                    >
                                        <Glyphicon glyph="trash" />
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={this.toolTip('Download Receipt')}>
                                    <Button 
                                        bsSize="xsmall" 
                                        bsStyle="info" 
                                        onClick={() => this.downloadReceipt(item._id)}
                                        className="actionBtn"
                                    >
                                        <Glyphicon glyph="download-alt" />
                                    </Button>
                                </OverlayTrigger>
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