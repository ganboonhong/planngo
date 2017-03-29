import React, { Component } from 'react';
import Title from './Title';
import Sequence from './Sequence';
import Price from './Price';
import Remarks from './Remarks';
import { Button, FormGroup, ControlLabel, OverlayTrigger, Glyphicon, Tooltip } from 'react-bootstrap';
import $ from 'jquery';
import Toggle from 'react-bootstrap-toggle';

const tooltip = (
  <Tooltip id="tooltip"><strong>Tutorial</strong></Tooltip>
);

var Global     = require('../Global');
var production = Global.production;
var domain     = (production) ? '' : Global.localDomain;

export default class Add extends Component {
    constructor(){
        super();
        this.state = {
            sequenceHelpText: '',
            priceHelpText: '',
            remarksHelpText: '',
            idToEdit: '',
            scannerMode: false,
        }
        this.onToggle = this.onToggle.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var result = this._validateData();

        if(result.isValidData) {
            var formData = {
                sequence: result.dataTmp.sequence,
                price: result.dataTmp.price,
                remarks: result.dataTmp.remarks,
                id: this.state.idToEdit,
            };

            $.ajax({
                url: domain + '/order',
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

    onToggle = () => {
        this.setState({ scannerMode: !this.state.scannerMode });
        this._resetAllInput();
        this.refs.sequence._focus();
        this.props.getValueFromChild({scannerMode: this.state.scannerMode})
    }

    focusOnPriceField = () => {
        this.refs.price._focus();
    }

    focusOnSequenceField = () => {
        this.refs.sequence._focus();   
    }

    goToTutorial = () => {
        window.open('https://www.youtube.com/watch?v=X6q-tYV0G-Y&feature=em-upload_owner', '_blank');
    }

    render() {
        return (
            <form>
                <Title title="Registration"/>
                <FormGroup>
                    <OverlayTrigger placement="top" overlay={tooltip}>
                              <Glyphicon 
                              glyph="info-sign" 
                              style={{"marginRight" : '10px'}}
                              onClick={this.goToTutorial}
                              />
                            </OverlayTrigger>
                    <ControlLabel style={{'marginRight': '10px'}}>Scanner Mode</ControlLabel>
                    <Toggle
                      onClick={this.onToggle}
                      on="ON"
                      off="OFF"
                      size="md"
                      offstyle="default"
                      onstyle="info"
                      active={this.state.scannerMode}
                    />
                </FormGroup>
                <Sequence ref="sequence" sequenceHelpText={this.state.sequenceHelpText} scannerMode={this.state.scannerMode} 
                focusOnPriceField={this.focusOnPriceField}/>
                <Price ref="price" priceHelpText={this.state.priceHelpText} scannerMode={this.state.scannerMode}
                focusOnSequenceField={this.focusOnSequenceField}/>
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
    reloadOrderList: React.PropTypes.func,
    getValueFromChild: React.PropTypes.func,
}