import React, { Component } from 'react';
import Title from './Title';
import Sequence from './Sequence';
import {Button} from 'react-bootstrap';

export default class Add extends Component {
    render() {
        return (
            <div>
                <Title title="Registration"/>
                <Sequence />
                <Button bsStyle="primary">Submit</Button>
            </div>
        );
    }
}