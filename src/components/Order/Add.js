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
            idToEdit: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var result = this._validateData();

        if(result.isValidData) {
            var formData = {
                sequence: result.dataTmp.sequence,
                price: result.dataTmp.price,
                remarks: result.dataTmp.remarks,
            };

            $.ajax({
                url: 'http://localhost:9000/order',
                type: 'POST', 
                data: JSON.stringify(formData),
                dataType: 'json',
                contentType: 'application/json',
                crossDomain: true,
            }).done((result) => {
                this._resetAllInput();
                this._reloadOrderList();
            });
        }
    }

    _validateData = () => {
        var result = {};
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
            }
            this.setState(obj);
        }

        result.isValidData = isValidData;
        result.dataTmp     = dataTmp;

        return result;
    }

    _resetAllInput = () => {
        for(var key = 0; key < Object.keys(this.props.validateFields).length; key++){
            var field = this.props.validateFields[key];
            this.refs[field].clearState();
        }
        this.setState({idToEdit: ''});
    }

    _reloadOrderList = () => {
        this.props.reloadOrderList();
    }

    populateData = (objToEdit) => {
        for(var key = 0; key < Object.keys(this.props.validateFields).length; key++){
            var field = this.props.validateFields[key];
            this.refs[field].populateData(objToEdit);
        }

        this.setState({idToEdit: objToEdit.id});
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
                <input type="hidden" name="id" value={this.state.idToEdit}/>
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