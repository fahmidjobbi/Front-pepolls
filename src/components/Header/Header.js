import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import messageIcon from '../../images/message.svg';

const Header = () => {

  

  return (
    <nav className="navbar">
      <a className="navbar-brand" href="/Home">
        <img src={logo} alt="logo"  />
      </a>

      
        <a href="/Chat">
          <img src={messageIcon} alt="message_icon" />
        </a>
    
    </nav>
  );
};

export default Header;
