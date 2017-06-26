import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {removeAll} from '../actions/cart.js';
import CartItem from './CartItem.jsx';
import CartTotal from './CartTotal.jsx';
import {getProductsInCart} from '../selectors/cart.js';

const Cart = ({cart, removeAll}) =>
  <table className="cart">
    <tbody>
      {cart.map(id => <CartItem key={id} productId={id}/>)}  
      <CartTotal />
      <tr><td colSpan={5}>
        <button className="remove-all"
          onClick={removeAll}
        >Убрать все</button>
      </td></tr>
    </tbody>
  </table>;

Cart.propTypes = {
  cart: PropTypes.array,
  removeAll: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: getProductsInCart(state)
});

const mapDispatchToProps = dispatch => ({
  removeAll: () => dispatch(removeAll())  
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
