import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Cart from './Cart.jsx';
import UserName from './UserName.jsx';
import Phone from './Phone.jsx';
import Address from './Address.jsx';

import {send as submitOrder} from '../actions/order.js'; 

export class OrderDummy extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <Cart />
        <UserName />
        <Phone />
        <Address />
        <button 
          onClick={this.props.submit}>
          Оформить
        </button>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    submit: () => dispatch(submitOrder())
  };
};

const Order = connect(null, mapDispatchToProps)(OrderDummy);

export default Order;