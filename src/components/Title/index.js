import React, { Component } from 'react';
import TextCenter from '../TextCenter';
import { Grid } from 'react-bootstrap';

export default class Title extends Component {
  render() {
    return (
        <Grid>
              <TextCenter bsStyle="primary">{this.props.title}</TextCenter>
        </Grid>
    );
  }
}