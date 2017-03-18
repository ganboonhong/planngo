import React, { Component } from 'react';
import Title from '../Title';
import ContentLogin from '../ContentLogin';
import Footer from '../Footer';

export default class Login extends Component {
  render () {
    return (
      <div>
        <Title title="Sign in to EO Digital" />
        <ContentLogin />
        <Footer />
      </div>
    );
  }
}
