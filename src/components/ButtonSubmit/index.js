import React, { Component } from 'react';
import { ButtonToolbar, Button, FormGroup } from 'react-bootstrap';
import RowCenter from '../RowCenter';

export default class ButtonSubmit extends Component {
    render() {
        return (
            <FormGroup>
                <RowCenter>
                    <ButtonToolbar>
                        <Button bsStyle="primary">
                            Submit
                        </Button>
                    </ButtonToolbar>
                </RowCenter>
            </FormGroup>
        );
    }
}