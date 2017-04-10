import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Cart from './Cart.jsx';
import UserName from './UserName.jsx';
import Phone from './Phone.jsx';
import Address from './Address.jsx';

import {send as sendOrder} from '../actions/order.js';

class UserCreds extends Component{
  render(){
    return (
      <div>
        <UserName />
        <Phone />
        <Address />
      </div> 
    );
  }
}

class FilledCartDummy extends Component{
  static propTypes = {
    submit: PropTypes.func.isRequired
  };

  render(){
    return (
      <div>
        <Cart />
        <UserCreds />
        <button 
          className="submit-order" 
          onClick={() => this.props.submit()}>
          Оформить</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submit: () => dispatch(sendOrder())
  };
};

const FilledCart = connect(null, mapDispatchToProps)(FilledCartDummy);
export default FilledCart;
