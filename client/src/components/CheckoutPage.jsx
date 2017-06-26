import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import DocumentTitle from './DocumentTitle.jsx';
import Checkout from './Checkout.jsx';

const EmptyCart = () =>
  <div className="empty-cart">
    <div>Ваша корзина пуста</div>
    <NavLink exact to="/">вернуться в магазин</NavLink>
  </div>;

const CheckoutPage = ({cartIsEmpty}) => 
  <div>
    <DocumentTitle>Корзина</DocumentTitle>
    {cartIsEmpty? <EmptyCart />: <Checkout />}
  </div>;

CheckoutPage.propTypes = {
  cartIsEmpty: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  cartIsEmpty: state.get('cart').size == 0
});

export default connect(mapStateToProps)(CheckoutPage);