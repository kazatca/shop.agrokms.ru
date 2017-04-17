import React, {Component, PropTypes} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import HoverMenu from './HoverMenu.jsx';

import {logout} from '../actions/user.js';

const MenuItem = props => 
  (<NavLink {...props} 
    className={`menu-item ${props.className || ''}`}
  >
    {props.children}
  </NavLink>);

MenuItem.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
};


class MainMenuDummy extends Component{
  static propTypes = {
    categories: PropTypes.array,
    loggedIn: PropTypes.bool,
    logout: PropTypes.func
  };

  render(){
    return (
      <div>
        <HoverMenu 
          toggle={<MenuItem exact to="/">Магазин</MenuItem>}
        >
          {this.props.categories.map(({id, name}) => (
            <li key={id}>
              <NavLink to={`/category/${id}`}>
                {name}
              </NavLink>
            </li>
          ))}
        </HoverMenu>
        <MenuItem to="/cart">Корзина</MenuItem>
        <MenuItem to="/about">Контакты</MenuItem>
        {
          !this.props.loggedIn?
          <MenuItem to="/login">Войти</MenuItem>:
          
          <HoverMenu 
            toggle={<MenuItem to="/orders">Мои заказы</MenuItem>}
          >
              <li>
                <NavLink to="change-password">Сменить пароль</NavLink>
              </li>
              <li>
                <a href="" onClick={() => this.props.logout()}>Выйти</a>
              </li>
          </HoverMenu>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.get('categories').toJS(),
    loggedIn: state.hasIn(['user', 'id'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

const MainMenu = connect(mapStateToProps, mapDispatchToProps)(MainMenuDummy);
export default MainMenu;