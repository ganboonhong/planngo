import React, { Component } from 'react';
import './style.css';
import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';

class Login extends Component {
  render () {
    return (
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default Login;
