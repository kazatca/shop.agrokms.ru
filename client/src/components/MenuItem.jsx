import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const MenuItem = ({children, className, ...props}) => 
  (<NavLink {...props} 
    className={`menu-item ${className || ''}`}
  >
    {children}
  </NavLink>);

MenuItem.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default MenuItem;