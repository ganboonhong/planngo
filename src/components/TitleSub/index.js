import React, { Component } from 'react';
import { Grid, Label, FormGroup } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
        <Grid>
            <FormGroup>
                <Row>
                    <Label bsStyle="primary">{this.props.children}</Label>
                </Row>
            </FormGroup>
        </Grid>
    );
  }
}

export default Header;