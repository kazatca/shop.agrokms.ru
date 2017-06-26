import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import MenuItem from './MenuItem.jsx';
import HoverMenu from './HoverMenu.jsx';
import {logout} from '../actions/user.js';

const preventDefault = e => {
  e.preventDefault();
  e.stopPropagation();
};

const MyProfileMenu = ({logout}) => 
    <HoverMenu 
      toggle={<MenuItem to="/orders">Мои заказы</MenuItem>}
    >
      <li>
        <NavLink to="change-password">Сменить пароль</NavLink>
      </li>
      <li>
        <a href="" onClick={e => {preventDefault(e); logout();}}>Выйти</a>
      </li>
    </HoverMenu>;

MyProfileMenu.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(MyProfileMenu);