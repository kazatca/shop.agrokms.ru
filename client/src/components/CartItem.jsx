import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Money from './Money.jsx';
import {changeQty, removeItem} from '../actions/cart.js';

export class CartItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    qty: PropTypes.number,
    changeQty: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired
  };

  changeQty(qty){
    if(qty < 0){
      return;
    }
    this.props.changeQty(qty);
  }

  render() {
    return (
      <tr className="cart-item">
        <td className="image">
          <img src={this.props.image} alt=""/>
        </td>
        <td className="name">{this.props.name}</td>
        <td >
          <Money className="price">{this.props.price}</Money>
        </td>
        <td className="qty">
          <button 
            className="minus" 
            onClick={() => this.changeQty(this.props.qty*1 - 1)}
          >-</button>
          <input 
            type="text" 
            value={this.props.qty} 
            onChange={e => this.changeQty(e.target.value)}
            onFocus={e => e.target.select()}
          />
          <button 
            className="plus" 
            onClick={() => this.changeQty(this.props.qty*1 + 1)}
          >+</button>
        </td>
        <td>
          <Money className="cost">{this.props.price * this.props.qty}</Money>
        </td>
        <td>
          <button 
            className="remove" 
            onClick={this.props.removeItem}
          >Убрать</button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state, {productId}) => {
  const product = state.get('products').get(productId);
  const qty = state.get('cart').get(productId);
  return {
    name: product.get('name'),
    image: product.get('image'),
    price: product.get('price'),
    qty: qty*1
  };
};

const mapDispatchToProps = (dispatch, {productId}) => ({
  changeQty: qty => dispatch(changeQty(productId, qty)),
  removeItem: () => dispatch(removeItem(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);