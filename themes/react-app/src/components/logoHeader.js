import React from 'react';
// Logos
import logo from '../img/logo.svg';
import WebpackLogo from '../img/webpack.svg';
import reduxLogo from '../img/reduxLogo.png';
import SSLogo from '../img/silverstripe-logo.png';

const LogoHeader = () => (
  <header className="App-header">
    <img src={SSLogo} className="ss-logo" alt="logo"/>
    <img src={logo} className="App-logo" alt="logo"/>
    <img src={WebpackLogo} className="App-logo" alt="logo"/>
    <img src={reduxLogo} className="App-logo" alt="logo"/>
  </header>
);

export default LogoHeader;