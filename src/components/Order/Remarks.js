import React, { Component } from 'react';
import { Col, Row, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default class Remarks extends Component {

    constructor(props) {
      super(props);
      this.state = this.props.initState;
    }
    
    checkValid = () => {
        var obj = {
            result: false,
            value: this.state.remarks
        }
        if(this.state.validRemarks) {
            obj.result = true;
        }
        return obj;
    }
  
    handleChange = (e) => {
        var remarks = e.target.value;
        
        this.setState({
            remarks: remarks,
            // validRemarks: remarks.length > this.props.minimumCharacter,
            // showHelpText: (remarks.length > this.props.minimumCharacter) ? 'hide' : '',
        });
    }

    clearState = () => {
        this.setState(this.props.initState);
    }

    populateData = (objToEdit) => {
        this.setState({
            remarks: objToEdit.remarks,
            validRemarks: true,
            showHelpText: '',
        });
    }

    render() {
        return (
                <Row>
                    <Col md={11}>
                        <FormGroup controlId="remarks"> 
                            <ControlLabel>Remarks</ControlLabel>
                              <FormControl
                                type="text"
                                componentClass="textarea"
                                required={true}
                                value={this.state.remarks}
                                placeholder="Remarks"
                                onChange={this.handleChange}
                              />
                              <HelpBlock className={this.state.showHelpText}>{`${this.props.remarksHelpText}`}</HelpBlock>
                              <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                    <Col md={1} />
                </Row>
        );
    }
}

Remarks.propTypes = {
  checkValid: React.PropTypes.func,
};

Remarks.defaultProps = {
    minimumCharacter: 1,
    initState: {
        remarks: '',
        validRemarks: true, // remarks is not compulsary
        showHelpText: '',
    }
}