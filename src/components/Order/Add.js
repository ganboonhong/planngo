import React, { Component } from 'react';
import Title from './Title';
import Sequence from './Sequence';
import Price from './Price';
import Remarks from './Remarks';
import {Button, FormGroup} from 'react-bootstrap';
import $ from 'jquery';

export default class Add extends Component {
    constructor(){
        super();
        this.state = {
            sequenceHelpText: '',
            priceHelpText: '',
            remarksHelpText: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var isValidData = true;
        var dataTmp     = {};

        for(var key = 0; key < Object.keys(this.props.validateFields).length; key++){
            var field = this.props.validateFields[key];
            var obj   = {};

            if(!this.refs[field].checkValid().result) {
                obj[field+'HelpText'] = 'Please check this field.';
                isValidData           = false;
            }else{
                dataTmp[field] = this.refs[field].checkValid().value;
                obj[field+'HelpText']= '';
                this.refs[field].clearState();
            }
            this.setState(obj);
        }

        if(isValidData) {
            var formData = {
                sequence: dataTmp.sequence,
                price: dataTmp.price,
                remarks: dataTmp.remarks,
            };

            $.ajax({
                url: 'http://localhost:9000/order',
                type: 'POST', 
                data: JSON.stringify(formData),
                dataType: 'json',
                contentType: 'application/json',
                crossDomain: true,

            }).done((result) => {
                // console.log(result)
                this._reloadOrderList();
            });

        }
    }

    _reloadOrderList(){
        this.props.reloadOrderList();
    }    

    render() {
        return (
            <form>
                <Title title="Registration"/>
                <Sequence ref="sequence" sequenceHelpText={this.state.sequenceHelpText} />
                <Price ref="price" priceHelpText={this.state.priceHelpText} />
                <Remarks ref="remarks" remarksHelpText={this.state.remarksHelpText} />
                <FormGroup>
                    <Button bsStyle="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
                </FormGroup>
            </form>
        );
    }
}

Add.defaultProps = {
    validateFields: ['sequence', 'price', 'remarks']
}

Add.propTypes = {
    reloadOrderList: React.PropTypes.func
}