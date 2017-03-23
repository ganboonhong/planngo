import React, { Component } from 'react';
import { DateRange } from 'react-date-range';
import { Modal, Grid, Button, FormGroup, SplitButton, 
    Row, Col, MenuItem, FormControl } from 'react-bootstrap';
import TextCenter from '../../TextCenter';
import moment from 'moment'
import './style.css'

export default class Filter extends Component {

    constructor(){
        super();
        this.state = {
            // showModal: true,
            showModal: false,
            startDate: moment().add(-30, 'days'),
            endDate: moment(),
            filterLabel: 'Sequence',
            currentFilter: 'sequence',
            keyword: '',
        }


        this.handleSelectDate = this.handleSelectDate.bind(this);
    }

    pushFilterObject = () => {
        var filterObj = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            keyword: this.state.keyword,
            currentFilter: this.state.currentFilter
        }
        this.props.reloadOrderList(filterObj);
    }

    handleSelectDate(date){
        this.setState({
            startDate: moment(date.startDate._d),
            endDate: moment(date.endDate._d),
        })

        setTimeout(() => {
            this.pushFilterObject();
        }, 500);
        
    }

    close = () => {
      this.setState({ showModal: false });
    }
  
    open = () => {
      this.setState({ showModal: true });
    }

    handleFilterSelect = (eventKey, event) => {

        setTimeout(() => {
            this.setState({
                filterLabel: this.props.filterLabel[eventKey],
                currentFilter: eventKey
            })
            console.log(this.state.currentFilter)
        }, 500)
    }

    handleKeywordChange = (e) => {
        var keyword = e.target.value;

        setTimeout(() => {
            this.setState({
                keyword: keyword
            });
        }, 500);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            this.pushFilterObject();
        }, 1000);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Row>
                        <Col md={3} sm={5} xs={8} className="filter">
                            <Row>
                                <Col md={6} sm={6} xs={6}><Button onClick={this.open} bsStyle="info">{this.state.startDate.format("YYYY-MM-DD")}</Button></Col>
                                <Col md={6} sm={6} xs={6}><Button onClick={this.open} bsStyle="info">{this.state.endDate.format("YYYY-MM-DD")}</Button></Col>
                            </Row>
                        </Col>

                        <Col md={9} sm={12} xs={12} className="filter">
                            <Row>
                                <Col md={3} sm={5} xs={12}>
                                    <SplitButton title={this.state.filterLabel} onSelect={this.handleFilterSelect}
                                        id="filterButton"
                                    >
                                         <MenuItem eventKey="id">ID</MenuItem>
                                         <MenuItem eventKey="sequence">Sequence</MenuItem>
                                         <MenuItem eventKey="price">Price</MenuItem>
                                         <MenuItem eventKey="remarks">Remarks</MenuItem>
                                    </SplitButton>
                                </Col>

                                <Col md={7} sm={5} xs={12} className="filter">
                                    <FormControl
                                        ref="keyword"
                                        type="text"
                                        // value={this.state.sequence}
                                        placeholder={"Search "+this.state.filterLabel}
                                        onChange={this.handleKeywordChange}
                                        autoFocus={this.state.keywordAutoFocus}
                                      />
                                </Col>

                                <Col md={2} sm={2} xs={12} className="filter"><Button onClick={this.handleSubmit}>Search</Button></Col>
                            </Row>
                        </Col>                        
                    </Row>
                </FormGroup>

                <Modal show={this.state.showModal} onHide={this.close}>
                      <Modal.Header closeButton>
                            <Modal.Title>
                                <Grid>
                                      <TextCenter bsStyle="primary" >Date Range</TextCenter>
                                </Grid>
                            </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                            <DateRange
                                // onInit={this.handleSelectDate}
                                onChange={this.handleSelectDate}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                            />
                      </Modal.Body>
                      <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                      </Modal.Footer>
                </Modal>

            </form>
        );
    }
}

Filter.propTypes = {
    reloadOrderList: React.PropTypes.func
}

Filter.defaultProps = {
    filterLabel: {
        id: 'ID',
        sequence: 'Sequence',
        price: 'Price',
        remarks: 'Remarks',
    }
}