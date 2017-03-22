import React, { Component } from 'react';
import { DateRange } from 'react-date-range';
import { Modal, Grid, Button, FormGroup } from 'react-bootstrap';
import TextCenter from '../../TextCenter';
import moment from 'moment'

export default class Filter extends Component {

    constructor(){
        super();
        this.state = {
            showModal: true,
            // showModal: false,
            startDate: moment().add(-30, 'days'),
            endDate: moment(),
        }

        this.handleSelectDate = this.handleSelectDate.bind(this);
    }

    pushFilterObject = () => {
        var filterObj = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
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

    render() {
        return (
            <div>
                <FormGroup>
                    <Button onClick={this.open} bsStyle="info">Date</Button>
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

            </div>
        );
    }
}

Filter.propTypes = {
    reloadOrderList: React.PropTypes.func
}