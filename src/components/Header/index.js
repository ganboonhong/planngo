import React, { Component } from 'react';
import TextCenter from '../TextCenter';
import { Grid } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
        <Grid>
              <TextCenter>Sign Up</TextCenter>
        </Grid>
    );
  }
}

export default Header;