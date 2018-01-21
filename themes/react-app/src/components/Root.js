import React from 'react';
import { Provider } from 'react-redux';
// import {Router, Route} from 'react-router';
// React router
// import { browserHistory  } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {BrowserRouter, Link, Route } from 'react-router-dom'
import App from './App';

// Styles
import '../App.css';
import {withStyles} from 'material-ui/styles'

const Root = ({store}) => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        {/*<Route path='/' component={App} />*/}
        <Route path='/:filter?' component={App} />
      </div>
    </BrowserRouter>
  </Provider>
);

export default Root