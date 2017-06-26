import React from 'react';

import MainMenu from './MainMenu.jsx';

const Header = () => 
  <div className="header">
    <div className="logo col-xs-3">LOGO</div>
    <div className="menu col-xs-9">
      <MainMenu />
    </div>      
  </div>;

export default Header;
