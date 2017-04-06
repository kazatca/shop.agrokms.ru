import React, {Component, PropTypes} from 'react';
import {NavLink} from 'react-router-dom';

export default class Header extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="header">
        <div className="logo col-sm-3">LOGO</div>
        <div className="menu col-sm-9">
          <div>
            <NavLink exact to="/">Магазин</NavLink>
            <NavLink to="/cart">Корзина</NavLink>
            <NavLink to="/about">Контакты</NavLink>
          </div>
        </div>
      </div>
    );
  }
}
