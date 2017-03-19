import React, { Component } from 'react';
import { Col, Row, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default class Price extends Component {

    constructor(props) {
      super(props);
      this.state = {
          price: '',
          validPrice: false,
          showHelpText: '',
      }
    }
    
    checkValid = () => {
        var obj = {
            result: false,
            value: this.state.price
        }
        if(this.state.validPrice) {
            obj.result = true;
        }
        return obj;
    }
  
    handleChange = (e) => {
        var price = e.target.value;
        
        this.setState({
            price: price,
            validPrice: price.length > this.props.minimumCharacter,
            showHelpText: (price.length > this.props.minimumCharacter) ? 'hide' : '',
        });
    }

    render() {
        return (
                <Row>
                    <Col md={11}>
                        <FormGroup controlId="price"> 
                            <ControlLabel>Price No*</ControlLabel>
                              <FormControl
                                type="text"
                                required={true}
                                value={this.state.price}
                                placeholder="Price No"
                                onChange={this.handleChange}
                                autoFocus
                              />
                              <HelpBlock className={this.state.showHelpText}>{`${this.props.priceHelpText}`}</HelpBlock>
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
};

Price.defaultProps = {
    minimumCharacter: 1
}