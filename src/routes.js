import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import About from './components/About';
import NotFound from './components/NotFound';
import Join from './components/Join';
import Login from './components/Login';
import Order from './components/Order';
import Bio from './components/Bio';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/about" component={About} />
    <Route path="/join" component={Join} />
    <Route path="/login" component={Login} />
    <Route path="/order" component={Order} />
    <Route path="/zh" component={Bio} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;