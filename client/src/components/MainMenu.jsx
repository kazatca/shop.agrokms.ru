import React, {Component, PropTypes} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import HoverMenu from './HoverMenu.jsx';

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
    categories: PropTypes.array
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.get('categories').toJS()
  };
};

const MainMenu = connect(mapStateToProps)(MainMenuDummy);
export default MainMenu;