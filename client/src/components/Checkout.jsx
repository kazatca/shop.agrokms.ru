import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Cart from './Cart.jsx';
import UserName from './UserName.jsx';
import Phone from './Phone.jsx';
// import Address from './Address.jsx';
import Address from './AddressWithSuggestions.jsx';

import {send as sendOrder} from '../actions/order.js';

export const Checkout = ({submit}) => 
  <div>
    <Cart />
    <div>
      <UserName />
      <Phone />
      <Address />
    </div> 
    <button 
      className="submit-order" 
      onClick={submit}>
      Оформить</button>
  </div>;

Checkout.propTypes = {
  submit: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  submit: () => dispatch(sendOrder())
});

export default connect(null, mapDispatchToProps)(Checkout);