import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';

// Logos
import logo from './img/logo.svg';
import WebpackLogo from './img/webpack.svg';
import reduxLogo from './img/reduxLogo.png';
import SSLogo from './img/silverstripe-logo.png';

// Styles
import './App.css';
import {withStyles} from 'material-ui/styles'

const store = createStore(todoApp);

console.log(store.getState());

render(
  <div className="App">
    <header className="App-header">
      <img src={SSLogo} className="ss-logo" alt="logo"/>
      <img src={logo} className="App-logo" alt="logo"/>
      <img src={WebpackLogo} className="App-logo" alt="logo"/>
      <img src={reduxLogo} className="App-logo" alt="logo"/>
    </header>
    <h1>To Do App & Redux</h1>
    <Provider store={store}>
      <App />
    </Provider>,
  </div>,
  document.getElementById('react-root')
);
