import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Cart from './Cart.jsx';
import UserName from './UserName.jsx';
import Phone from './Phone.jsx';
// import Address from './Address.jsx';
import Address from './AddressDadata.jsx';

import {send as sendOrder} from '../actions/order.js';

export class CheckoutDummy extends Component{
  static propTypes = {
    submit: PropTypes.func.isRequired
  };

  render(){
    return (
      <div>
        <Cart />
        <div>
          <UserName />
          <Phone />
          <Address />
        </div> 
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

const Checkout = connect(null, mapDispatchToProps)(CheckoutDummy);
export default Checkout;
