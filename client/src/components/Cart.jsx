import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';

import {removeAll} from '../actions/cart.js';
import CartItem from './CartItem.jsx';
import CartTotal from './CartTotal.jsx';

export class CartDummy extends PureComponent{

  static propTypes = {
    cart: PropTypes.object,
    removeAll: PropTypes.func.isRequired
  };

  render(){
    return (
      <table className="cart">
        <tbody>
          {this.props.cart.map((qty, id) => <CartItem 
            key={id}
            productId={id}
          />).toArray()}  
          <CartTotal />
          <tr><td colSpan={5}>
            <button className="remove-all"
              onClick={this.props.removeAll}
            >Убрать все</button>
          </td></tr>
        </tbody>
      </table>
    );
  }
}


const mapStateToProps = state => ({
  cart: state.get('cart')
});

const mapDispatchToProps = dispatch => ({
  removeAll: () => dispatch(removeAll())  
});

const Cart = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartDummy);

export default Cart;