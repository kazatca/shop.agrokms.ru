import React, {Component, PropTypes} from 'react';
import {NavLink} from 'react-router-dom';

export default class Footer extends Component {
  static propTypes = {
    
  };

  render() {
    return (
      <div className="footer">
        <NavLink to='/about'>Мы тут</NavLink>          
      </div>
    );
  }
}
