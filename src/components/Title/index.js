import React, { Component } from 'react';
import TextCenter from '../TextCenter';
import { Grid } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
        <Grid>
              <TextCenter bsStyle="primary">{this.props.title}</TextCenter>
        </Grid>
    );
  }
}

export default Header;