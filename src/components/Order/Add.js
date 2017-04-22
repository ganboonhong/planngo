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
),
Global     = require('../Global'),
production = Global.production,
domain     = (production) ? '' : Global.localDomain;

export default class Add extends Component {
    constructor(){
        super();
        this.state = {
            idToEdit: '',
            scannerMode: false,
        }
        this.onToggle = this.onToggle.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const result = this._validateData();

        if(result.isValidData) {
            const formData = {
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
            }).then((result) => {
                this._resetAllInput();
                this._reloadOrderList();
            }).catch((error) => {
                console.error('Error on adding new record: ' + error);
            });
        }
    }

    _validateData = () => {
        let result  = {},
        isValidData = true,
        dataTmp     = {};

        $.map(this.props.validateFields, (fieldName, idx) => {
            const result = this.refs[fieldName].checkValid().result;
            if(!result) {  
                isValidData = false;
            }else{
                dataTmp[fieldName] = this.refs[fieldName].checkValid().value;
            }
            this.refs[fieldName].showHint(!result);
        })

        result.isValidData = isValidData;
        result.dataTmp     = dataTmp;

        return result;
    }

    _resetAllInput = () => {
        $.map(this.props.validateFields, (fieldName, idx) => {
            this.refs[fieldName].clearState();
        });

        this.setState({idToEdit: ''});
    }

    _reloadOrderList = () => {
        this.props.reloadOrderList();
    }

    populateData = (objToEdit) => {
        $.map(this.props.validateFields, (fieldName, idx) => {
            this.refs[fieldName].populateData(objToEdit);
        });

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
                <Sequence 
                    ref="sequence"  
                    scannerMode={this.state.scannerMode} 
                    focusOnPriceField={this.focusOnPriceField}
                />
                <Price 
                    ref="price" 
                    scannerMode={this.state.scannerMode}
                    focusOnSequenceField={this.focusOnSequenceField}
                />
                <Remarks ref="remarks" />
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