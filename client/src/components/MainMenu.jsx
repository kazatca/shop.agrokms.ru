import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import MenuItem from './MenuItem.jsx';
import HoverMenu from './HoverMenu.jsx';
import MyProfileMenu from './MyProfileMenu.jsx';
import {getCategories} from '../selectors/category.js';

const MainMenu = ({categories, loggedIn}) => 
  <div>
    <HoverMenu 
      toggle={<MenuItem exact to="/">Магазин</MenuItem>}
    >
      {categories.map(({id, name}) => (
        <li key={id}>
          <NavLink to={`/category/${id}`}>{name}</NavLink>
        </li>
      ))}
    </HoverMenu>
    <MenuItem to="/cart">Корзина</MenuItem>
    <MenuItem to="/about">Контакты</MenuItem>
    {
      !loggedIn?
      <MenuItem to="/login">Войти</MenuItem>:
      <MyProfileMenu />
    }
  </div>;

MainMenu.propTypes = {
  categories: PropTypes.array,
  loggedIn: PropTypes.bool
};

const mapStateToProps = state => ({
  categories: getCategories(state),
  loggedIn: state.hasIn(['user', 'id'])
});

export default connect(mapStateToProps)(MainMenu);
