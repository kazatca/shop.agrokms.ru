import React, {Component} from 'react';
import MainMenu from './MainMenu.jsx';


export default class Header extends Component {
  static propTypes = {
  };
  
  render() {
    return (
      <div className="header">
        <div className="logo col-sm-3">LOGO</div>
        <div className="menu col-sm-9">
          <MainMenu />
        </div>      
      </div>
    );
  }
}
