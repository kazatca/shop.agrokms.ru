import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import Checkout from './Checkout.jsx';

class EmptyCart extends Component {
  render() {
    return (
      <div className="empty-cart">
        <div>Ваша корзина пуста</div>
        <NavLink exact to="/">вернуться в магазин</NavLink>
      </div>
    );
  }
}

export class CheckoutPageDummy extends Component {
  static propTypes = {
    cartIsEmpty: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Корзина</title>
        </Helmet>
        {this.props.cartIsEmpty? <EmptyCart />: <Checkout />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartIsEmpty: state.get('cart').size == 0
  };
};


const CheckoutPage = connect(mapStateToProps)(CheckoutPageDummy);
export default CheckoutPage;