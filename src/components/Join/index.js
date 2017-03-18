import React, { Component } from 'react';
import './style.css';
import Title from '../Title';
import Content from '../Content';
import Footer from '../Footer';

class Join extends Component {
  render () {
    return (
      <div>
        <Title title="Sign Up for EO Digital"/>
        <Content />
        <Footer />
      </div>
    );
  }
}

export default Join;
