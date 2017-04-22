import React, { Component } from 'react';
import { Col, Row, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import ReactDOM from 'react-dom';

const
Global = require('../Global'),
commonHint = Global.commonHint;

export default class Price extends Component {

    constructor(props) {
      super(props);
      this.state = this.props.initState;
    }
    
    checkValid = () => {
        const obj = {
            result: false,
            value: this.state.price
        }
        if(this.state.validPrice) {
            obj.result = true;
        }
        return obj;
    }

    showHint = (show) => {
        this.setState({ showHelpText: (show) ? '' : 'hide'});
    }
  
    handleChange = (e) => {
        const price = e.target.value;
        
        this.setState({
            price: price,
            validPrice: price.length >= this.props.minimumCharacter,
            showHelpText: (price.length >= this.props.minimumCharacter) ? 'hide' : '',
        });

        setTimeout(() => {
            if(this.props.scannerMode) this.props.focusOnSequenceField();
        }, 500)
    }

    clearState = () => {
        this.setState(this.props.initState);
    }

    populateData = (objToEdit) => {
        this.setState({
            price: objToEdit.price,
            validPrice: true,
            showHelpText: '',
        });
    }

    _focus = () => {
        ReactDOM.findDOMNode(this.refs.price).focus();
    }

    render() {
        return (
                <Row>
                    <Col md={11}>
                        <FormGroup controlId="price"> 
                            <ControlLabel>Price*</ControlLabel>
                              <FormControl
                                type="text"
                                required={true}
                                ref="price"
                                value={this.state.price}
                                placeholder="Price"
                                onChange={this.handleChange}
                              />
                              <HelpBlock className={this.state.showHelpText}>{`${commonHint}`}</HelpBlock>
                              <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                    <Col md={1} />
                </Row>
        );
    }
}

Price.propTypes = {
  checkValid: React.PropTypes.func,
  focusOnSequenceField: React.PropTypes.func,
};

Price.defaultProps = {
    minimumCharacter: 1,
    initState: {
        price: 0,
        validPrice: false,
        showHelpText: 'hide',
    }
}