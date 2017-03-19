import React, { Component } from 'react';
import { Col, Row, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import RowCenter from '../RowCenter';

class Sequence extends Component {

    constructor(props) {
      super(props);
      this.state = {
          sequence: '',
          validSequence: false,
          showHelpText: '',
      }
    }
    
    checkValid = () => {
        var obj = {
            result: false,
            value: this.state.sequence
        }
        if(this.state.validSequence) {
            obj.result = true;
        }
        return obj;
    }
  
  
    handleChange = (e) => {
        var sequence = e.target.value;
        
        this.setState({
            sequence: sequence,
            validSequence: sequence.length > this.props.minimumCharacter,
            showHelpText: (sequence.length > this.props.minimumCharacter) ? 'hide text-danger' : '',
        });
        this._checkFunc();
    }

    _checkFunc = () => {
        setTimeout(() => {
            this.props.checkFunc();
        }, 500);
    }

    render() {
        return (
                <Row>
                    <Col md={11}>
                        <FormGroup controlId="sequence"> 
                            <ControlLabel>Sequence No*</ControlLabel>
                              <FormControl
                                type="text"
                                required={true}
                                value={this.state.sequence}
                                placeholder="Sequence No"
                                onChange={this.handleChange}
                                autoFocus
                              />
                              <HelpBlock className={this.state.showHelpText}>{`${this.props.sequenceHelpText}`}</HelpBlock>
                              <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                    <Col md={1} />
                </Row>
        );
    }
}

Sequence.propTypes = {
  checkValid: React.PropTypes.func,
};

Sequence.defaultProps = {
    minimumCharacter: 1
}

export default Sequence;