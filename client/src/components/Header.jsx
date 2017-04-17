import React, {Component} from 'react';
import MainMenu from './MainMenu.jsx';


export default class Header extends Component {
  static propTypes = {
  };
  
  render() {
    return (
      <div className="header">
        <div className="logo col-xs-3">LOGO</div>
        <div className="menu col-xs-9">
          <MainMenu />
        </div>      
      </div>
    );
  }
}
